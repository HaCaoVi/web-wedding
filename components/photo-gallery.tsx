"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

const galleryImages = [
  { id: 1, src: "/images/RIC_7559.jpg", alt: "Engagement photo", width: 2, height: 2 },
  { id: 2, src: "/images/RIC_7366.jpg", alt: "Dancing moment", width: 1, height: 1 },
  { id: 3, src: "/images/RIC_7463.jpg", alt: "Bride preparation", width: 1, height: 2 },
  { id: 4, src: "/images/RIC_7519.jpg", alt: "Ceremony kiss", width: 2, height: 1 },
  { id: 5, src: "/images/RIC_7624.jpg", alt: "Reception", width: 1, height: 1 },
  { id: 6, src: "/images/RIC_7629.jpg", alt: "Couple silhouette", width: 1, height: 1 },
  { id: 7, src: "/images/RIC_7655.jpg", alt: "Sunset portrait", width: 1, height: 1 },
  { id: 8, src: "/images/RIC_7758.jpg", alt: "Sunset portrait", width: 1, height: 1 },
  { id: 9, src: "/images/RIC_7852.jpg", alt: "Sunset portrait", width: 1, height: 1 },
  { id: 10, src: "/images/RIC_7888.jpg", alt: "Sunset portrait", width: 1, height: 1 },
  { id: 11, src: "/images/RIC_7903.jpg", alt: "Sunset portrait", width: 1, height: 1 },
  { id: 12, src: "/images/RIC_7917.jpg", alt: "Sunset portrait", width: 1, height: 1 },
  { id: 13, src: "/images/RIC_7944.jpg", alt: "Sunset portrait", width: 1, height: 1 },
  { id: 14, src: "/images/RIC_7972.jpg", alt: "Sunset portrait", width: 1, height: 1 },
  { id: 15, src: "/images/RIC_8049.jpg", alt: "Sunset portrait", width: 1, height: 1 },
  { id: 16, src: "/images/RIC_8054.jpg", alt: "Sunset portrait", width: 1, height: 1 },
  { id: 17, src: "/images/RIC_8096.jpg", alt: "Sunset portrait", width: 1, height: 1 },
  { id: 18, src: "/images/RIC_8105.jpg", alt: "Sunset portrait", width: 1, height: 1 },
  { id: 19, src: "/images/RIC_8231.jpg", alt: "Sunset portrait", width: 1, height: 1 },
  { id: 20, src: "/images/RIC_8282.jpg", alt: "Sunset portrait", width: 1, height: 1 },
  { id: 21, src: "/images/RIC_8258.jpg", alt: "Sunset portrait", width: 2, height: 1 },
  { id: 22, src: "/images/RIC_8319.jpg", alt: "Sunset portrait", width: 2, height: 1 },
  { id: 23, src: "/images/RIC_8306.jpg", alt: "Sunset portrait", width: 1, height: 1 },
  { id: 24, src: "/images/RIC_8359.jpg", alt: "Sunset portrait", width: 1, height: 1 },
  { id: 25, src: "/images/RIC_8360.jpg", alt: "Sunset portrait", width: 1, height: 1 },
  { id: 26, src: "/images/RIC_8418.jpg", alt: "Sunset portrait", width: 1, height: 1 },
  { id: 27, src: "/images/RIC_8434.jpg", alt: "Sunset portrait", width: 1, height: 1 },
  { id: 28, src: "/images/RIC_8536.jpg", alt: "Sunset portrait", width: 1, height: 1 },
  { id: 29, src: "/images/RIC_8594.jpg", alt: "Sunset portrait", width: 1, height: 1 },
  { id: 30, src: "/images/RIC_8611.jpg", alt: "Sunset portrait", width: 1, height: 1 },
  { id: 31, src: "/images/RIC_8622.jpg", alt: "Sunset portrait", width: 2, height: 1 },
  { id: 32, src: "/images/RIC_8646.jpg", alt: "Sunset portrait", width: 1, height: 1 },
  { id: 33, src: "/images/RIC_8661.jpg", alt: "Sunset portrait", width: 1, height: 1 },
  { id: 34, src: "/images/RIC_8717.jpg", alt: "Sunset portrait", width: 1, height: 1 },
  { id: 35, src: "/images/RIC_8727.jpg", alt: "Sunset portrait", width: 1, height: 1 },
  { id: 36, src: "/images/RIC_8763.jpg", alt: "Sunset portrait", width: 1, height: 1 },
  { id: 37, src: "/images/RIC_8780.jpg", alt: "Sunset portrait", width: 1, height: 1 },
  { id: 38, src: "/images/RIC_8814.jpg", alt: "Sunset portrait", width: 1, height: 1 },
  { id: 39, src: "/images/RIC_8857.jpg", alt: "Sunset portrait", width: 1, height: 1 },
  { id: 40, src: "/images/RIC_8918.jpg", alt: "Sunset portrait", width: 2, height: 1 },
  { id: 41, src: "/images/RIC_8887.jpg", alt: "Sunset portrait", width: 1, height: 1 },
  { id: 42, src: "/images/RIC_8927.jpg", alt: "Sunset portrait", width: 1, height: 1 },
]

