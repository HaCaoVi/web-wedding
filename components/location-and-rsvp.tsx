"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"

export function LocationAndRsvp() {
  const [formData, setFormData] = useState({ name: "", phone: "" })
  const [submitted, setSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate form submission
    setTimeout(() => {
      setSubmitted(true)
      setIsLoading(false)
      setFormData({ name: "", phone: "" })
      setTimeout(() => setSubmitted(false), 3000)
    }, 1000)
  }

  return (
    <>
      {/* Location Section */}
      <section className="relative w-full py-20 px-6 bg-gradient-to-b from-cream to-beige/30">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="font-serif text-5xl md:text-6xl text-sage mb-4 text-center">Celebration Details</h2>
          <div className="h-1 w-24 bg-gold mx-auto mb-12 rounded-full"></div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Left: Location info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col justify-center"
            >
              <div className="space-y-8">
                <div>
                  <h3 className="font-serif text-2xl text-sage mb-2">Venue</h3>
                  <p className="font-serif-body text-lg text-sage/70">Tổ chức tại gia</p>
                  <p className="font-serif-body text-sm text-sage/50 mt-1">Family celebration</p>
                </div>

                <div>
                  <h3 className="font-serif text-2xl text-sage mb-2">Date</h3>
                  <p className="font-serif-body text-lg text-sage/70">January 29, 2026</p>
                </div>

                <div>
                  <h3 className="font-serif text-2xl text-sage mb-2">Time</h3>
                  <p className="font-serif-body text-lg text-sage/70">10:00 AM</p>
                </div>

                <div className="pt-8 border-t border-gold/20">
                  <p className="font-serif-body text-sm text-sage/60 leading-relaxed">
                    Join us for an intimate celebration of love and commitment as two hearts become one.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Right: Map placeholder */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative h-80 rounded-2xl overflow-hidden shadow-2xl"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3835.7859893891587!2d107.05869731532156!3d10.796829261358338!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317530c2635e0000%3A0xc24c4fa99b7f5f0!2sVi%E1%BB%87t%20Nam!5e0!3m2!1svi!2s!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* RSVP Section */}
      <section className="relative w-full py-20 px-6 bg-sage/5">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="max-w-2xl mx-auto"
        >
          <h2 className="font-serif text-5xl md:text-6xl text-sage mb-4 text-center">RSVP</h2>
          <div className="h-1 w-24 bg-gold mx-auto mb-12 rounded-full"></div>

          <motion.form
            onSubmit={handleSubmit}
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Name field */}
            <div>
              <label htmlFor="name" className="block font-serif-body text-sage mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-6 py-4 bg-white border-2 border-sage/20 rounded-lg focus:outline-none focus:border-gold text-sage placeholder-sage/40 text-lg font-serif-body transition-colors"
                placeholder="Tên của bạn"
              />
            </div>

            {/* Phone field */}
            <div>
              <label htmlFor="phone" className="block font-serif-body text-sage mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-6 py-4 bg-white border-2 border-sage/20 rounded-lg focus:outline-none focus:border-gold text-sage placeholder-sage/40 text-lg font-serif-body transition-colors"
                placeholder="Số điện thoại của bạn"
              />
            </div>

            {/* Submit button */}
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 bg-gradient-to-r from-sage to-sage-light text-white font-serif-body text-lg rounded-lg hover:shadow-xl transition-all disabled:opacity-70 relative overflow-hidden"
            >
              <motion.div
                animate={isLoading ? { x: ["0%", "100%"] } : { x: "100%" }}
                transition={{ duration: 0.5, repeat: isLoading ? Number.POSITIVE_INFINITY : 0 }}
                className="absolute inset-0 bg-white/20"
              />
              <span className="relative z-10">{isLoading ? "Sending..." : "Confirm Attendance"}</span>
            </motion.button>
          </motion.form>

          {/* Success message */}
          {submitted && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="mt-8 p-6 bg-gold/10 border-2 border-gold rounded-lg text-center"
            >
              <motion.p className="font-serif text-2xl text-gold mb-2">✓</motion.p>
              <p className="font-serif-body text-sage text-lg">Thank you! We will be in touch soon.</p>
            </motion.div>
          )}
        </motion.div>
      </section>
    </>
  )
}
