"use client"

import {
    motion,
    useMotionValue,
    useTransform,
    useMotionTemplate,
    useAnimationFrame,
} from "framer-motion"
import { useEffect, useRef, useState } from "react"

type Comment = {
    ItemInternalId: string
    name: string
    note: string
}

const BASE_X = 24
const SPEED = 1
const GAP = 12
const ESTIMATED_HEIGHT = 140

/* =====================================================
   FloatingItem
===================================================== */
export function FloatingItem({
    data,
    startY,
    onHeightReady,
}: {
    data: Comment
    startY: number
    onHeightReady: (h: number) => void
}) {
    const ref = useRef<HTMLDivElement>(null)
    const y = useMotionValue(startY)

    /* Sync Y khi startY thay đổi */
    useEffect(() => {
        y.set(startY)
    }, [startY, y])

    /* Measure height */
    useEffect(() => {
        if (!ref.current) return

        const ro = new ResizeObserver(([entry]) => {
            onHeightReady(entry.contentRect.height + GAP)
        })

        ro.observe(ref.current)
        return () => ro.disconnect()
    }, [onHeightReady])

    /* Fade + blur theo tâm */
    const vh =
        typeof window !== "undefined" ? window.innerHeight : 800

    const centerY = useTransform(
        y,
        v => v + (ref.current?.offsetHeight ?? 0) / 2
    )

    const fadeStart = vh * 0.75
    const fadeEnd = vh * 0.45

    /* ✅ ONLY ONE OPACITY SOURCE */
    const fadeOpacity = useTransform(
        centerY,
        [fadeStart, fadeEnd],
        [1, 0]
    )

    const blur = useTransform(
        centerY,
        [fadeStart, fadeEnd],
        [2, 16]
    )

    const blurFilter = useMotionTemplate`blur(${blur}px)`

    /* Animation frame */
    useAnimationFrame(() => {
        y.set(y.get() - SPEED)
    })

    return (
        <motion.div
            ref={ref}
            onContextMenu={e => e.preventDefault()}
            style={{
                top: y,
                left: BASE_X,
                opacity: fadeOpacity,
                touchAction: "none",      // 🔑 CHẶN TOUCH GESTURE
                userSelect: "none",       // 🔑 CHẶN LONG PRESS SELECT
                WebkitUserSelect: "none",
            }}
            className="absolute max-w-xs pointer-events-none"
            initial={{ scale: 0.94 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >

            {/* Glass background */}
            <motion.div
                className="absolute inset-0 rounded-2xl bg-black/50"
                style={{
                    backdropFilter: "blur(22px)",
                    filter: blurFilter,
                }}
            />

            {/* Content */}
            <div className="relative px-4 py-3 rounded-2xl border border-white/10 shadow-xl">
                <p className="text-xs font-semibold text-green-400">
                    {data.name}
                </p>
                <p className="text-sm text-white/95 leading-relaxed whitespace-pre-wrap">
                    {data.note}
                </p>
            </div>
        </motion.div>
    )
}

/* =====================================================
   FloatingComments
===================================================== */
export function FloatingComments() {
    const [comments, setComments] = useState<Comment[]>([])
    const heightsRef = useRef<number[]>([])
    const idsRef = useRef<Set<string>>(new Set())
    const [, forceUpdate] = useState(0)

    const vh =
        typeof window !== "undefined" ? window.innerHeight : 800

    const fetchComments = async () => {
        const res = await fetch("/api/rsvp", { cache: "no-store" })
        if (!res.ok) return

        const data: Comment[] = await res.json()
        const valid = data.filter(c => c.note?.trim())

        const newOnes = valid.filter(
            c => !idsRef.current.has(c.ItemInternalId)
        )

        if (!newOnes.length) return

        newOnes.forEach(c => idsRef.current.add(c.ItemInternalId))
        setComments(prev => [...prev, ...newOnes])
    }

    useEffect(() => {
        fetchComments()
        const i = setInterval(fetchComments, 4000)
        return () => clearInterval(i)
    }, [])

    let currentY = vh + 20

    return (
        <div className="fixed inset-0 z-20 pointer-events-none overflow-hidden">
            {comments.map((c, i) => {
                const startY = currentY
                currentY +=
                    heightsRef.current[i] ?? ESTIMATED_HEIGHT

                return (
                    <FloatingItem
                        key={c.ItemInternalId}
                        data={c}
                        startY={startY}
                        onHeightReady={h => {
                            if (heightsRef.current[i] !== h) {
                                heightsRef.current[i] = h
                                forceUpdate(v => v + 1)
                            }
                        }}
                    />
                )
            })}
        </div>
    )
}