export function PhotoGallery() {
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const selectedImage = galleryImages.find((img) => img.id === selectedId)
  const selectedIndex = selectedImage ? galleryImages.indexOf(selectedImage) : 0

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % galleryImages.length)
  }

  return (
    <section className="relative w-full py-20 px-6 bg-beige/20 overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="max-w-7xl mx-auto"
      >
        <h2 className="font-serif text-5xl md:text-6xl text-sage mb-4 text-center">Album tình iu</h2>
        <div className="h-1 w-24 bg-gold mx-auto mb-12 rounded-full"></div>

        {/* Masonry gallery */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
          {galleryImages.map((image, idx) => (
            <motion.div
              key={image.id}
              className={`relative overflow-hidden rounded-2xl cursor-pointer group ${image.width === 2 ? "col-span-2" : ""
                } ${image.height === 2 ? "row-span-2" : ""}`}
              whileHover={{ scale: 1.02 }}
              onClick={() => {
                setSelectedId(image.id)
                setCurrentIndex(idx)
              }}
            >
              {/* Image container */}
              <div className="relative w-full h-48 md:h-80 overflow-hidden">
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  quality={90}
                  loading="lazy"
                />

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <motion.div className="text-white text-center" initial={{ scale: 0 }} whileHover={{ scale: 1 }}>
                    <div className="text-4xl mb-2">♥</div>
                    <p className="text-sm font-serif-body">View</p>
                  </motion.div>
                </div>

                {/* Sparkle effect on hover */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                >
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 rounded-full bg-gold"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                      }}
                      animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
                      transition={{ duration: 0.6, delay: i * 0.1 }}
                    />
                  ))}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Lightbox modal */}
      <AnimatePresence>
        {selectedId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 md:p-8"
            onClick={() => setSelectedId(null)}
          >
            {/* Close button */}
            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.1 }}
              onClick={() => setSelectedId(null)}
              className="absolute top-4 right-4 md:top-8 md:right-8 bg-white/20 hover:bg-white/30 p-2 rounded-full z-20 transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </motion.button>

            {/* Image container */}
            <div
              className="relative w-full h-full max-h-screen flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                key={selectedIndex}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="relative w-full max-w-5xl h-auto"
              >
                <Image
                  src={galleryImages[selectedIndex].src || "/placeholder.svg"}
                  alt={galleryImages[selectedIndex].alt}
                  width={1920}
                  height={1280}
                  className="w-full h-auto rounded-lg"
                  priority
                  quality={100}
                  sizes="(max-width: 1280px) 100vw, 1280px"
                />
              </motion.div>

              {/* Previous button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.stopPropagation()
                  handlePrevious()
                }}
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 p-3 md:p-4 rounded-full transition-colors z-10"
              >
                <ChevronLeft className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </motion.button>

              {/* Next button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.stopPropagation()
                  handleNext()
                }}
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 p-3 md:p-4 rounded-full transition-colors z-10"
              >
                <ChevronRight className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </motion.button>

              {/* Image counter */}
              <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 bg-black/50 px-4 py-2 rounded-full">
                <p className="text-white text-sm font-serif-body">
                  {selectedIndex + 1} / {galleryImages.length}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
