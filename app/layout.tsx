import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Lora } from "next/font/google"
import "./globals.css"
import { Analytics } from "@vercel/analytics/next"
import localFont from "next/font/local"

const dancingScript = localFont({
  src: "../public/font/Dancing_Script/DancingScript-VariableFont_wght.ttf",
  variable: "--font-dancing",
  display: "swap",
})

const gaegu = localFont({
  src: [
    {
      path: "../public/font/Gaegu/Gaegu-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/font/Gaegu/Gaegu-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/font/Gaegu/Gaegu-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-gaegu",
  display: "swap",
})


const _playfairDisplay = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" })
const _lora = Lora({ subsets: ["latin"], variable: "--font-serif-body" })

export const metadata: Metadata = {
  title: "IThufy ♥ ICao",
  description: "Join us for a celebration of love on January 29, 2026",
  generator: "v0.app",
  icons: {
    icon: [
      { url: "/icon-light-32x32.png", media: "(prefers-color-scheme: light)" },
      { url: "/icon-dark-32x32.png", media: "(prefers-color-scheme: dark)" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/images/RIC_8727.jpg",
  },
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head></head>
      <body
        className={`
          ${_playfairDisplay.variable}
          ${_lora.variable}
          ${dancingScript.variable}
          ${gaegu.variable}
          font-sans antialiased overflow-x-hidden`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
