"use client"

import { HeroBanner } from "@/components/hero-banner"
import InvitationCard from "@/components/invitation-card"
import WeddingApp from "@/components/wedding-app"
import { FloatingComments } from "@/components/live-comments"
import { useSearchParams } from "next/navigation"
import dynamic from "next/dynamic"

const LoveStory = dynamic(() => import("@/components/love-story").then(mod => mod.LoveStory), { ssr: false })
const PhotoGallery = dynamic(() => import("@/components/photo-gallery").then(mod => mod.PhotoGallery), { ssr: false })
const LocationAndRsvp = dynamic(() => import("@/components/location-and-rsvp").then(mod => mod.LocationAndRsvp), { ssr: false })
const Footer = dynamic(() => import("@/components/footer").then(mod => mod.Footer), { ssr: false })

export default function Home() {
  const searchParams = useSearchParams()
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

