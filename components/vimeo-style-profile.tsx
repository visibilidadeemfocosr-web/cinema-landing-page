"use client"

import Image from "next/image"
import { Mail, MapPin, Film } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useI18n } from "@/lib/i18n/context"
import { LanguageSelector } from "@/components/language-selector"
import { Footer } from "@/components/footer"
import { useFilms } from "@/lib/hooks/use-films"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"

export function VimeoStyleProfile() {
  const [showAll, setShowAll] = useState(false)
  const [showFullBio, setShowFullBio] = useState(false)
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)
  const { t } = useI18n()
  const { films, loading } = useFilms(true) // Buscar apenas filmes publicados
  
  // Converter filmes do banco para o formato esperado
  const videosFromDb = films.map((film) => ({
    id: film.id,
    title: film.title,
    thumbnail: film.thumbnail || "/placeholder.svg",
    duration: film.duration,
    views: film.views.toString(),
    link: film.videoUrl,
    vimeoId: film.id,
    year: film.year,
    category: film.category,
    type: film.type || undefined,
  }))
  
  // Usar apenas filmes do banco (sem fallback para mock)
  const allVideosToDisplay = videosFromDb
  const displayedVideos = showAll ? allVideosToDisplay : allVideosToDisplay.slice(0, 4)

  return (
    <div className="min-h-screen bg-white text-zinc-900 relative overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            {/* Gradientes terracotta */}
            <linearGradient id="terracottaGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="oklch(0.58 0.15 35)" stopOpacity="0.8" />
              <stop offset="100%" stopColor="oklch(0.65 0.18 30)" stopOpacity="0.4" />
            </linearGradient>
            <linearGradient id="terracottaGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="oklch(0.58 0.15 35)" stopOpacity="0.6" />
              <stop offset="100%" stopColor="oklch(0.52 0.12 45)" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient id="terracottaGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="oklch(0.65 0.18 30)" stopOpacity="0.7" />
              <stop offset="50%" stopColor="oklch(0.58 0.15 35)" stopOpacity="0.5" />
              <stop offset="100%" stopColor="oklch(0.52 0.12 45)" stopOpacity="0.3" />
            </linearGradient>
          </defs>

          {/* ========== LINHAS ARTÍSTICAS ASSIMÉTRICAS ========== */}
          
          {/* Linha orgânica superior - trajetória livre e assimétrica */}
          <path
            d="M 3% 10% Q 12% 8%, 22% 12% Q 35% 15%, 48% 11% Q 62% 9%, 75% 13% Q 82% 16%, 88% 14%"
            stroke="oklch(0.58 0.15 35)"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
            opacity="0.7"
          />

          {/* Linha orgânica meio - curva assimétrica pronunciada */}
          <path
            d="M 5% 48% Q 18% 42%, 28% 50% Q 42% 58%, 55% 52% Q 68% 46%, 80% 51% Q 88% 55%, 92% 50%"
            stroke="oklch(0.65 0.18 30)"
            strokeWidth="2.8"
            strokeLinecap="round"
            fill="none"
            opacity="0.8"
          />

          {/* Linha orgânica inferior - trajetória livre */}
          <path
            d="M 8% 90% Q 25% 82%, 38% 88% Q 52% 92%, 65% 86% Q 78% 80%, 85% 88%"
            stroke="oklch(0.58 0.15 35)"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
            opacity="0.7"
          />

          {/* Linha vertical orgânica direita - não reta */}
          <path
            d="M 90% 15% Q 92% 28%, 89% 38% Q 91% 48%, 88% 58% Q 90% 65%, 87% 70%"
            stroke="oklch(0.62 0.16 38)"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
            opacity="0.6"
          />

          {/* ========== ESPIRAIS ORGÂNICAS ========== */}
          
          {/* Espiral orgânica esquerda - assimétrica */}
          <path
            d="M 11% 24% Q 9% 22%, 7% 24% Q 6% 27%, 9% 29% Q 12% 31%, 11% 34% Q 9% 37%, 7% 35% Q 6% 32%, 8% 30%"
            stroke="oklch(0.58 0.15 35)"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
            opacity="0.7"
            className="animate-spiral"
          />

          {/* Espiral orgânica direita - trajetória livre */}
          <path
            d="M 86% 44% Q 84% 42%, 82% 44% Q 81% 47%, 83% 49% Q 85% 51%, 87% 53% Q 86% 55%, 84% 53% Q 82% 51%, 83% 49%"
            stroke="oklch(0.65 0.18 30)"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
            opacity="0.7"
            className="animate-spiral"
          />

          {/* Espiral orgânica meio - não quadrada */}
          <path
            d="M 49% 34% Q 51% 32%, 53% 34% Q 54% 36%, 52% 38% Q 50% 40%, 48% 38% Q 47% 36%, 49% 34%"
            stroke="oklch(0.62 0.16 38)"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
            opacity="0.8"
            className="animate-spiral"
          />

          {/* ========== CURVAS ARTÍSTICAS ASSIMÉTRICAS ========== */}
          
          {/* Curva orgânica diagonal - trajetória livre */}
          <path
            d="M 10% 22% Q 25% 18%, 38% 25% Q 52% 32%, 65% 28% Q 75% 24%, 82% 30%"
            stroke="oklch(0.58 0.15 35)"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
            opacity="0.65"
          />

          {/* Curva em S assimétrica pronunciada */}
          <path
            d="M 15% 32% Q 28% 26%, 42% 33% Q 55% 40%, 48% 45% Q 35% 50%, 22% 43%"
            stroke="oklch(0.65 0.18 30)"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
            opacity="0.8"
          />

          {/* Curva orgânica longa - múltiplas variações */}
          <path
            d="M 8% 78% Q 22% 68%, 35% 72% Q 48% 78%, 58% 74% Q 68% 70%, 78% 76% Q 85% 80%, 90% 75%"
            stroke="oklch(0.58 0.15 35)"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
            opacity="0.75"
          />

          {/* Curva vertical orgânica esquerda */}
          <path
            d="M 12% 28% Q 10% 38%, 13% 48% Q 11% 58%, 14% 68% Q 12% 75%, 15% 82%"
            stroke="oklch(0.62 0.16 38)"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
            opacity="0.6"
          />

          {/* Curva em espiral orgânica */}
          <path
            d="M 70% 18% Q 75% 22%, 72% 28% Q 68% 32%, 74% 36% Q 78% 40%, 72% 44%"
            stroke="oklch(0.58 0.15 35)"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
            opacity="0.65"
          />

          {/* Curva assimétrica ascendente */}
          <path
            d="M 55% 38% Q 65% 32%, 75% 36% Q 82% 42%, 88% 38% Q 85% 32%, 80% 30%"
            stroke="oklch(0.65 0.18 30)"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
            opacity="0.65"
          />

          {/* Curva orgânica inferior esquerda */}
          <path
            d="M 4% 65% Q 15% 72%, 25% 68% Q 35% 64%, 42% 70%"
            stroke="oklch(0.58 0.15 35)"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
            opacity="0.7"
          />

          {/* Curva em arco assimétrico */}
          <path
            d="M 30% 6% Q 42% 3%, 55% 7% Q 65% 12%, 58% 18% Q 48% 15%, 38% 12%"
            stroke="oklch(0.62 0.16 38)"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
            opacity="0.7"
          />

          {/* ========== LINHAS ORGÂNICAS ADICIONAIS ========== */}
          
          {/* Linha orgânica sinuosa - trajetória livre */}
          <path
            d="M 18% 15% Q 28% 12%, 38% 16% Q 48% 20%, 42% 25% Q 32% 22%, 22% 18%"
            stroke="oklch(0.62 0.16 38)"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
            opacity="0.6"
          />

          {/* Linha orgânica longa horizontal - múltiplas curvas */}
          <path
            d="M 2% 28% Q 12% 24%, 22% 28% Q 32% 32%, 28% 36% Q 18% 34%, 8% 30% Q 15% 26%, 25% 30% Q 38% 34%, 48% 30% Q 58% 26%, 68% 30%"
            stroke="oklch(0.58 0.15 35)"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
            opacity="0.65"
          />

          {/* Linha orgânica ascendente - curva pronunciada */}
          <path
            d="M 6% 42% Q 18% 36%, 28% 42% Q 38% 48%, 32% 52% Q 22% 50%, 12% 46%"
            stroke="oklch(0.65 0.18 30)"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
            opacity="0.8"
          />

          {/* Linha orgânica em arco assimétrico */}
          <path
            d="M 72% 8% Q 82% 4%, 92% 9% Q 88% 16%, 78% 14% Q 68% 12%, 75% 10%"
            stroke="oklch(0.58 0.15 35)"
            strokeWidth="2.7"
            strokeLinecap="round"
            fill="none"
            opacity="0.85"
          />

          {/* Linha orgânica descendente - trajetória livre */}
          <path
            d="M 78% 26% Q 85% 32%, 88% 38% Q 82% 44%, 75% 48% Q 68% 44%, 72% 38%"
            stroke="oklch(0.62 0.16 38)"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
            opacity="0.7"
          />

          {/* Linha orgânica vertical - não reta */}
          <path
            d="M 14% 35% Q 12% 45%, 15% 55% Q 13% 65%, 16% 75% Q 14% 82%, 17% 88%"
            stroke="oklch(0.58 0.15 35)"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
            opacity="0.65"
          />

          {/* Linha orgânica em onda assimétrica */}
          <path
            d="M 22% 85% Q 32% 80%, 42% 85% Q 52% 90%, 48% 95% Q 38% 92%, 28% 88% Q 35% 83%, 45% 88% Q 58% 93%, 68% 88% Q 78% 83%, 85% 88%"
            stroke="oklch(0.65 0.18 30)"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
            opacity="0.7"
          />

          {/* Linha orgânica diagonal - trajetória livre */}
          <path
            d="M 42% 12% Q 52% 20%, 62% 25% Q 72% 32%, 68% 38% Q 58% 35%, 48% 28%"
            stroke="oklch(0.62 0.16 38)"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
            opacity="0.65"
          />

          {/* Linha orgânica em loop assimétrico */}
          <path
            d="M 52% 58% Q 48% 64%, 52% 70% Q 58% 75%, 64% 70% Q 68% 64%, 62% 60% Q 56% 56%, 52% 58%"
            stroke="oklch(0.58 0.15 35)"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
            opacity="0.7"
          />

          {/* ========== LINHAS QUEBRADAS ORGÂNICAS ========== */}
          
          {/* Linha quebrada orgânica superior - assimétrica */}
          <path
            d="M 28% 20% L 32% 18% L 35% 22% L 38% 19% L 41% 23% L 44% 20%"
            stroke="oklch(0.58 0.15 35)"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
            opacity="0.7"
          />

          {/* Linha quebrada orgânica meio - trajetória livre */}
          <path
            d="M 68% 58% L 72% 56% L 75% 60% L 78% 57% L 81% 61% L 84% 58%"
            stroke="oklch(0.65 0.18 30)"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
            opacity="0.7"
          />


          {/* ========== CÍRCULOS ANIMADOS ========== */}
          
          {/* Círculo pequeno superior esquerda */}
          <circle
            cx="20%"
            cy="10%"
            r="10"
            stroke="oklch(0.58 0.15 35)"
            strokeWidth="2"
            fill="none"
            opacity="0.7"
            className="animate-circle-pulse"
          />

          {/* Círculo médio meio direita */}
          <circle
            cx="80%"
            cy="40%"
            r="14"
            stroke="oklch(0.65 0.18 30)"
            strokeWidth="2"
            fill="none"
            opacity="0.7"
            className="animate-circle-pulse"
          />

          {/* Círculo pequeno inferior esquerda */}
          <circle
            cx="15%"
            cy="80%"
            r="8"
            stroke="oklch(0.62 0.16 38)"
            strokeWidth="2"
            fill="none"
            opacity="0.7"
            className="animate-circle-pulse animate-circle-rotate"
          />

          {/* Círculo médio centro */}
          <circle
            cx="50%"
            cy="65%"
            r="12"
            stroke="oklch(0.58 0.15 35)"
            strokeWidth="2"
            fill="none"
            opacity="0.65"
            className="animate-circle-pulse"
          />

          {/* Círculo grande direita inferior */}
          <circle
            cx="85%"
            cy="75%"
            r="18"
            stroke="oklch(0.52 0.12 45)"
            strokeWidth="2"
            fill="none"
            opacity="0.65"
            className="animate-circle-pulse animate-circle-rotate"
          />

          {/* Círculo pequeno superior direita */}
          <circle
            cx="75%"
            cy="15%"
            r="9"
            stroke="oklch(0.58 0.15 35)"
            strokeWidth="2"
            fill="none"
            opacity="0.7"
            className="animate-circle-pulse"
          />

          {/* Círculo médio centro superior */}
          <circle
            cx="45%"
            cy="25%"
            r="11"
            stroke="oklch(0.65 0.18 30)"
            strokeWidth="2"
            fill="none"
            opacity="0.65"
            className="animate-circle-pulse animate-circle-rotate"
          />

          {/* Círculo pequeno meio esquerda */}
          <circle
            cx="25%"
            cy="55%"
            r="7"
            stroke="oklch(0.62 0.16 38)"
            strokeWidth="2"
            fill="none"
            opacity="0.7"
            className="animate-circle-pulse"
          />

          {/* Círculo médio centro direito */}
          <circle
            cx="65%"
            cy="60%"
            r="13"
            stroke="oklch(0.58 0.15 35)"
            strokeWidth="2"
            fill="none"
            opacity="0.6"
            className="animate-circle-pulse animate-circle-rotate"
          />

          {/* Círculo pequeno inferior direita */}
          <circle
            cx="70%"
            cy="90%"
            r="6"
            stroke="oklch(0.65 0.18 30)"
            strokeWidth="2"
            fill="none"
            opacity="0.7"
            className="animate-circle-pulse"
          />

          {/* Círculo médio superior esquerda */}
          <circle
            cx="10%"
            cy="30%"
            r="10"
            stroke="oklch(0.52 0.12 45)"
            strokeWidth="2"
            fill="none"
            opacity="0.65"
            className="animate-circle-pulse animate-circle-rotate"
          />

          {/* Círculo pequeno centro */}
          <circle
            cx="55%"
            cy="45%"
            r="8"
            stroke="oklch(0.62 0.16 38)"
            strokeWidth="2"
            fill="none"
            opacity="0.7"
            className="animate-circle-pulse"
          />
        </svg>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-zinc-200" style={{ backgroundColor: 'oklch(0.99 0.01 35)' }}>
          <div className="mx-auto flex h-16 max-w-[1800px] items-center justify-between px-6">
            <div className="flex items-center gap-3 text-2xl font-bold">
              <img
                src="/peixeheader.png"
                alt="Alice Stamato"
                width={40}
                height={40}
                className="object-contain"
                style={{ maxWidth: '40px', maxHeight: '40px' }}
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                }}
              />
              <span>Alice Stamato</span>
            </div>
            <LanguageSelector />
          </div>
        </header>

        {/* Hero Banner */}
        <div className="relative h-[280px] overflow-hidden bg-gradient-to-br from-zinc-100 to-zinc-200">
          <Image
            src="/cinematic-film-production-background.jpeg"
            alt="Banner"
            fill
            className="object-cover opacity-80"
            sizes="100vw"
            priority
          />
        </div>

        {/* Main Content */}
        <div className="mx-auto max-w-[1400px] px-6">
          <div className="flex gap-8 py-8">
            {/* Sidebar */}
            <aside className="w-[280px] flex-shrink-0">
              <div className="sticky top-8 rounded-lg bg-zinc-50 p-6 text-zinc-900 border border-zinc-200">
                {/* Profile Image */}
                <div className="mb-4 overflow-hidden rounded-full">
                  <Image
                    src="/images/alicestamato.jpeg"
                    alt="Alice Stamato - Diretora de Cinema e Roteirista"
                    width={200}
                    height={200}
                    className="w-full"
                    loading="lazy"
                    sizes="200px"
                  />
                </div>

                {/* Name */}
                <h1 className="mb-1 text-2xl font-bold">Alice Stamato</h1>

                {/* Location */}
                <div className="mb-3 flex items-center gap-2 text-sm text-zinc-600">
                  <MapPin className="h-4 w-4" />
                  <span>São Paulo, SP, Brasil</span>
                </div>

                {/* Pronouns */}
                <div className="mb-4 text-sm text-zinc-600">she/her</div>

                {/* Bio */}
                <div className="mb-4 text-sm leading-relaxed text-zinc-700">
                  {showFullBio ? (
                    <>
                      <p className="mb-2">{t.about.bio1} <span className="font-medium text-zinc-900">{t.about.bio2}</span> {t.about.bio3}</p>
                      <p className="mb-2">{t.about.bio4}</p>
                      <p className="mb-2">{t.about.bio5}</p>
                      <button 
                        onClick={() => setShowFullBio(false)}
                        className="font-medium text-zinc-900 hover:underline mt-2"
                      >
                        Ler menos
                      </button>
                    </>
                  ) : (
                    <>
                      <p>
                        {t.about.bio1} <span className="font-medium text-zinc-900">{t.about.bio2}</span> {t.about.bio3}{" "}
                        <button 
                          onClick={() => setShowFullBio(true)}
                          className="font-medium text-zinc-900 hover:underline"
                        >
                          {t.vimeoProfile.readMore}
                        </button>
                      </p>
                    </>
                  )}
                </div>

                {/* Email */}
                <div className="mb-3 flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-zinc-600" />
                  <a href="mailto:alicestamato@gmail.com" className="hover:underline">
                    alicestamato@gmail.com
                  </a>
                </div>

                {/* Social Links */}
                <div className="mb-4 space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.073-1.689-.073-4.948 0-3.259.014-3.668.072-4.948.2-4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                    <a
                      href="https://instagram.com/alicestamato"
                      className="hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      @alicestamato
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                    <a
                      href="https://instagram.com/lombadafilmes"
                      className="hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      @lombadafilmes
                    </a>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-2 border-zinc-300 text-zinc-900 hover:bg-zinc-100 bg-transparent hidden"
                  >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                    {t.vimeoProfile.follow}
                  </Button>
                  <Button className="w-full justify-start gap-2 bg-emerald-600 text-white hover:bg-emerald-700">
                    <Mail className="h-4 w-4" />
                    {t.vimeoProfile.message}
                  </Button>
                </div>

                {/* Activity Stats */}
                <div className="mt-6 border-t border-zinc-200 pt-6 hidden">
                  <h3 className="mb-3 text-sm font-semibold">{t.vimeoProfile.activity}</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-zinc-600">{t.vimeoProfile.showcases}</span>
                      <span className="font-medium">0</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-600">{t.vimeoProfile.followers}</span>
                      <span className="font-medium">10</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-600">{t.vimeoProfile.following}</span>
                      <span className="font-medium">7</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-600">{t.vimeoProfile.collections}</span>
                      <span className="font-medium">1</span>
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            {/* Main Video Grid */}
            <main className="flex-1">
              <div className="mb-6 flex items-end justify-between">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-zinc-800">{t.vimeoProfile.portfolio}</h2>
                  <div className="h-1.5 mt-2 bg-accent" style={{ width: '200px' }}></div>
                </div>
                {!loading && allVideosToDisplay.length > 0 && (
                  <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-oklch(0.96 0.02 35) text-oklch(0.55 0.12 35) border border-oklch(0.90 0.04 35)">
                    {allVideosToDisplay.length} {allVideosToDisplay.length === 1 ? 'filme' : 'filmes'}
                  </span>
                )}
              </div>

              {/* Loading State */}
              {loading && (
                <div className="space-y-8">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="aspect-video w-full rounded-lg bg-zinc-200 mb-3" />
                      <div className="h-6 w-3/4 rounded bg-zinc-200 mb-2" />
                      <div className="flex gap-2">
                        <div className="h-6 w-16 rounded-full bg-zinc-200" />
                        <div className="h-6 w-20 rounded-full bg-zinc-200" />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Empty State */}
              {!loading && allVideosToDisplay.length === 0 && (
                <div className="text-center py-12">
                  <Film className="h-16 w-16 text-zinc-400 mx-auto mb-4" />
                  <p className="text-zinc-500 text-lg">Nenhum filme publicado ainda.</p>
                </div>
              )}

              {/* Videos List */}
              {!loading && allVideosToDisplay.length > 0 && (
                <div className="space-y-8">
                  {displayedVideos.map((video) => (
                  <div key={video.id} className="group">
                    <button
                      onClick={() => setSelectedVideo(video.link)}
                      className="block w-full text-left"
                      aria-label={`Assistir ${video.title}`}
                    >
                      {/* Video Thumbnail */}
                      <div className="relative mb-3 aspect-video overflow-hidden rounded bg-gradient-to-br from-zinc-200 to-zinc-300 border border-zinc-200 cursor-pointer">
                        {video.thumbnail ? (
                          <Image
                            src={video.thumbnail}
                            alt={`Thumbnail do vídeo: ${video.title}`}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            loading="lazy"
                          />
                        ) : video.link ? (
                          // Se não tem thumbnail mas tem vídeo, usar o vídeo como poster
                          <video
                            src={video.link}
                            className="w-full h-full object-cover"
                            muted
                            playsInline
                            preload="metadata"
                            onLoadedMetadata={(e) => {
                              // Tentar pegar um frame do vídeo
                              const video = e.currentTarget
                              video.currentTime = 1 // Pega frame no segundo 1
                            }}
                          />
                        ) : (
                          // Placeholder quando não tem nem thumbnail nem vídeo
                          <div className="w-full h-full flex items-center justify-center">
                            <div className="text-center p-8">
                              <Film className="h-16 w-16 text-zinc-400 mx-auto mb-4" />
                              <p className="text-zinc-500 text-sm font-medium">{video.title}</p>
                            </div>
                          </div>
                        )}
                        {/* Play Button Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90">
                            <svg className="h-8 w-8 text-zinc-900" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                        </div>
                        {/* Duration Badge */}
                        <div className="absolute bottom-3 right-3 rounded bg-black/80 px-2 py-1 text-xs font-medium text-white">
                          {video.duration}
                        </div>
                      </div>

                      {/* Video Info */}
                      <h3 className="text-lg font-medium text-zinc-900 group-hover:text-zinc-600 transition-colors mb-2">
                        {video.title}
                      </h3>
                      {/* Tags: Ano, Duração, Categoria */}
                      <div className="flex flex-wrap gap-2 mt-2">
                        {(() => {
                          const film = films.find(f => f.id === video.id)
                          if (!film) return null
                          
                          // Cores sutis para cada categoria
                          const getCategoryColors = (category: string) => {
                            switch (category) {
                              case 'Ficção':
                                return 'bg-oklch(0.96 0.02 35) text-oklch(0.55 0.12 35) border-oklch(0.90 0.04 35)'
                              case 'Drama':
                                return 'bg-oklch(0.96 0.02 25) text-oklch(0.55 0.12 25) border-oklch(0.90 0.04 25)'
                              case 'Documentário':
                                return 'bg-oklch(0.96 0.02 45) text-oklch(0.55 0.12 45) border-oklch(0.90 0.04 45)'
                              case 'Comercial':
                                return 'bg-oklch(0.96 0.02 30) text-oklch(0.55 0.12 30) border-oklch(0.90 0.04 30)'
                              default:
                                return 'bg-zinc-100 text-zinc-700 border-zinc-200'
                            }
                          }
                          
                          return (
                            <>
                              {film.year && (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-zinc-100 text-zinc-700 border border-zinc-200">
                                  {film.year}
                                </span>
                              )}
                              {film.duration && (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-zinc-100 text-zinc-700 border border-zinc-200">
                                  {film.duration}
                                </span>
                              )}
                              {film.category && (
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getCategoryColors(film.category)}`}>
                                  {film.category}
                                </span>
                              )}
                              {film.type && (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-zinc-100 text-zinc-700 border border-zinc-200">
                                  {film.type}
                                </span>
                              )}
                            </>
                          )
                        })()}
                      </div>
                    </button>
                  </div>
                  ))}
                </div>
              )}

              {/* Video Modal */}
              <Dialog open={!!selectedVideo} onOpenChange={(open) => !open && setSelectedVideo(null)}>
                <DialogContent 
                  className="!max-w-[100vw] !w-screen !h-[98vh] p-0 bg-black !border-0 !m-0 !translate-x-[-50%] !translate-y-[-50%] !top-[50%] !left-[50%] !rounded-none !grid-cols-1" 
                  showCloseButton={true}
                  style={{ width: '100vw', maxWidth: '100vw' }}
                >
                  {selectedVideo && (
                    <>
                      <DialogTitle className="sr-only">Player de Vídeo</DialogTitle>
                      <div className="relative w-full h-full bg-black flex items-center justify-center">
                        <video
                          src={selectedVideo}
                          controls
                          autoPlay
                          className="w-full h-full max-w-full max-h-full object-contain"
                          controlsList="nodownload"
                        >
                          Seu navegador não suporta o elemento de vídeo.
                        </video>
                      </div>
                    </>
                  )}
                </DialogContent>
              </Dialog>

              {!loading && !showAll && allVideosToDisplay.length > 4 && (
                <div className="mt-8 flex justify-center">
                  <Button
                    onClick={() => setShowAll(true)}
                    variant="outline"
                    size="lg"
                    className="border-2 border-zinc-400 bg-zinc-800 text-white hover:bg-zinc-700 hover:text-white transition-colors px-8 font-semibold"
                  >
                    {t.vimeoProfile.viewMore}
                  </Button>
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
