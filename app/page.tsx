"use client"

import { HeroBanner } from "@/components/hero-banner"
import { LoveStory } from "@/components/love-story"
import { PhotoGallery } from "@/components/photo-gallery"
import { LocationAndRsvp } from "@/components/location-and-rsvp"
import { Footer } from "@/components/footer"
import InvitationCard from "@/components/invitation-card"
import WeddingApp from "@/components/wedding-app"

export default function Home() {
  return (
    <main className="bg-background text-foreground overflow-x-hidden">
      <HeroBanner />
      {/* Invitation card inserted below HeroBanner */}
      <InvitationCard
        bride="Thanh Thùy"
        groom="Cao Vĩ"
        dateLabel="29 Tháng 1 2026"
        timeLabel="10:00"
        venueName="Tại gia"
        address="Hòa Quới, Hòa Tân, Châu Thành, Đồng Tháp"
        mapsLabel="Chỉ đường"
        coords={{ lat: 10.174201731328207, lng: 105.83362987855745, alt: '1162m' }}
      />
      <WeddingApp />
      <LoveStory />
      <PhotoGallery />
      <LocationAndRsvp />
      <Footer />
    </main>
  )
}
