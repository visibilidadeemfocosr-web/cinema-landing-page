import Image from "next/image"
import { MapPin, Mail, Sparkles, Film, Award } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useI18n } from "@/lib/i18n/context"

export function About() {
  const { t } = useI18n()
  
  return (
    <section id="about" className="py-32 md:py-40 relative overflow-hidden">
      <div className="absolute inset-0 opacity-25">
        <svg className="absolute top-20 right-10 w-64 h-64" viewBox="0 0 200 200">
          <defs>
            <linearGradient id="aboutTerracotta1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="oklch(0.58 0.15 35)" stopOpacity="0.9" />
              <stop offset="100%" stopColor="oklch(0.65 0.18 30)" stopOpacity="0.5" />
            </linearGradient>
          </defs>
          <path
            d="M10,100 Q50,50 100,100 T190,100"
            fill="none"
            stroke="url(#aboutTerracotta1)"
            strokeWidth="3"
            strokeLinecap="round"
            className="animate-draw drop-shadow-sm"
          />
          <circle cx="100" cy="100" r="60" fill="none" stroke="oklch(0.65 0.18 30)" strokeWidth="2.5" opacity="0.7" className="drop-shadow-sm" />
        </svg>
        <svg className="absolute bottom-40 left-10 w-48 h-48" viewBox="0 0 200 200">
          <path
            d="M20,20 L180,20 L180,180 L20,180 Z"
            fill="none"
            stroke="oklch(0.52 0.12 45)"
            strokeWidth="3"
            strokeDasharray="10,5"
            strokeLinecap="round"
            className="animate-draw drop-shadow-sm"
            style={{ animationDelay: "0.5s" }}
          />
        </svg>
      </div>

      <div className="absolute top-20 right-0 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-0 w-96 h-96 bg-accent/8 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-[350px,1fr] gap-12 lg:gap-16 items-start">
            <Card className="p-8 space-y-6 border-2 shadow-xl backdrop-blur-sm bg-card/80">
              <div className="relative aspect-square rounded-2xl overflow-hidden ring-4 ring-accent/10">
                <Image 
                  src="/images/alicestamato.jpeg" 
                  alt="Alice Stamato - Diretora de Cinema e Roteirista" 
                  fill
                  className="object-cover"
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, 350px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
              </div>

              <div className="space-y-5">
                <div>
                  <h3 className="font-display text-3xl font-bold mb-2 text-balance">{t.header.title}</h3>
                  <Badge variant="secondary" className="text-xs font-medium">
                    {t.about.pronouns}
                  </Badge>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                    <MapPin className="h-4 w-4 shrink-0 text-accent" />
                    <span>{t.about.location}</span>
                  </div>

                  <a
                    href="mailto:alicestamato@gmail.com"
                    className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-accent/10 hover:text-accent transition-all group"
                  >
                    <Mail className="h-4 w-4 shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="truncate">alicestamato@gmail.com</span>
                  </a>
                </div>

                <div className="flex gap-3 pt-4 border-t border-border">
                  <a
                    href="https://www.instagram.com/alicestamato"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center p-3 rounded-lg bg-muted/50 text-muted-foreground hover:bg-accent/10 hover:text-accent transition-all hover:scale-105"
                    aria-label="Instagram"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-4.358-.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.69-.073 4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.instagram.com/lombadafilmes"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center p-3 rounded-lg bg-muted/50 text-muted-foreground hover:bg-accent/10 hover:text-accent transition-all hover:scale-105"
                    aria-label="Lombada Filmes"
                  >
                    <Film className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </Card>

            {/* Bio */}
            <div className="space-y-12 leading-relaxed mt-0 lg:mt-0">
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <div className="h-12 w-1 bg-accent rounded-full" />
                  <h2 className="font-display text-4xl md:text-5xl font-bold">{t.about.title}</h2>
                </div>

                <div className="prose prose-lg max-w-none space-y-6 text-foreground/80 leading-relaxed">
                  <p className="text-lg">
                    {t.about.bio1}{" "}
                    <span className="text-accent font-semibold">{t.about.bio2}</span>
                    {t.about.bio3}
                  </p>
                  <p className="text-lg">
                    {t.about.bio4}
                  </p>
                  <p className="text-lg">
                    {t.about.bio5}
                  </p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <Card className="p-6 border-2 hover:border-accent/50 transition-all hover:shadow-lg group">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-accent/10 text-accent mb-4 group-hover:scale-110 transition-transform">
                    <Film className="h-6 w-6" />
                  </div>
                  <h3 className="font-display text-xl font-bold mb-2">{t.about.specialties.title}</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                      {t.about.specialties.direction}
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                      {t.about.specialties.script}
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                      {t.about.specialties.documentary}
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                      {t.about.specialties.production}
                    </li>
                  </ul>
                </Card>

                <Card className="p-6 border-2 hover:border-accent/50 transition-all hover:shadow-lg group">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-accent/10 text-accent mb-4 group-hover:scale-110 transition-transform">
                    <Award className="h-6 w-6" />
                  </div>
                  <h3 className="font-display text-xl font-bold mb-2">{t.about.recognition.title}</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                      {t.about.recognition.awards}
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                      {t.about.recognition.festivals}
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                      {t.about.recognition.critics}
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                      {t.about.recognition.selections}
                    </li>
                  </ul>
                </Card>
              </div>

              <Card className="p-8 bg-gradient-to-br from-accent/5 to-primary/5 border-2 border-accent/20">
                <div className="flex items-start gap-4">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-accent/20 text-accent shrink-0">
                    <Sparkles className="h-7 w-7" />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-bold mb-3">{t.about.lombada.title}</h3>
                    <p className="text-foreground/70 leading-relaxed">
                      {t.about.lombada.description}
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
