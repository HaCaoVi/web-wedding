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
        <section className="relative w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto pointer-events-auto">

            {/* ===== BLUR LAYER (KHÔNG BẮT CLICK) ===== */}
            <div className="absolute inset-0 backdrop-blur-sm pointer-events-none" />

            {/* ===== CONTENT LAYER ===== */}
            <div className="relative z-10 rounded-2xl p-4 sm:p-6 md:p-8 lg:p-10 text-center pointer-events-auto">

                {/* ===== PARENTS ===== */}
                <div className="flex items-start justify-center gap-3 sm:gap-4 md:gap-6 lg:gap-8 mb-4 md:mb-6">
                    <div className="flex-1">
                        <div className="text-sm sm:text-base md:text-lg text-white/80 font-medium">Nhà Gái</div>
                        <div className="mt-2 text-xs sm:text-sm md:text-base text-white/80 space-y-0.5 md:space-y-1">
                            {brideParents.map((p, i) => <div key={i}>{p}</div>)}
                        </div>
                        <div className="mt-1 md:mt-2 text-xs sm:text-sm italic text-cream">{brideLocation}</div>
                    </div>

                    <div className="flex items-center">
                        <div className="w-1.5 sm:w-2 h-14 sm:h-16 md:h-20 bg-gold/80 rounded-sm mx-2 sm:mx-3 flex items-center justify-center">
                            <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 bg-green-800 rounded-full border border-white/20" />
                        </div>
                    </div>

                    <div className="flex-1">
                        <div className="text-sm sm:text-base md:text-lg text-white/80 font-medium">Nhà Trai</div>
                        <div className="mt-2 text-xs sm:text-sm md:text-base text-white/80 space-y-0.5 md:space-y-1">
                            {groomParents.map((p, i) => <div key={i}>{p}</div>)}
                        </div>
                        <div className="mt-1 md:mt-2 text-xs sm:text-sm italic text-cream">{groomLocation}</div>
                    </div>
                </div>

                {/* ===== INVITE ===== */}
                <div className="text-xs sm:text-sm md:text-base text-white/60 uppercase tracking-wide">Kính mời quý khách</div>
                <div className="text-xs sm:text-sm md:text-base text-white/60 uppercase mb-2 md:mb-4 tracking-wide">
                    tham dự tiệc chung vui cùng gia đình chúng tôi
                </div>

                <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-cream mb-1 sm:mb-2">{bride}</h3>
                <span className="text-white/60 text-sm sm:text-base md:text-lg">&amp;</span>
                <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-cream mt-1 sm:mt-2 mb-2 sm:mb-3 md:mb-4">{groom}</h3>

                <div className="text-xs sm:text-sm md:text-base text-white/50">{timeLabel}</div>

                {/* ===== DATE ===== */}
                <div className="flex items-center justify-center gap-4 sm:gap-6 md:gap-8 my-3 md:my-4 lg:my-5">
                    <div className="text-[10px] sm:text-xs md:text-sm text-white/60 uppercase tracking-wider">{month}</div>
                    <div className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif text-cream">{day}</div>
                    <div className="text-[10px] sm:text-xs md:text-sm text-white/60 uppercase tracking-wider">Năm {year}</div>
                </div>

                <hr className="border-white/10 my-3 md:my-4" />

                {/* ===== VENUE ===== */}
                <div className="mb-4 md:mb-6">
                    <div className="text-base sm:text-lg md:text-xl lg:text-2xl text-cream font-semibold">{venueName}</div>
                    <div className="text-xs sm:text-sm md:text-base text-white/50 mt-1">{address}</div>
                </div>

                {/* ===== DECOR SVG (NO CLICK) ===== */}
                <div className="mt-2 mb-3 md:mb-4 flex justify-center pointer-events-none">
                    <svg className="w-16 sm:w-20 md:w-24 lg:w-28 h-auto" viewBox="0 0 80 14" fill="none">
                        <path
                            d="M2 8c15-12 35-6 38 0 3-6 22-12 38 0"
                            stroke="rgba(255,255,255,0.6)"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                        />
                    </svg>
                </div>

                {/* ===== MAP BUTTON (CLICK 100%) ===== */}
                <div className="flex justify-center mt-4 md:mt-6">
                    <motion.a
                        href={mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                            relative z-[9999] pointer-events-auto
                            inline-flex items-center gap-2 sm:gap-3
                            px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-3.5 rounded-full
                            bg-gradient-to-r from-emerald-500 to-green-600
                            text-white text-sm sm:text-base md:text-lg font-semibold tracking-wide
                            shadow-lg shadow-emerald-500/30
                            overflow-hidden
                            hover:shadow-xl hover:shadow-emerald-500/40
                            transition-shadow duration-300
                        "
                        whileHover={{ y: -3, scale: 1.02 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {/* Glow layer */}
                        <span
                            className="
                                absolute inset-0
                                bg-white/20 blur-xl
                                opacity-0 group-hover:opacity-100
                                transition-opacity
                            "
                        />

                        {/* Icon */}
                        <motion.svg
                            className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 relative z-10"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            animate={{ y: [0, -3, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <path d="M12 2C8.134 2 5 5.134 5 9c0 5.25 7 12 7 12s7-6.75 7-12c0-3.866-3.134-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" />
                        </motion.svg>

                        {/* Text */}
                        <span className="relative z-10">{mapsLabel}</span>

                        {/* Ripple hover */}
                        <motion.span
                            className="absolute -inset-4 rounded-full bg-white/10"
                            initial={{ scale: 0 }}
                            whileHover={{ scale: 1 }}
                            transition={{ duration: 0.4 }}
                        />
                    </motion.a>
                </div>
            </div>
        </section>
    )
}
