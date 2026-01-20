import { motion } from "framer-motion"

interface InvitationCardProps {
    bride: string
    groom: string
    dateLabel: string
    timeLabel: string
    venueName: string
    address: string
    mapsLabel: string
    brideParents?: string[]
    groomParents?: string[]
    brideLocation?: string
    groomLocation?: string
    coords?: { lat: number; lng: number; alt?: string }
}

export default function InvitationCard({
    bride,
    groom,
    dateLabel,
    timeLabel,
    venueName,
    address,
    mapsLabel = "Chỉ đường",
    brideParents = ["Ông. Trần Văn Khởi", "Bà. Lâm Thị Thúy"],
    groomParents = ["Ông. Hà Văn Súp", "Bà. Cao Thị Kim Tư"],
    brideLocation = "Trà Vinh",
    groomLocation = "Đồng Tháp",
    coords
}: InvitationCardProps) {

    /* ===== COORDS ===== */
    const defaultCoords = { lat: 10.174201731328207, lng: 105.83362987855745 }
    const useCoords = coords ?? defaultCoords

    const mapsUrl =
        `https://www.google.com/maps/dir/?api=1&destination=${useCoords.lat},${useCoords.lng}`

    const coordsDisplay = `${useCoords.lat}, ${useCoords.lng}`

    /* ===== DATE PARSE ===== */
    const match = dateLabel.match(/(\d+)\s+(.*)\s+(\d{4})/)
    const day = match?.[1] ?? dateLabel
    const month = match?.[2] ?? ''
    const year = match?.[3] ?? ''

    return (
        <section className="relative w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto py-12 px-4 pointer-events-auto">

            {/* ===== CONTENT LAYER ===== */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 glassmorphism rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 text-center pointer-events-auto shadow-2xl"
            >
                {/* Decoration corners */}
                <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-gold/40 rounded-tl-lg" />
                <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-gold/40 rounded-tr-lg" />
                <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-gold/40 rounded-bl-lg" />
                <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-gold/40 rounded-br-lg" />

                {/* ===== PARENTS ===== */}
                <div className="flex items-start justify-center gap-4 sm:gap-6 md:gap-10 mb-8 md:mb-10">
                    <div className="flex-1">
                        <div className="text-sm sm:text-base font-serif text-gold-light uppercase tracking-widest">Nhà Gái</div>
                        <div className="mt-3 text-xs sm:text-sm md:text-base text-white/90 space-y-1">
                            {brideParents.map((p, i) => <div key={i}>{p}</div>)}
                        </div>
                        <div className="mt-2 text-xs italic text-cream/70 uppercase tracking-tighter">{brideLocation}</div>
                    </div>

                    <div className="flex items-center self-stretch py-2">
                        <div className="w-[1px] bg-gradient-to-b from-transparent via-gold/50 to-transparent" />
                    </div>

                    <div className="flex-1">
                        <div className="text-sm sm:text-base font-serif text-gold-light uppercase tracking-widest">Nhà Trai</div>
                        <div className="mt-3 text-xs sm:text-sm md:text-base text-white/90 space-y-1">
                            {groomParents.map((p, i) => <div key={i}>{p}</div>)}
                        </div>
                        <div className="mt-2 text-xs italic text-cream/70 uppercase tracking-tighter">{groomLocation}</div>
                    </div>
                </div>

                {/* ===== INVITE ===== */}
                <div className="text-xs sm:text-sm text-white/60 uppercase tracking-[0.2em] mb-1">Kính mời quý khách</div>
                <div className="text-[10px] sm:text-xs text-white/40 uppercase tracking-widest mb-6 md:mb-8">
                    tham dự tiệc chung vui cùng gia đình chúng tôi
                </div>

                <div className="space-y-2 md:space-y-4 mb-8">
                    <h3 className="font-serif text-4xl sm:text-5xl md:text-6xl text-glow text-cream">{bride}</h3>
                    <div className="flex items-center justify-center gap-4">
                        <div className="h-[1px] w-8 bg-gold/30" />
                        <span className="text-gold text-2xl">♥</span>
                        <div className="h-[1px] w-8 bg-gold/30" />
                    </div>
                    <h3 className="font-serif text-4xl sm:text-5xl md:text-6xl text-glow text-cream">{groom}</h3>
                </div>

                <div className="inline-block px-4 py-1 border-y border-gold/20 text-xs sm:text-sm text-white/50 mb-6 tracking-[0.1em]">
                    {timeLabel}
                </div>

                {/* ===== DATE ===== */}
                <div className="flex items-center justify-center gap-6 sm:gap-10 md:gap-12 my-6 md:my-8">
                    <div className="text-xs sm:text-sm text-gold/60 uppercase tracking-[0.2em] font-serif">{month}</div>
                    <div className="relative">
                        <div className="text-6xl sm:text-7xl md:text-8xl font-serif text-cream leading-none">{day}</div>
                        <div className="absolute -bottom-2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent opacity-50" />
                    </div>
                    <div className="text-xs sm:text-sm text-gold/60 uppercase tracking-[0.2em] font-serif">{year}</div>
                </div>

                {/* ===== VENUE ===== */}
                <div className="mb-8 md:mb-10">
                    <div className="text-lg sm:text-xl md:text-2xl text-cream font-serif tracking-wide">{venueName}</div>
                    <div className="text-xs sm:text-sm text-white/50 mt-2 max-w-[280px] mx-auto italic leading-relaxed">
                        {address}
                    </div>
                </div>

                {/* ===== MAP BUTTON (CLICK 100%) ===== */}
                <div className="flex justify-center">
                    <motion.a
                        href={mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                            relative z-10 pointer-events-auto
                            inline-flex items-center gap-3
                            px-8 py-3.5 rounded-full
                            bg-gradient-to-r from-gold-light to-gold-light
                            text-black text-sm sm:text-base font-semibold tracking-widest uppercase
                            shadow-xl shadow-emerald-900/40
                            hover:shadow-green-500/20
                            transition-all duration-500
                        "
                        whileHover={{ y: -5, scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {/* Icon */}
                        <motion.svg
                            className="w-5 h-5"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            animate={{ y: [0, -4, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <path d="M12 2C8.134 2 5 5.134 5 9c0 5.25 7 12 7 12s7-6.75 7-12c0-3.866-3.134-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" />
                        </motion.svg>

                        <div className="text-xs sm:text-sm text-black font-serif">{mapsLabel}</div>
                    </motion.a>
                </div>
            </motion.div>
        </section>
    )
}
