"use client"

import {
    motion,
    useMotionValue,
    useTransform,
    useAnimationFrame,
} from "framer-motion"
import { useEffect, useRef, useState } from "react"

type Comment = {
    ItemInternalId: string
    name: string
    note: string
}

const BASE_X = 16   // Mobile default
const SPEED = 1
const GAP = 12
const ESTIMATED_HEIGHT = 140

/* =====================================================
   FloatingItem - GPU Accelerated for Smooth Animation
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

    /* Measure height - chỉ đo 1 lần */
    useEffect(() => {
        if (!ref.current) return

        const measure = () => {
            if (ref.current) {
                onHeightReady(ref.current.offsetHeight + GAP)
            }
        }

        // Đo sau khi render
        requestAnimationFrame(measure)
    }, [onHeightReady])

    /* Fade opacity theo vị trí Y */
    const vh = typeof window !== "undefined" ? window.innerHeight : 800
    const fadeStart = vh * 0.80
    const fadeEnd = vh * 0.40

    const fadeOpacity = useTransform(
        y,
        [fadeStart, fadeEnd],
        [1, 0]
    )

    /* Animation frame - chạy liên tục không ngừng */
    useAnimationFrame((_, delta) => {
        const velocity = SPEED * (delta / 16.67) // normalize 60fps
        y.set(y.get() - velocity)
    })
    useEffect(() => {
        const prevent = (e: TouchEvent) => e.preventDefault()

        document.addEventListener("touchmove", prevent, { passive: false })
        return () =>
            document.removeEventListener("touchmove", prevent)
    }, [])

    /* Transform Y cho GPU acceleration */
    const translateY = useTransform(y, v => `translateY(${v}px)`)

    return (
        <motion.div
            ref={ref}
            style={{
                transform: translateY,
                opacity: fadeOpacity,
                left: BASE_X,
                right: BASE_X,
                // GPU acceleration hints
                willChange: "transform, opacity",
                backfaceVisibility: "hidden",
                // Prevent all touch interactions
                touchAction: "none",
                userSelect: "none",
                WebkitUserSelect: "none",
                pointerEvents: "none",
            }}
            className="absolute top-0 w-auto max-w-[75vw] sm:max-w-[320px] md:max-w-sm lg:max-w-md"
            initial={{ scale: 0.94, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
        >
            {/* Glass background - static blur for performance */}
            <div
                className="absolute inset-0 rounded-xl sm:rounded-2xl bg-black/40 backdrop-blur-md"
                style={{ backfaceVisibility: "hidden" }}
            />

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
