"use client"
import { motion } from "framer-motion"

const storyLines = [
  "Two souls found each other on a sunny afternoon...",
  "Laughter became their language, love their destination.",
  "Through every moment, big and small, they knew.",
  "This wasn't just love—it was forever.",
  "Now, they invite you to celebrate the beginning.",
]

export function LoveStory() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center py-20 px-6 overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/RIC_8618.jpg')",
        }}
      >
        {/* Blur overlay for text readability */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      </div>

      {/* Floating particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1.5 h-1.5 rounded-full bg-gold/30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [-50, 50],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Number.POSITIVE_INFINITY,
            delay: i * 0.3,
          }}
        />
      ))}

      {/* Story content */}
      <motion.div className="relative z-10 max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="mb-12"
        >
          <h2 className="font-serif text-5xl md:text-6xl text-cream mb-8 tracking-wide">Our Love Story</h2>
        </motion.div>

        {/* Story lines reveal on scroll */}
        <div className="space-y-6">
          {storyLines.map((line, idx) => (
            <motion.p
              key={idx}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.2, duration: 0.8 }}
              className="font-serif-body text-lg md:text-xl text-beige/90 leading-relaxed"
            >
              {line}
            </motion.p>
          ))}
        </div>

        {/* Decorative divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-12 flex items-center justify-center gap-4"
        >
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/50"></div>
          <span className="text-gold text-2xl">♥</span>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/50"></div>
        </motion.div>
      </motion.div>
    </section>
  )
}
