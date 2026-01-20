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
    <section className="relative py-28 px-6 bg-gradient-to-b from-black via-zinc-900 to-black overflow-hidden">
      {/* soft glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[520px] h-[520px] bg-green-500/10 blur-[140px] rounded-full" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative max-w-xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="font-serif text-4xl md:text-5xl text-white mb-4">
            Xác nhận tham dự
          </h2>
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-green-400 to-transparent mx-auto mb-6" />
          <p className="text-white/60 text-sm leading-relaxed">
            Sự hiện diện của bạn là niềm vinh hạnh cho gia đình chúng tôi
          </p>
        </div>

        {/* Glass Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="
            relative rounded-3xl p-8
            bg-white/5 backdrop-blur-xl
            border border-white/10
            shadow-2xl
          "
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block mb-2 text-white/70 text-sm">
                Họ và tên
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Nhập tên ở đây nè bàaaaaa"
                className="
                  w-full px-6 py-4 rounded-full
                  bg-black/40 border border-white/10
                  text-white placeholder-white/40
                  focus:outline-none focus:ring-1 focus:ring-green-400
                  transition
                "
              />
            </div>

            {/* Participants */}
            <div>
              <label className="block mb-2 text-white/70 text-sm">
                Số người tham dự
              </label>

              <div className="relative">
                {/* Trigger */}
                <button
                  type="button"
                  onClick={() => setOpen(!open)}
                  className="
        w-full px-6 py-4 rounded-full
        bg-black/40 border border-white/10
        text-white text-left
        flex items-center justify-between
        hover:border-white/30
        focus:ring-2 focus:ring-green-400/30
        transition
      "
                >
                  <span className="flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-white/70"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>

                    <span>{formData.participants} người</span>
                  </span>
                  <span className={`transition ${open ? "rotate-180" : ""}`}>▾</span>
                </button>
                {/* Options */}
                <AnimatePresence>
                  {open && (
                    <motion.ul
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="
            absolute z-20 mt-3 w-full
            bg-black/80 backdrop-blur-xl
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
                          className="
                px-6 py-3 text-white
                hover:bg-green-500/20
                cursor-pointer
                transition
              "
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
              <label className="block mb-2 text-white/70 text-sm">
                Lời nhắn
              </label>
              <textarea
                name="note"
                maxLength={50}
                value={formData.note}
                onChange={handleChange}
                placeholder="Hãy gửi những lời iu thương..."
                className="w-full px-6 py-4 rounded-2xl bg-black/40 border border-white/10 text-white"
              />
              <p className="text-xs text-white/40 mt-1">
                {formData.note.length}/50
              </p>
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="
                relative w-full py-4 mt-6
                rounded-full
                bg-gradient-to-r from-emerald-500 to-green-600
                text-black font-semibold tracking-wide
                shadow-lg shadow-green-500/30
                overflow-hidden
                disabled:opacity-70
              "
            >
              {/* shimmer */}
              <motion.span
                className="absolute inset-0 bg-white/30"
                animate={isLoading ? { x: ["-100%", "100%"] } : { x: "100%" }}
                transition={{
                  duration: 1,
                  repeat: isLoading ? Infinity : 0,
                  ease: "linear",
                }}
              />
              <span className="relative z-10">
                {isLoading ? "Đang gửi..." : "Xác nhận tham dự"}
              </span>
            </motion.button>
          </form>

          {/* Success overlay */}
          <AnimatePresence mode="wait">
            {submitted && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                style={{
                  touchAction: "none",
                  userSelect: "none",
                  WebkitUserSelect: "none",
                }}
                className="
        absolute inset-0
        flex flex-col items-center justify-center
        bg-black/80
        backdrop-blur-md md:backdrop-blur-xl
        rounded-3xl
        pointer-events-none
      "
              >
                <motion.div
                  initial={{ scale: 0.6 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 180, damping: 14 }}
                  className="text-green-400 text-4xl mb-3"
                >
                  ♥
                </motion.div>

                <p className="text-white text-lg mb-1">
                  Cảm ơn bà nhooooooo!
                </p>
                <p className="text-white/60 text-sm text-center px-4">
                  Chúng toai rất mong được gặp bà tại buổi tiệc nhoooooo ✨
                </p>
              </motion.div>
            )}
          </AnimatePresence>

        </motion.div>
      </motion.div>
    </section>
  )
}
