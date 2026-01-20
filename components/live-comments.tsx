"use client"

import {
    motion,
    useMotionValue,
    useTransform,
    useAnimationFrame,
} from "framer-motion"
import { memo, useCallback, useEffect, useRef, useState } from "react"

/* =====================
   Types
===================== */
type Comment = {
    ItemInternalId: string
    name: string
    note: string
}

/* =====================
   Constants
===================== */
const BASE_X = 16
const SPEED = 1
const GAP = 12
const ESTIMATED_HEIGHT = 140

/* =====================
   Hook: Viewport Height (SSR-safe)
===================== */
function useViewportHeight() {
    const [vh, setVh] = useState(0)

    useEffect(() => {
        setVh(window.innerHeight)
    }, [])

    return vh
}

/* =====================================================
   FloatingItem
===================================================== */
const FloatingItem = memo(function FloatingItem({
    data,
    startY,
    onHeightReady,
    viewportHeight,
}: {
    data: Comment
    startY: number
    viewportHeight: number
    onHeightReady: (h: number) => void
}) {
    const ref = useRef<HTMLDivElement>(null)
    const y = useMotionValue(startY)

    /* Sync Y khi startY thay đổi */
    useEffect(() => {
        y.set(startY)
    }, [startY, y])

    /* Measure height (1 lần) */
    useEffect(() => {
        if (!ref.current) return
        onHeightReady(ref.current.offsetHeight + GAP)
    }, [onHeightReady])

    /* Fade theo vị trí */
    const fadeStart = viewportHeight * 0.8
    const fadeEnd = viewportHeight * 0.4

    const opacity = useTransform(y, [fadeStart, fadeEnd], [1, 0])

    /* Animation loop */
    useAnimationFrame((_, delta) => {
        y.set(y.get() - SPEED * (delta / 16.67))
    })

    const translateY = useTransform(y, v => `translateY(${v}px)`)

    return (
        <motion.div
            ref={ref}
            style={{
                transform: translateY,
                opacity,
                left: BASE_X,
                right: BASE_X,
                willChange: "transform, opacity",
                backfaceVisibility: "hidden",
                pointerEvents: "none",
                userSelect: "none",
                WebkitUserSelect: "none",
                touchAction: "none",
            }}
            className="absolute top-0 w-auto max-w-[75vw] sm:max-w-[320px] md:max-w-sm lg:max-w-md"
            initial={{ scale: 0.94, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
        >
            {/* Glass background */}
            <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-black/40 backdrop-blur-md" />

            {/* Content */}
            <div className="relative px-3 py-2 sm:px-4 sm:py-3 rounded-xl sm:rounded-2xl border border-white/10 shadow-xl">
                <p className="text-[10px] sm:text-xs font-semibold text-green-400">
                    {data.name}
                </p>
                <p className="text-xs sm:text-sm text-white/95 leading-relaxed whitespace-pre-wrap">
                    {data.note}
                </p>
            </div>
        </motion.div>
    )
})

/* =====================================================
   FloatingComments
===================================================== */
export function FloatingComments() {
    const [comments, setComments] = useState<Comment[]>([])
    const heightsRef = useRef<number[]>([])
    const idsRef = useRef<Set<string>>(new Set())
    const [, forceUpdate] = useState(0)

    const vh = useViewportHeight()

    /* Fetch comments */
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

    /* Polling */
    useEffect(() => {
        fetchComments()
        const i = setInterval(fetchComments, 4000)
        return () => clearInterval(i)
    }, [])

    /* NOTE: Removed global touchmove blocking - it was preventing all scrolling on mobile.
       The FloatingItem already has pointer-events: none and touchAction: none,
       which prevents interaction without blocking page scroll. */

    if (!vh) return null

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
                        viewportHeight={vh}
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
