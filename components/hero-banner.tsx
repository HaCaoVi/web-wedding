"use client"

import Image from "next/image"

import { useState, useEffect } from "react"
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
    // Generate floating particles
    const newParticles: CalendarParticle[] = Array.from({ length: 12 }, (_, i) => ({
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

  // Calendar grid helpers (week starts on Monday), include prev/next month days
  const firstDayOfWeek = new Date(calendarYear, calendarMonthIndex, 1).getDay() // 0 = Sun, 1 = Mon
  const leadingEmpty = (firstDayOfWeek + 6) % 7 // convert so Monday=0 ... Sunday=6
  const totalCells = Math.ceil((leadingEmpty + daysInMonth) / 7) * 7
  console.log("🚀 ~ HeroBanner ~ totalCells:", totalCells)
  const prevMonthDays = new Date(calendarYear, calendarMonthIndex, 0).getDate()
  const calendarCells = Array.from({ length: totalCells }, (_, i) => {
    const dayIndex = i - leadingEmpty + 1
    if (dayIndex < 1) {
      return { day: prevMonthDays + dayIndex, inCurrentMonth: false, monthOffset: -1 }
    }
    if (dayIndex > daysInMonth) {
      return { day: dayIndex - daysInMonth, inCurrentMonth: false, monthOffset: 1 }
    }
    return { day: dayIndex, inCurrentMonth: true, monthOffset: 0 }
  })

  const selectedMonthName = formatMonthName(selectedDate.monthOffset)

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
          quality={100}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAIhAAAgEDAwUBAAAAAAAAAAAAAQIDAAQRBSExBhITQVFh/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAZEQACAwEAAAAAAAAAAAAAAAABAgADBBH/2gAMAwEAAhEDEEA/AKWm6hqGpatplla3k6RXNzFE8YIG5YgH0c+6y7ruyOp6mCHQD1+qKKatpoUcIXUMzZn/2Q=="
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/60"></div>
      </div>

      {/* Floating particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 rounded-full bg-gold/40"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Number.POSITIVE_INFINITY,
            delay: particle.delay,
          }}
        />
      ))}

      {/* Glassmorphism card with names */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center px-6 mb-12"
      >
        <motion.div
          className="glassmorphism rounded-2xl px-8 py-12 max-w-2xl"
          // animate={{
          //   boxShadow: [
          //     "0 0 30px rgba(114, 174, 165, 0.2)",
          //     "0 0 60px rgba(114, 174, 165, 0.4)",
          //     "0 0 30px rgba(114, 174, 165, 0.2)",
          //   ],
          // }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
        >
          <motion.h1
            className="font-serif text-5xl md:text-7xl text-cream mb-6 tracking-widest"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 1 }}
          >
            Thanh Thùy
          </motion.h1>
          <motion.div
            className="text-4xl md:text-5xl text-gold mb-6"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            ♥
          </motion.div>
          <motion.h2
            className="font-serif text-5xl md:text-7xl text-cream tracking-widest"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
          >
            Cao Vĩ
          </motion.h2>
        </motion.div>
      </motion.div>

      {/* Calendar grid - January 2026 */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="relative z-10 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 max-w-md mx-auto"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="text-lg text-white/80 font-medium font-serif">{monthName} {calendarYear}</div>
        </div>

        {/* Weekday headers (Mon-Sun) */}
        <div className="grid grid-cols-7 gap-2 text-[10px] uppercase text-white/60 mb-2">
          {['Th 2', 'Th 3', 'Th 4', 'Th 5', 'Th 6', 'Th 7', 'CN'].map((d) => (
            <div key={d} className="flex items-center justify-center font-serif">{d}</div>
          ))}
        </div>

        {/* Days grid */}
        <div className="grid grid-cols-7 gap-2">
          {calendarCells.map((cell, idx) => {
            const isSelected = selectedDate.day === cell.day && selectedDate.monthOffset === cell.monthOffset
            const mutedClass = !cell.inCurrentMonth ? 'opacity-60 text-white/30' : ''
            const baseClass = isSelected ? 'bg-gold text-white glow-pulse' : `bg-white/10 text-white/50 hover:bg-white/20 ${mutedClass}`

            return (
              <motion.button
                key={idx}
                onClick={() => setSelectedDate({ day: cell.day, monthOffset: cell.monthOffset })}
                className={`w-10 h-10 flex items-center justify-center rounded-lg font-serif text-sm transition-all ${baseClass}`}
                whileHover={{ scale: isSelected ? 1.15 : 1.05 }}
                animate={isSelected ? { boxShadow: ['0 0 14px rgba(212,165,116,0.35)', '0 0 30px rgba(212,165,116,0.55)'] } : {}}
                transition={isSelected ? { duration: 1.2, repeat: Number.POSITIVE_INFINITY } : {}}
                aria-label={`${cell.day} ${formatMonthName(cell.monthOffset)} ${calendarYear}`}
              >
                {isSelected ? <><span className="text-lg mr-1">♥</span>{cell.day}</> : cell.day}
              </motion.button>
            )
          })}
        </div>

        <p className="text-center text-white/60 text-md mt-4 font-serif">{`${selectedDate.day} ${selectedMonthName} ${calendarYear} • ${time}`}</p>
      </motion.div>

      {/* Swipe indicator (tay lướt) */}
      <motion.div
        className="absolute bottom-2 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center"
        role="img"
        aria-label="Gợi ý vuốt lên"
      >
        <div className="flex items-center justify-center w-12 h-5">
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-6 h-6 text-white/90"
            initial={{ y: 0, opacity: 0.95 }}
            animate={{ y: [0, -12, 0], opacity: [1, 0.6, 1] }}
            transition={{ duration: 1.2, repeat: Number.POSITIVE_INFINITY }}
          >
            {/* Open hand (material 'pan_tool' inspired) */}
            <path
              d="M6 3c-.55 0-1 .45-1 1v9.2c0 2.1 1.3 3.8 3.2 4.4l.8.25 1.3 3.4c.25.65.86 1.08 1.56 1.08s1.31-.43 1.56-1.08l1.3-3.4.8-.25c1.9-.6 3.2-2.3 3.2-4.4V6c0-.55-.45-1-1-1s-1 .45-1 1v7.8c0 .28-.22.5-.5.5s-.5-.22-.5-.5V4c0-1.1-.9-2-2-2s-2 .9-2 2v7.8c0 .28-.22.5-.5.5s-.5-.22-.5-.5V4c0-1.1-.9-2-2-2s-2 .9-2 2v7.5c0 .28-.22.5-.5.5s-.5-.22-.5-.5V5c0-.55-.45-1-1-1z"
              fill="currentColor"
            />
          </motion.svg>
        </div>

        <motion.div
          className="mt-1 text-xs text-white/60 text-center"
          initial={{ opacity: 1 }}
          animate={{ opacity: [1, 0.6, 1] }}
          transition={{ duration: 1.2, repeat: Number.POSITIVE_INFINITY }}
        >
          Vuốt lên
        </motion.div>
      </motion.div>
    </section>
  )
}
