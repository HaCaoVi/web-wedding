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
    coords: { lat: number; lng: number; alt?: string }
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
    // Default coords (user provided): lat, lng, alt
    const defaultCoords = { lat: 10.1743449, lng: 105.831008, alt: '1162m' }
    const useCoords = coords ?? defaultCoords

    const mapsUrl = useCoords
        ? `https://www.google.com/maps/search/?api=1&query=${useCoords.lat},${useCoords.lng}`
        : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`

    const coordsDisplay = useCoords ? `${useCoords.lat}, ${useCoords.lng}${useCoords.alt ? ` (${useCoords.alt})` : ''}` : undefined

    // Parse dateLabel (expects format like "29 Tháng 1 2026") to separate day/month/year
    const _dateMatch = dateLabel.match(/(\d+)\s+(.*)\s+(\d{4})/)
    const dayNumber = _dateMatch ? _dateMatch[1] : dateLabel
    const monthStr = _dateMatch ? _dateMatch[2] : ''
    const yearStr = _dateMatch ? _dateMatch[3] : ''

    return (
        <section className="max-w-md mx-auto mt-8 mb-12">
            <div className="bg-white/6 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center">
                {/* Parents header — Nhà Gái / separator / Nhà Trai */}
                <div className="flex items-start justify-center gap-4 mb-4 text-center">
                    <div className="flex-1">
                        <div className="text-sm text-white/80 font-medium">Nhà Gái</div>
                        <div className="mt-2 text-xs text-white/80 leading-snug">
                            {brideParents.map((p, i) => (
                                <div key={i}>{p}</div>
                            ))}
                        </div>
                        <div className="mt-1 text-xs italic text-cream">{brideLocation}</div>
                    </div>

                    <div className="flex items-center">
                        <div className="w-2 h-16 bg-gold/80 rounded-sm mx-3 relative flex items-center justify-center">
                            <div className="w-3 h-3 bg-green-800 rounded-full border border-white/20"></div>
                        </div>
                    </div>

                    <div className="flex-1">
                        <div className="text-sm text-white/80 font-medium">Nhà Trai</div>
                        <div className="mt-2 text-xs text-white/80 leading-snug">
                            {groomParents.map((p, i) => (
                                <div key={i}>{p}</div>
                            ))}
                        </div>
                        <div className="mt-1 text-xs italic text-cream">{groomLocation}</div>
                    </div>
                </div>

                <div className="text-sm text-white/60 mb-1 tracking-wider uppercase">Kính mời</div>
                <div className="text-sm text-white/60 mb-1 tracking-wider uppercase">tham dự tiệc chung vui
                    của gia đình chúng tôi</div>

                <h3 className="font-serif text-4xl md:text-6xl text-cream tracking-wide leading-tight mb-3">{bride}</h3>
                <div> <span className="mx-2 text-white/60">&amp;</span></div>
                <h3 className="font-serif text-4xl md:text-6xl text-cream tracking-wide leading-tight mb-3">{groom}</h3>
                <div className="text-sm text-white/50 mb-2">{timeLabel}</div>

                {/* Big date block */}
                <div className="flex items-center justify-center gap-6 my-3">
                    <div className="text-xs uppercase text-white/60 text-center">{monthStr}</div>
                    <div className="text-5xl md:text-6xl font-serif text-cream font-medium leading-none">{dayNumber}</div>
                    <div className="text-xs uppercase text-white/60 text-center">Năm {yearStr}</div>
                </div>

                <hr className="border-t border-white/10 my-3" />

                <div className="mb-4">
                    <div className="text-lg md:text-xl text-cream font-semibold">{venueName}</div>
                    <div className="text-sm text-white/50">{address}</div>                    {coordsDisplay && (
                        <div className="mt-1 text-[11px] text-white/40">Tọa độ: <a className="underline" href={mapsUrl} target="_blank" rel="noreferrer noopener">{coordsDisplay}</a></div>
                    )}                </div>

                {/* Decorative flourish */}
                <div className="mt-2 mb-3 flex justify-center">
                    <svg width="80" height="14" viewBox="0 0 80 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-60">
                        <path d="M2 8c15-12 35-6 38 0 3-6 22-12 38 0" stroke="rgba(255,255,255,0.6)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>

                <div className="flex items-center justify-center gap-3">
                    <a
                        href={mapsUrl}
                        target="_blank"
                        rel="noreferrer noopener"
                        onClick={(e) => { e.preventDefault(); window.open(mapsUrl, '_blank', 'noopener,noreferrer'); }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 text-white font-medium shadow-sm hover:bg-emerald-500 transition cursor-pointer"
                        aria-label={`Mở ${mapsLabel} cho ${venueName}${coordsDisplay ? ' — ' + coordsDisplay : ''}`}
                    >
                        {/* map pin icon (white) */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-white">
                            <path d="M12 2C8.134 2 5 5.134 5 9c0 5.25 7 12 7 12s7-6.75 7-12c0-3.866-3.134-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" />
                        </svg>
                        {mapsLabel}
                    </a>
                </div>
            </div>
        </section>
    )
}
