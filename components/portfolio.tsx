"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Play, ExternalLink } from "lucide-react"
import { useState } from "react"
import { useI18n } from "@/lib/i18n/context"
import { useFilms } from "@/lib/hooks/use-films"
import { FilmCardSkeleton } from "@/components/film-card-skeleton"
import Image from "next/image"

const projects = [
  {
    title: "Procreare",
    year: "2021",
    type: "Official Trailer",
    thumbnail: "/dark-forest-cinematic-scene.jpg",
    duration: "00:46",
    category: "Ficção",
    link: "https://vimeo.com/alicestamato/procreare",
  },
  {
    title: "The Inside",
    year: "2020",
    type: "Official Trailer",
    thumbnail: "/swimming-underwater-black-and-white.jpg",
    duration: "00:33",
    category: "Drama",
    link: "https://vimeo.com/alicestamato/the-inside",
  },
  {
    title: "Projeto Closet São Paulo",
    year: "2018",
    type: "Official Trailer",
    thumbnail: "/person-filming-close-up-cinematic.jpg",
    duration: "02:06",
    category: "Documentário",
    link: "https://vimeo.com/alicestamato/projeto-closet-sp",
  },
  {
    title: "Documentary Project",
    year: "2022",
    type: "Short Film",
    thumbnail: "/urban-street-scene-documentary.jpg",
    duration: "05:24",
    category: "Documentário",
    link: "https://vimeo.com/alicestamato/documentary-project",
  },
  {
    title: "Narrative Film",
    year: "2023",
    type: "Feature Film",
    thumbnail: "/dramatic-portrait-cinematic-lighting.jpg",
    duration: "01:45",
    category: "Ficção",
    link: "https://vimeo.com/alicestamato/narrative-film",
  },
  {
    title: "Commercial Project",
    year: "2023",
    type: "Campaign",
    thumbnail: "/modern-architecture-cinematic.jpg",
    duration: "00:58",
    category: "Comercial",
    link: "https://vimeo.com/alicestamato/commercial-project",
  },
]

