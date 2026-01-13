"use client"

import { IntroEnvelope } from "@/components/intro-envelope"
import { HeroBanner } from "@/components/hero-banner"
import { LoveStory } from "@/components/love-story"
import { PhotoGallery } from "@/components/photo-gallery"
import { MusicPlayer } from "@/components/music-player"
import { LocationAndRsvp } from "@/components/location-and-rsvp"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="bg-background text-foreground overflow-x-hidden">
      <IntroEnvelope />
      <HeroBanner />
      <LoveStory />
      <PhotoGallery />
      <LocationAndRsvp />
      <Footer />
      <MusicPlayer />
    </main>
  )
}
