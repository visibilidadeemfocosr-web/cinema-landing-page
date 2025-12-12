"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useI18n } from "@/lib/i18n/context"
import { LanguageSelector } from "@/components/language-selector"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const { t } = useI18n()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 sm:gap-3 font-display text-lg sm:text-xl lg:text-2xl font-bold tracking-tight hover:text-accent transition-colors"
            aria-label="Voltar ao topo"
          >
            {/* Imagem do cabeçalho */}
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0">
              <img
                src="/peixeheader.png"
                alt="Alice Stamato"
                width={48}
                height={48}
                className="object-contain"
                style={{ maxWidth: '100%', maxHeight: '100%' }}
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                }}
              />
            </div>
            <span className="truncate">{t.header.title}</span>
          </button>

          <LanguageSelector />
        </div>
      </div>
    </header>
  )
}
