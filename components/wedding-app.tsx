"use client"

import { useRef, useState } from "react"
import { MusicPlayer } from "./music-player"
import { IntroEnvelope } from "./intro-envelope"

export default function WeddingApp() {
    const audioRef = useRef<HTMLAudioElement>(null)
    const [musicStarted, setMusicStarted] = useState(false)

    const startMusic = async () => {
        if (!audioRef.current || musicStarted) return

        try {
            audioRef.current.muted = false
            audioRef.current.volume = 0.3
            await audioRef.current.play()
            setMusicStarted(true)
            console.log("[music] started by envelope click")
        } catch (err) {
            console.log("[music] play failed", err)
        }
    }

    return (
        <>
            <MusicPlayer audioRef={audioRef} />
            <IntroEnvelope onOpen={startMusic} />
        </>
    )
}
