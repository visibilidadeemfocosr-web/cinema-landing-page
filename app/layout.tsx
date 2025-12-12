import type React from "react"
import type { Metadata } from "next"
import { Source_Sans_3, Cormorant_Garamond } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Toaster } from "@/components/ui/toaster"
import { I18nProvider } from "@/lib/i18n/context"
import "./globals.css"

// Fonte para corpo do texto - limpa, moderna e legível
const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
})

// Fonte para títulos - elegante, cinematográfica e sofisticada
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Alice Stamato - Diretora de Cinema & Roteirista",
  description:
    "Portfolio de Alice Stamato, diretora de cinema e roteirista brasileira. Fundadora da produtora audiovisual Lombada Filmes.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/peixeheader.png",
        type: "image/png",
      },
      {
        url: "/peixeheader.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/peixeheader.png",
        sizes: "16x16",
        type: "image/png",
      },
    ],
    apple: "/peixeheader.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${sourceSans.variable} ${cormorant.variable} font-sans antialiased`}>
        <I18nProvider>
          {children}
          <Toaster />
          <Analytics />
        </I18nProvider>
      </body>
    </html>
  )
}