export function Portfolio() {
  const { t } = useI18n()
  const { films, loading } = useFilms(true) // Apenas filmes publicados
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  // Fallback para dados estáticos se não houver filmes no banco
  const displayFilms = films.length > 0 
    ? films.map(film => ({
        id: film.id,
        title: film.title,
        year: film.year.toString(),
        type: 'Film',
        thumbnail: film.thumbnail || '/placeholder.svg',
        duration: film.duration,
        category: film.category,
        link: film.videoUrl,
      }))
    : projects

  return (
    <section
      id="portfolio"
      className="py-32 md:py-40 bg-gradient-to-b from-background via-background/80 to-background relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-20">
        <svg className="absolute top-0 left-0 w-full h-64" viewBox="0 0 1920 200" preserveAspectRatio="none">
          <defs>
            <linearGradient id="portfolioTerracotta1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="oklch(0.58 0.15 35)" stopOpacity="0.9" />
              <stop offset="100%" stopColor="oklch(0.65 0.18 30)" stopOpacity="0.5" />
            </linearGradient>
          </defs>
          <path
            d="M0,100 Q480,50 960,100 T1920,100"
            fill="none"
            stroke="url(#portfolioTerracotta1)"
            strokeWidth="4"
            strokeLinecap="round"
            className="animate-draw drop-shadow-sm"
          />
          <path
            d="M0,130 Q480,170 960,130 T1920,130"
            fill="none"
            stroke="oklch(0.62 0.16 38)"
            strokeWidth="3"
            strokeLinecap="round"
            className="animate-draw drop-shadow-sm"
            style={{ animationDelay: "0.3s" }}
          />
        </svg>
        <svg className="absolute bottom-0 right-0 w-full h-64" viewBox="0 0 1920 200" preserveAspectRatio="none">
          <path
            d="M0,100 Q480,140 960,100 T1920,100"
            fill="none"
            stroke="oklch(0.65 0.18 30)"
            strokeWidth="3.5"
            strokeLinecap="round"
            className="animate-draw drop-shadow-sm"
            style={{ animationDelay: "0.6s" }}
          />
        </svg>
      </div>
      {/* </CHANGE> */}

      <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/8 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-accent/6 rounded-full blur-3xl" />

      <div className="absolute top-40 right-20 w-20 h-20 border-2 border-accent/20 rotate-45" />
      <div className="absolute bottom-40 left-20 w-16 h-16 border-2 border-accent/15 rounded-full" />
      <svg className="absolute top-1/2 left-10 w-32 h-32 opacity-30" viewBox="0 0 100 100">
        <path
          d="M50,10 Q70,30 50,50 Q30,70 50,90"
          fill="none"
          stroke="oklch(0.58 0.15 35)"
          strokeWidth="3"
          strokeLinecap="round"
          className="animate-draw drop-shadow-sm"
        />
      </svg>
      {/* </CHANGE> */}

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 space-y-6">
            <Badge variant="outline" className="px-4 py-2 text-sm border-accent/30 text-accent">
              {t.portfolio.badge}
            </Badge>
            <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-balance">{t.portfolio.title}</h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {t.portfolio.description}
            </p>
          </div>
          {/* </CHANGE> */}

          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <FilmCardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayFilms.map((project, index) => (
              <Card
                key={(project as any).id || `project-${index}`}
                className="group overflow-hidden cursor-pointer border-2 hover:border-accent/50 hover:shadow-2xl transition-all duration-500 bg-card/50 backdrop-blur-sm animate-stagger"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => project.link && window.open(project.link, '_blank', 'noopener,noreferrer')}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    project.link && window.open(project.link, '_blank', 'noopener,noreferrer')
                  }
                }}
                aria-label={`Ver ${project.title} no Vimeo`}
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                  <Image
                    src={project.thumbnail || "/placeholder.svg"}
                    alt={`Thumbnail do projeto: ${project.title}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />

                  {/* Play Button Overlay */}
                  <div
                    className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${hoveredIndex === index ? "opacity-100" : "opacity-0"}`}
                  >
                    <div className="bg-accent text-accent-foreground rounded-full p-5 transform scale-90 group-hover:scale-100 transition-transform shadow-2xl">
                      <Play className="h-8 w-8 fill-current" />
                    </div>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-background/90 backdrop-blur-sm text-foreground border-0 shadow-lg">
                      {(() => {
                        const categoryMap: Record<string, keyof typeof t.portfolio.categories> = {
                          'Ficção': 'fiction',
                          'Drama': 'drama',
                          'Documentário': 'documentary',
                          'Comercial': 'commercial',
                        }
                        const categoryKey = categoryMap[project.category] || 'fiction'
                        return t.portfolio.categories[categoryKey]
                      })()}
                    </Badge>
                  </div>

                  {/* Duration Badge */}
                  <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm text-xs font-mono px-3 py-1.5 rounded-full shadow-lg">
                    {project.duration}
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-display text-xl font-bold group-hover:text-accent transition-colors line-clamp-1">
                      {project.title}
                    </h3>
                    <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-accent transition-colors shrink-0 mt-1" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {project.type} • {project.year}
                  </p>
                </div>
              </Card>
            ))}
            </div>
          )}
          {/* </CHANGE> */}

          <div className="text-center mt-16">
            <Card className="inline-block p-8 border-2 border-accent/20 bg-gradient-to-br from-accent/5 to-primary/5">
              <p className="text-muted-foreground mb-4 text-lg">
                <span className="text-3xl font-bold text-accent">{displayFilms.length}</span> {t.portfolio.videosAvailable}
              </p>
              <a
                href="https://vimeo.com/alicestamato"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-accent hover:text-accent/80 font-semibold text-lg group"
              >
                {t.portfolio.viewFullPortfolio}
                <ExternalLink className="h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
            </Card>
          </div>
          {/* </CHANGE> */}
        </div>
      </div>
    </section>
  )
}
