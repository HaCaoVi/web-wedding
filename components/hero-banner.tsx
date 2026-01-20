"use client"

import Image from "next/image"
import { useState, useEffect, useMemo } from "react"
import { motion } from "framer-motion"

interface CalendarParticle {
  id: number
  x: number
  y: number
  delay: number
}

interface IProps {
  day: number,
  time: string
}

export function HeroBanner({ day, time }: IProps) {
  const [particles, setParticles] = useState<CalendarParticle[]>([])

  useEffect(() => {
    // Reduce particles on mobile for better performance
    const isMobile = window.innerWidth < 768
    const count = isMobile ? 8 : 16
    const newParticles: CalendarParticle[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: i * 0.1,
    }))
    setParticles(newParticles)
  }, [])

  // Calendar configuration
  const calendarYear = 2026
  const calendarMonthIndex = 0 // January (0 = Jan)
  const [selectedDate, setSelectedDate] = useState<{ day: number; monthOffset: number }>({ day: day, monthOffset: 0 })
  const daysInMonth = new Date(calendarYear, calendarMonthIndex + 1, 0).getDate()

  // Format month names in Vietnamese and capitalize first letter
  const formatMonthName = (offset = 0) => {
    const raw = new Date(calendarYear, calendarMonthIndex + offset).toLocaleString('vi', { month: 'long' })
    return raw.replace(/^./, (s) => s.toUpperCase())
  }
  const monthName = formatMonthName(0)

  // Memoize calendar grid helpers to avoid recalculating on every render
  const calendarCells = useMemo(() => {
    const firstDayOfWeek = new Date(calendarYear, calendarMonthIndex, 1).getDay() // 0 = Sun, 1 = Mon
    const leadingEmpty = (firstDayOfWeek + 6) % 7 // convert so Monday=0 ... Sunday=6
    const totalCells = Math.ceil((leadingEmpty + daysInMonth) / 7) * 7
    const prevMonthDays = new Date(calendarYear, calendarMonthIndex, 0).getDate()

    return Array.from({ length: totalCells }, (_, i) => {
      const dayIndex = i - leadingEmpty + 1
      if (dayIndex < 1) {
        return { day: prevMonthDays + dayIndex, inCurrentMonth: false, monthOffset: -1 }
      }
      if (dayIndex > daysInMonth) {
        return { day: dayIndex - daysInMonth, inCurrentMonth: false, monthOffset: 1 }
      }
      return { day: dayIndex, inCurrentMonth: true, monthOffset: 0 }
    })
  }, [daysInMonth])

  const selectedMonthName = useMemo(() => formatMonthName(selectedDate.monthOffset), [selectedDate.monthOffset])

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20 pb-12">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <Image
          src="/images/RIC_8927_2.jpg"
          alt="Thanh Thuy & Cao Vi"
          fill
          sizes="100vw"
          className="object-cover"
          priority
          quality={90}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAIhAAAgEDAwUBAAAAAAAAAAAAAQIDAAQRBSExBhITQVFh/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAZEQACAwEAAAAAAAAAAAAAAAABAgADBBH/2gAMAwEAAhEDEEA/AKWm6hqGpatplla3k6RXNzFE8YIG5YgH0c+6y7ruyOp6mCHQD1+qKKatpoUcIXUMzZn/2Q=="
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/70" />
      </div>

      {/* Floating particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 rounded-full bg-gold/30"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [0, -40, 0],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Number.POSITIVE_INFINITY,
            delay: particle.delay,
          }}
        />
      ))}

      {/* Glassmorphism card with names */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 text-center px-6 mb-12"
      >
        <div className="rounded-3xl px-10 py-14 max-w-2xl shadow-2xl relative">
          {/* Decorative heart inside */}

          <motion.h1
            className="font-serif text-5xl md:text-7xl lg:text-8xl text-cream mb-6 tracking-[0.1em] text-glow"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
          >
            Thanh Thùy
          </motion.h1>
          <motion.div
            className="text-gold text-3xl md:text-4xl mb-6 opacity-80"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.8 }}
            transition={{ delay: 0.6 }}
          >
            &
          </motion.div>
          <motion.h2
            className="font-serif text-5xl md:text-7xl lg:text-8xl text-cream tracking-[0.1em] text-glow"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
          >
            Cao Vĩ
          </motion.h2>
        </div>
      </motion.div>

      {/* Calendar grid - January 2026 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="relative z-10 glassmorphism-dark rounded-3xl p-6 sm:p-8 border border-white/10 max-w-md mx-auto shadow-2xl"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="text-xl text-white/90 font-serif tracking-widest uppercase">{monthName} {calendarYear}</div>
        </div>

        {/* Weekday headers (Mon-Sun) */}
        <div className="grid grid-cols-7 gap-2 text-[10px] uppercase text-gold/60 mb-4 tracking-tighter font-medium">
          {['Hai', 'Ba', 'Tư', 'Năm', 'Sáu', 'Bảy', 'CN'].map((d) => (
            <div key={d} className="flex items-center justify-center">{d}</div>
          ))}
        </div>

        {/* Days grid */}
        <div className="grid grid-cols-7 gap-3">
          {calendarCells.map((cell, idx) => {
            const isSelected = selectedDate.day === cell.day && selectedDate.monthOffset === cell.monthOffset
            const mutedClass = !cell.inCurrentMonth ? 'opacity-20 pointer-events-none' : ''
            const baseClass = isSelected
              ? 'bg-gold text-black shadow-lg shadow-gold/30'
              : `hover:bg-white/10 text-white/60 hover:text-white ${mutedClass}`

            return (
              <motion.button
                key={idx}
                onClick={() => cell.inCurrentMonth && setSelectedDate({ day: cell.day, monthOffset: cell.monthOffset })}
                className={`w-10 h-10 flex flex-col items-center justify-center rounded-xl text-xs sm:text-sm transition-all duration-300 ${baseClass}`}
                whileHover={cell.inCurrentMonth ? { scale: isSelected ? 1 : 1.1 } : {}}
                whileTap={cell.inCurrentMonth ? { scale: 0.9 } : {}}
                aria-label={`${cell.day} ${formatMonthName(cell.monthOffset)} ${calendarYear}`}
              >
                {cell.day}
                {isSelected && <span className="text-[6px] mt-0.5 animate-pulse">♥</span>}
              </motion.button>
            )
          })}
        </div>

        <div className="mt-8 border-t border-white/5 pt-4">
          <p className="text-center text-gold-light/60 text-sm italic font-serif tracking-wide">
            {`${selectedDate.day} ${selectedMonthName} ${calendarYear} • ${time}`}
          </p>
        </div>
      </motion.div>

      {/* Swipe indicator (tay lướt) */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="text-white/40"
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M7 13l5-5 5 5M7 17l5-5 5 5" />
          </svg>
        </motion.div>
        <span className="mt-2 text-[10px] uppercase tracking-[0.3em] text-white/30 font-light">Cuộn để xem thêm</span>
      </motion.div>
    </section>
  )
}

