"use client"

import { HeroBanner } from "@/components/hero-banner"
import { LoveStory } from "@/components/love-story"
import { PhotoGallery } from "@/components/photo-gallery"
import { LocationAndRsvp } from "@/components/location-and-rsvp"
import { Footer } from "@/components/footer"
import WeddingApp from "@/components/wedding-app"

export default function Home() {
  return (
    <main className="bg-background text-foreground overflow-x-hidden">
      <WeddingApp />
      <HeroBanner />
      <LoveStory />
      <PhotoGallery />
      <LocationAndRsvp />
      <Footer />
    </main>
  )
}
