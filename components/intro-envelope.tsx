"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface Particle {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  life: number
}

export function IntroEnvelope() {
  const [isOpened, setIsOpened] = useState(false)
  const [particles, setParticles] = useState<Particle[]>([])
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Generate fireworks particles
  useEffect(() => {
    if (!isOpened) return

    const generateParticles = () => {
      const newParticles: Particle[] = []
      const centerX = typeof window !== "undefined" ? window.innerWidth / 2 : 0
      const centerY = typeof window !== "undefined" ? window.innerHeight / 2 : 0

      for (let i = 0; i < 30; i++) {
        const angle = (Math.PI * 2 * i) / 30
        const velocity = 3 + Math.random() * 4
        newParticles.push({
          id: i,
          x: centerX,
          y: centerY,
          vx: Math.cos(angle) * velocity,
          vy: Math.sin(angle) * velocity,
          life: 1,
        })
      }
      setParticles(newParticles)
    }

    generateParticles()

    const interval = setInterval(() => {
      setParticles((prev) =>
        prev
          .map((p) => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            vy: p.vy + 0.1,
            life: p.life - 0.02,
          }))
          .filter((p) => p.life > 0),
      )
    }, 16)

    return () => clearInterval(interval)
  }, [isOpened])

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY })
  }

  const handleEnvelopeClick = () => {
    setIsOpened(true)
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: isOpened ? 0 : 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, delay: isOpened ? 1 : 0 }}
        className="fixed inset-0 bg-gradient-to-b from-sage-light/20 via-cream to-beige flex items-center justify-center z-50"
        onMouseMove={handleMouseMove}
      >
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Background floating particles */}
          {!isOpened && (
            <>
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={`bg-particle-${i}`}
                  className="absolute w-1 h-1 rounded-full bg-gold/30"
                  animate={{
                    x: Math.cos((i * Math.PI * 2) / 5) * 100,
                    y: Math.sin((i * Math.PI * 2) / 5) * 80 + Math.sin(Date.now() / 1000 + i) * 30,
                  }}
                  transition={{ duration: 4 + i, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  style={{
                    left: "50%",
                    top: "50%",
                  }}
                />
              ))}
            </>
          )}

          {/* Main envelope */}
          <motion.div
            initial={{ scale: 0, rotateZ: -45 }}
            animate={{ scale: isOpened ? 0.8 : 1, rotateZ: isOpened ? 0 : 0, y: isOpened ? -200 : 0 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
            className="cursor-pointer relative"
            onClick={handleEnvelopeClick}
          >
            {/* Envelope container */}
            <motion.div
              animate={{
                rotateX: isOpened ? 180 : 0,
              }}
              transition={{ duration: 0.8 }}
              style={{
                perspective: 1000,
              }}
              className="w-80 h-56 relative"
            >
              {/* Envelope back */}
              <div className="absolute inset-0 bg-gradient-to-br from-white to-beige rounded-lg shadow-2xl border-2 border-gold/30">
                {/* Envelope flap */}
                <motion.div
                  animate={{
                    rotateX: isOpened ? -120 : 0,
                  }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="absolute inset-0 bg-gradient-to-br from-white to-cream rounded-t-lg origin-top"
                  style={{
                    clipPath: "polygon(0 0, 50% 40%, 100% 0, 100% 100%, 0 100%)",
                  }}
                >
                  {/* Decorative line on flap */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-20">
                    <div className="w-40 h-px bg-sage"></div>
                  </div>
                </motion.div>

                {/* Envelope letter content hint */}
                <div className="absolute inset-0 flex items-center justify-center pt-12">
                  <div className="text-center">
                    <div className="font-serif text-4xl text-sage/60 mb-4">♥</div>
                    <p className="font-serif-body text-sage/50 text-sm tracking-widest">TAP TO OPEN</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Glow effect behind envelope */}
            {!isOpened && (
              <motion.div
                className="absolute inset-0 rounded-lg bg-gold/10 blur-2xl"
                animate={{ opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              />
            )}
          </motion.div>

          {/* Fireworks particles */}
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="fixed w-1 h-1 rounded-full pointer-events-none"
              style={{
                left: particle.x,
                top: particle.y,
                background: ["#72AEA5", "#D4A574"][Math.floor(Math.random() * 2)],
                opacity: particle.life,
                boxShadow: `0 0 ${8 * particle.life}px currentColor`,
              }}
            />
          ))}

          {/* Click instruction text */}
          {!isOpened && (
            <motion.div
              className="absolute bottom-20 text-center"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              <p className="font-serif text-sage/40 text-xs tracking-widest">TOUCH TO BEGIN</p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </>
  )
}
