'use client'

import { useState } from "react"

interface MusicPlayerProps {
  audioRef: React.RefObject<HTMLAudioElement | null>
}

export function MusicPlayer({ audioRef }: MusicPlayerProps) {
  const [isMuted, setIsMuted] = useState(true)
  const [error, setError] = useState(false)

  const toggleMute = async () => {
    if (!audioRef.current || error) return

    if (isMuted) {
      audioRef.current.muted = false
      await audioRef.current.play()
      setIsMuted(false)
    } else {
      audioRef.current.muted = true
      setIsMuted(true)
    }
  }

  return (
    <>
      <audio ref={audioRef} loop preload="metadata">
        <source src="/just-say-hello.mp3" type="audio/mpeg" />
      </audio>

      {/* nút bật / tắt nhạc giữ nguyên */}
    </>
  )
}
