"use client"

import { motion } from "framer-motion"

export function Footer() {
  return (
    <footer className="relative w-full bg-sage text-cream overflow-hidden">
      {/* Decorative background */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "url('/images/RIC_8918.jpg')",
          backgroundRepeat: "repeat",
        }}
      ></div>

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`footer-particle-${i}`}
          className="absolute w-1 h-1 rounded-full bg-gold/20"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Number.POSITIVE_INFINITY,
            delay: i * 0.3,
          }}
        />
      ))}

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative z-10 max-w-4xl mx-auto px-6 py-20 text-center"
      >
        {/* Decorative divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-center gap-4 mb-12"
        >
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/50"></div>
          <span className="text-gold text-3xl">♥</span>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/50"></div>
        </motion.div>

        {/* Main thank you message */}
        <motion.div className="mb-12">
          <h3 className="font-serif text-4xl md:text-5xl mb-6 text-balance">With all our love and gratitude</h3>
          <p className="font-serif-body text-lg text-cream/80 leading-relaxed max-w-2xl mx-auto">
            Thank you for being part of our journey. Your love, support, and presence mean the world to us as we embark
            on this beautiful chapter of our lives together.
          </p>
        </motion.div>

        {/* Couple names */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="space-y-2 mb-12"
        >
          <p className="font-serif text-2xl">Thanh Thùy & Cao Vĩ</p>
          <p className="font-serif-body text-sm text-cream/60">January 29, 2026</p>
        </motion.div>

        {/* Footer links */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex justify-center gap-8 mb-12 flex-wrap"
        >
          <a href="#" className="font-serif-body text-cream/70 hover:text-gold transition-colors">
            Gallery
          </a>
          <span className="text-cream/40">•</span>
          <a href="#" className="font-serif-body text-cream/70 hover:text-gold transition-colors">
            Story
          </a>
          <span className="text-cream/40">•</span>
          <a href="#" className="font-serif-body text-cream/70 hover:text-gold transition-colors">
            Contact
          </a>
        </motion.div>

        {/* Copyright */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="font-serif-body text-xs text-cream/40 pt-8 border-t border-cream/20"
        >
          © 2026 Thanh Thùy & Cao Vĩ. Made with love & creativity.
        </motion.p>
      </motion.div>
    </footer>
  )
}
