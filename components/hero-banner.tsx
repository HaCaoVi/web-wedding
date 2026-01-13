"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface CalendarParticle {
  id: number
  x: number
  y: number
  delay: number
}

export function HeroBanner() {
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

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20 pb-12">
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/RIC_8927.jpg')",
        }}
      >
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
          animate={{
            boxShadow: [
              "0 0 30px rgba(114, 174, 165, 0.2)",
              "0 0 60px rgba(114, 174, 165, 0.4)",
              "0 0 30px rgba(114, 174, 165, 0.2)",
            ],
          }}
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

      {/* Calendar strip - January 2026 */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="relative z-10 bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
      >
        <div className="flex justify-center items-center gap-2">
          {[1, 2, 3, 25, 26, 27, 28, 29, 30, 31].map((day, idx) => (
            <motion.div
              key={day}
              className={`w-10 h-10 flex items-center justify-center rounded-lg font-serif text-sm transition-all ${day === 29 ? "bg-gold text-white glow-pulse" : "bg-white/10 text-white/50 hover:bg-white/20"
                }`}
              whileHover={{ scale: day === 29 ? 1.2 : 1.05 }}
              animate={
                day === 29
                  ? {
                    boxShadow: [
                      "0 0 20px rgba(212, 165, 116, 0.4)",
                      "0 0 40px rgba(212, 165, 116, 0.6)",
                      "0 0 20px rgba(212, 165, 116, 0.4)",
                    ],
                  }
                  : {}
              }
              transition={day === 29 ? { duration: 1.5, repeat: Number.POSITIVE_INFINITY } : {}}
            >
              {day === 29 && <span className="text-lg mr-1">♥</span>}
              {day}
            </motion.div>
          ))}
        </div>
        <p className="text-center text-white/60 text-sm mt-6 font-serif-body">January 29, 2026 • 10:00 AM</p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
      >
        <div className="w-6 h-10 border-2 border-white/40 rounded-full flex items-start justify-center p-2">
          <motion.div
            className="w-1 h-2 bg-white/60 rounded-full"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
          />
        </div>
      </motion.div>
    </section>
  )
}
