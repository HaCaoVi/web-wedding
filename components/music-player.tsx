"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Volume2, VolumeX } from "lucide-react"

export function MusicPlayer() {
  const [isMuted, setIsMuted] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)
  const [error, setError] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  const toggleMute = () => {
    if (error) {
      console.log("[v0] Cannot play: audio file error")
      return
    }

    setIsMuted(!isMuted)
    if (audioRef.current) {
      try {
        if (isMuted) {
          // Unmute and play
          audioRef.current.muted = false
          const playPromise = audioRef.current.play()
          if (playPromise !== undefined) {
            playPromise
              .then(() => {
                setIsPlaying(true)
                console.log("[v0] Audio playing successfully")
              })
              .catch((err) => {
                console.log("[v0] Play error:", err.message)
                setError(true)
                setIsMuted(true)
              })
          }
        } else {
          // Mute
          audioRef.current.muted = true
          setIsPlaying(false)
        }
      } catch (err) {
        console.log("[v0] Toggle error:", err)
        setError(true)
      }
    }
  }

  const handleAudioError = (e: any) => {
    console.log("[v0] Audio load error:", e.currentTarget?.error?.message)
    setError(true)
    setIsPlaying(false)
  }

  const handleAudioCanPlay = () => {
    console.log("[v0] Audio file loaded successfully")
    setError(false)
  }

  useEffect(() => {
    const audio = audioRef.current
    if (audio) {
      audio.loop = true
      audio.volume = 0.3
      audio.muted = true
      audio.addEventListener("error", handleAudioError)
      audio.addEventListener("canplay", handleAudioCanPlay)

      return () => {
        audio.removeEventListener("error", handleAudioError)
        audio.removeEventListener("canplay", handleAudioCanPlay)
      }
    }
  }, [])

  return (
    <>
      {/* Audio element with multiple source formats for compatibility */}
      <audio ref={audioRef} preload="metadata" crossOrigin="anonymous">
        <source src="/just-say-hello.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      {/* Floating music toggle button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
        onClick={toggleMute}
        disabled={error}
        className={`fixed bottom-8 right-8 z-40 w-14 h-14 rounded-full glassmorphism flex items-center justify-center transition-all group ${error ? "opacity-50 cursor-not-allowed" : "hover:bg-white/40"
          }`}
        whileHover={error ? {} : { scale: 1.1 }}
        whileTap={error ? {} : { scale: 0.95 }}
      >
        <motion.div
          animate={!isMuted && !error ? { rotate: 360 } : { rotate: 0 }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className="absolute inset-0 rounded-full opacity-50 group-hover:opacity-100"
        >
          {!isMuted && !error && (
            <>
              <motion.div
                className="absolute inset-0 rounded-full border border-gold/30"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
              />
              <motion.div
                className="absolute inset-0 rounded-full border border-gold/20"
                animate={{ scale: [1, 1.4, 1] }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, delay: 0.2 }}
              />
            </>
          )}
        </motion.div>

        {error ? (
          <VolumeX className="w-6 h-6 text-red-500 relative z-10" />
        ) : isMuted ? (
          <VolumeX className="w-6 h-6 text-sage relative z-10" />
        ) : (
          <Volume2 className="w-6 h-6 text-gold relative z-10" />
        )}
      </motion.button>

      {/* Floating particle effect when playing */}
      {!isMuted && !error && (
        <>
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={`music-particle-${i}`}
              className="fixed bottom-8 right-8 w-2 h-2 rounded-full bg-gold pointer-events-none"
              animate={{
                x: Math.cos((i * Math.PI * 2) / 3) * 40,
                y: Math.sin((i * Math.PI * 2) / 3) * 40 - 50,
                opacity: [1, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.3,
              }}
            />
          ))}
        </>
      )}
    </>
  )
}
