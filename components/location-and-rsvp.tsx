"use client"

import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function LocationAndRsvp() {
  const [formData, setFormData] = useState({
    name: "",
    participants: "1",
    note: "",
  })

  const [submitted, setSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [open, setOpen] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isLoading) return
    setIsLoading(true)

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!res.ok) throw new Error("Submit failed")

      setSubmitted(true)
      setFormData({ name: "", participants: "1", note: "" })

      setTimeout(() => setSubmitted(false), 3500)
    } catch (err) {
      alert("Gửi thất bại, thử lại nhé 😢")
    } finally {
      setIsLoading(false)
    }
  }


  return (
    <section className="relative py-28 px-4 sm:px-6 bg-gradient-to-b from-black via-zinc-900 to-black overflow-hidden">
      {/* soft glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[520px] h-[520px] bg-gold/5 blur-[140px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-sage/5 blur-[120px] rounded-full" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative max-w-xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-cream mb-4">
            Xác nhận tham dự
          </h2>
          <div className="h-[1px] w-32 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6" />
          <p className="text-white/60 text-sm leading-relaxed tracking-widest max-w-[300px] mx-auto uppercase italic font-light">
            Sự hiện diện của bạn là niềm vinh hạnh cho gia đình chúng tôi
          </p>
        </div>

        {/* Glass Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="
            relative rounded-3xl p-8 sm:p-10
            glassmorphism shadow-2xl
          "
        >
          {/* Decorative line */}
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1/3 h-[2px] bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Name */}
            <div>
              <label className="block mb-3 text-gold-light/70 text-xs uppercase tracking-widest font-medium">
                Họ và tên
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Tên của bà nè..."
                className="
                  w-full px-6 py-4 rounded-2xl
                  bg-white/5 border border-white/10
                  text-white placeholder-white/20
                  focus:outline-none focus:ring-1 focus:ring-gold/50 focus:border-gold/30
                  transition-all duration-300
                "
              />
            </div>

            {/* Participants */}
            <div>
              <label className="block mb-3 text-gold-light/70 text-xs uppercase tracking-widest font-medium">
                Số người tham dự
              </label>

              <div className="relative">
                {/* Trigger */}
                <button
                  type="button"
                  onClick={() => setOpen(!open)}
                  className="
                    w-full px-6 py-4 rounded-2xl
                    bg-white/5 border border-white/10
                    text-white text-left
                    flex items-center justify-between
                    hover:border-white/20
                    focus:ring-1 focus:ring-gold/50
                    transition-all duration-300
                  "
                >
                  <span className="flex items-center gap-3">
                    <svg
                      className="w-5 h-5 text-gold/60"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>

                    <span className="text-sm">{formData.participants} người</span>
                  </span>
                  <span className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}>
                    <svg className="w-4 h-4 text-white/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </button>
                {/* Options */}
                <AnimatePresence>
                  {open && (
                    <motion.ul
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="
                        absolute z-20 mt-3 w-full
                        bg-[#1a1a1a] backdrop-blur-2xl
                        border border-white/10
                        rounded-2xl
                        overflow-hidden
                        shadow-2xl
                      "
                    >
                      {[0, 1, 2, 3, 4, 5].map((num) => (
                        <li
                          key={num}
                          onClick={() => {
                            setFormData({ ...formData, participants: String(num) })
                            setOpen(false)
                          }}
                          className={`
                            px-6 py-4 text-sm text-white/80
                            hover:bg-gold/10 hover:text-gold
                            cursor-pointer
                            transition-colors
                            ${formData.participants === String(num) ? "bg-white/5 text-gold" : ""}
                          `}
                        >
                          {num} người
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div>
              <label className="block mb-3 text-gold-light/70 text-xs uppercase tracking-widest font-medium">
                Lời nhắn gửi
              </label>
              <textarea
                name="note"
                maxLength={50}
                rows={3}
                value={formData.note}
                onChange={handleChange}
                placeholder="Hãy gửi những lời iu thương đến chúng toai..."
                className="
                  w-full px-6 py-4 rounded-2xl 
                  bg-white/5 border border-white/10 
                  text-white placeholder-white/20
                  focus:outline-none focus:ring-1 focus:ring-gold/50
                  transition-all duration-300 resize-none
                "
              />
              <p className="text-[10px] text-white/30 mt-2 text-right tracking-tight">
                {formData.note.length}/50
              </p>
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.98 }}
              className="
                relative w-full py-5 mt-4
                rounded-full
                bg-gradient-to-r from-gold to-gold-light
                text-black font-bold tracking-[0.2em] uppercase text-xs
                shadow-lg shadow-gold/20
                overflow-hidden
                disabled:opacity-70
                group
              "
            >
              {/* shimmer */}
              <motion.span
                className="absolute inset-0 bg-white/40"
                animate={isLoading ? { x: ["-100%", "100%"] } : { x: "-100%" }}
                transition={{
                  duration: 1,
                  repeat: isLoading ? Infinity : 0,
                  ease: "linear",
                }}
              />
              <span className="relative z-10">
                {isLoading ? "Đang gửi..." : "Gửi lời chúc"}
              </span>
            </motion.button>
          </form>

          {/* Success overlay */}
          <AnimatePresence>
            {submitted && (
              <motion.div
                initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
                exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                className="
                  absolute inset-0 z-30
                  flex flex-col items-center justify-center
                  bg-black/80
                  rounded-3xl
                "
              >
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="text-gold text-6xl mb-6"
                >
                  ♥
                </motion.div>

                <motion.p
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-cream text-2xl font-serif mb-2"
                >
                  Cảm ơn bà nhooooooo!
                </motion.p>
                <motion.p
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-white/60 text-sm text-center px-8 italic font-light leading-relaxed"
                >
                  Chúng toai đã nhận được lời chúc của bà. Rất mong được gặp bà tại buổi tiệc ✨
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </section>
  )
}
