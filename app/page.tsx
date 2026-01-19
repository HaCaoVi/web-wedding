"use client"

import { HeroBanner } from "@/components/hero-banner"
import { LoveStory } from "@/components/love-story"
import { PhotoGallery } from "@/components/photo-gallery"
import { LocationAndRsvp } from "@/components/location-and-rsvp"
import { Footer } from "@/components/footer"
import InvitationCard from "@/components/invitation-card"
import WeddingApp from "@/components/wedding-app"
import { FloatingComments } from "@/components/live-comments"
import { useSearchParams } from "next/navigation"
export default function Home() {
  const searchParams = useSearchParams()
  console.log("🚀 ~ Home ~ searchParams:", searchParams)
  const author = searchParams?.get("author") ?? "ithufy"
  const time = author !== 'icao' ? "3:00 P.M" : "10:00 A.M"
  const day = author !== 'icao' ? 28 : 29
  const date = author !== 'icao' ? "28 Tháng 1 2026" : "29 Tháng 1 2026"
  const address = author !== 'icao' ? "QL60, Hiếu Tử, Tiểu Cần, Trà Vinh" : "Hòa Quới, Hòa Tân, Châu Thành, Đồng Tháp"
  const coords = author !== 'icao' ? { lat: 9.853984558350485, lng: 106.19198233501535, alt: '1162m' } : { lat: 10.174201731328207, lng: 105.83362987855745, alt: '1162m' }
  return (
    <main className="bg-background text-foreground overflow-x-hidden">
      <FloatingComments />
      <HeroBanner
        time={time}
        day={day}
      />
      {/* Invitation card inserted below HeroBanner */}
      <InvitationCard
        bride="Thanh Thùy"
        groom="Cao Vĩ"
        dateLabel={date}
        timeLabel={time}
        venueName="Tư gia"
        address={address}
        mapsLabel="Chỉ đường"
        coords={coords}
      />
      <WeddingApp />
      <LoveStory />
      <PhotoGallery />
      <LocationAndRsvp />
      <Footer day={day} />
    </main>
  )
}
