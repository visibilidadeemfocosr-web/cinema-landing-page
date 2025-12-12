"use client"

import { Button } from "@/components/ui/button"
import { Play, Sparkles } from "lucide-react"
import { useI18n } from "@/lib/i18n/context"

export function Hero() {
  const { t } = useI18n()
  
  const scrollToPortfolio = () => {
    const element = document.getElementById("portfolio")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden grain">
      <div className="absolute inset-0 z-0">
        <svg
          className="absolute top-0 left-0 w-full h-full opacity-80"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1920 1080"
        >
          <defs>
            {/* Gradientes terracotta para Hero */}
            <linearGradient id="heroTerracotta1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="oklch(0.58 0.15 35)" stopOpacity="0.9" />
              <stop offset="100%" stopColor="oklch(0.65 0.18 30)" stopOpacity="0.5" />
            </linearGradient>
            <linearGradient id="heroTerracotta2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="oklch(0.65 0.18 30)" stopOpacity="0.8" />
              <stop offset="100%" stopColor="oklch(0.52 0.12 45)" stopOpacity="0.4" />
            </linearGradient>
          </defs>
          {/* ========== LINHAS ARTÍSTICAS ASSIMÉTRICAS ========== */}
          
          {/* Linha orgânica superior - trajetória livre e assimétrica */}
          <path
            d="M50,160 Q200,140 400,170 Q600,200 800,165 Q1000,150 1200,175 Q1350,190 1500,170"
            fill="none"
            stroke="oklch(0.58 0.15 35)"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.7"
          />

          {/* Linha orgânica vertical esquerda - não reta */}
          <path
            d="M180,280 Q200,400 185,500 Q195,600 180,700 Q200,750 175,800"
            fill="none"
            stroke="oklch(0.62 0.16 38)"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.8"
          />

          {/* ========== LINHAS ORGÂNICAS SINUOSAS ========== */}
          
          {/* Linha orgânica sinuosa superior - trajetória livre */}
          <path
            d="M180,190 Q380,140 580,200 Q780,260 680,300 Q480,250 280,220 Q380,200 580,240 Q780,280 880,250"
            fill="none"
            stroke="oklch(0.58 0.15 35)"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.7"
          />

          {/* Linha orgânica ondulada meio - assimétrica */}
          <path
            d="M280,480 Q480,430 680,490 Q880,550 780,600 Q580,560 380,520 Q480,500 680,540 Q880,580 980,550"
            fill="none"
            stroke="oklch(0.65 0.18 30)"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.7"
          />

          {/* Linha orgânica sinuosa inferior - múltiplas curvas */}
          <path
            d="M150,880 Q380,820 620,870 Q860,920 720,970 Q480,930 240,900 Q380,890 620,940 Q860,990 1020,950"
            fill="none"
            stroke="oklch(0.58 0.15 35)"
            strokeWidth="3.8"
            strokeLinecap="round"
            opacity="0.9"
          />

          {/* ========== ESPIRAIS ORGÂNICAS ========== */}
          
          {/* Espiral orgânica esquerda - assimétrica */}
          <path
            d="M280,290 Q260,270 240,290 Q230,310 250,330 Q270,350 290,370 Q280,390 260,370 Q240,350 250,330"
            fill="none"
            stroke="oklch(0.58 0.15 35)"
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity="0.65"
            className="animate-spiral"
          />

          {/* Espiral orgânica direita - trajetória livre */}
          <path
            d="M1520,390 Q1500,370 1480,390 Q1470,410 1490,430 Q1510,450 1530,470 Q1520,490 1500,470 Q1480,450 1490,430"
            fill="none"
            stroke="oklch(0.65 0.18 30)"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.7"
            className="animate-spiral"
          />

          {/* Espiral orgânica meio - não quadrada */}
          <path
            d="M940,380 Q960,360 980,380 Q990,400 970,420 Q950,440 930,420 Q920,400 940,380"
            fill="none"
            stroke="oklch(0.62 0.16 38)"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.8"
            className="animate-spiral"
          />

          {/* ========== CURVAS ARTÍSTICAS ASSIMÉTRICAS ========== */}
          
          {/* Linha orgânica horizontal meio - trajetória livre */}
          <path
            d="M120,520 Q350,480 580,540 Q820,600 1050,530 Q1280,480 1480,550"
            fill="none"
            stroke="oklch(0.58 0.15 35)"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.7"
          />

          {/* Curva orgânica superior direita - assimétrica */}
          <path
            d="M1150,220 Q1320,280 1520,240 Q1480,200 1380,190"
            fill="none"
            stroke="oklch(0.62 0.16 38)"
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity="0.65"
          />

          {/* Curva orgânica meio esquerda - trajetória livre */}
          <path
            d="M280,380 Q420,320 580,390 Q720,460 680,500 Q540,480 400,420"
            fill="none"
            stroke="oklch(0.65 0.18 30)"
            strokeWidth="3.2"
            strokeLinecap="round"
            opacity="0.8"
          />

          {/* Linha orgânica diagonal - não reta */}
          <path
            d="M280,230 Q380,260 480,290 Q580,320 520,360 Q420,340 320,310"
            fill="none"
            stroke="oklch(0.62 0.16 38)"
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity="0.65"
          />

          {/* Linha orgânica longa inferior - múltiplas curvas */}
          <path
            d="M150,880 Q380,720 620,760 Q860,800 1080,780 Q1300,760 1520,800"
            fill="none"
            stroke="oklch(0.58 0.15 35)"
            strokeWidth="3.5"
            strokeLinecap="round"
            opacity="0.75"
          />

          {/* Linha orgânica vertical esquerda - não reta */}
          <path
            d="M220,330 Q240,450 225,550 Q245,650 230,750 Q250,800 215,850"
            fill="none"
            stroke="oklch(0.58 0.15 35)"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.8"
          />

          {/* Curva orgânica em S assimétrica superior */}
          <path
            d="M480,130 Q680,100 880,140 Q1080,180 980,220 Q780,200 580,160"
            fill="none"
            stroke="oklch(0.65 0.18 30)"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.7"
          />

          {/* Curva orgânica ascendente meio direita */}
          <path
            d="M1280,420 Q1400,360 1520,400 Q1580,460 1650,420 Q1600,380 1500,360"
            fill="none"
            stroke="oklch(0.62 0.16 38)"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.8"
          />

          {/* Linha orgânica inferior esquerda - trajetória livre */}
          <path
            d="M80,720 Q220,780 380,760 Q540,740 680,770 Q820,800 920,780"
            fill="none"
            stroke="oklch(0.58 0.15 35)"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.7"
          />

          {/* ========== LINHAS ORGÂNICAS ADICIONAIS ========== */}
          
          {/* Linha orgânica em S assimétrica */}
          <path
            d="M130,140 Q220,110 320,150 Q420,190 380,230 Q280,210 180,170"
            fill="none"
            stroke="oklch(0.62 0.16 38)"
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity="0.65"
          />

          {/* Linha orgânica longa horizontal - múltiplas variações */}
          <path
            d="M50,280 Q250,260 450,290 Q650,320 580,360 Q380,340 180,310 Q280,300 480,330 Q680,360 580,400 Q380,380 180,350 Q280,340 480,370"
            fill="none"
            stroke="oklch(0.58 0.15 35)"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.7"
          />

          {/* Linha orgânica ascendente - curva pronunciada */}
          <path
            d="M120,580 Q280,520 440,580 Q600,640 520,700 Q360,660 200,620"
            fill="none"
            stroke="oklch(0.65 0.18 30)"
            strokeWidth="3.2"
            strokeLinecap="round"
            opacity="0.8"
          />

          {/* Linha orgânica em arco assimétrico */}
          <path
            d="M1380,110 Q1500,85 1620,115 Q1580,150 1480,140 Q1380,130 1420,120"
            fill="none"
            stroke="oklch(0.58 0.15 35)"
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity="0.65"
          />

          {/* Linha orgânica descendente - trajetória livre */}
          <path
            d="M1520,330 Q1620,380 1680,430 Q1620,480 1550,530 Q1480,480 1520,430"
            fill="none"
            stroke="oklch(0.62 0.16 38)"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.7"
          />

          {/* Linha orgânica vertical - não reta */}
          <path
            d="M280,380 Q260,480 285,580 Q265,680 290,780 Q270,850 295,920"
            fill="none"
            stroke="oklch(0.58 0.15 35)"
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity="0.65"
          />

          {/* Linha orgânica em onda assimétrica inferior */}
          <path
            d="M380,920 Q580,870 780,920 Q980,970 880,1020 Q680,980 480,930 Q580,900 780,950 Q980,1000 880,1050 Q680,1010 480,960"
            fill="none"
            stroke="oklch(0.65 0.18 30)"
            strokeWidth="6.5"
            strokeLinecap="round"
            opacity="0.95"
          />

          {/* Linha orgânica diagonal - trajetória livre */}
          <path
            d="M780,180 Q980,280 1180,320 Q1380,380 1280,440 Q1080,400 880,360"
            fill="none"
            stroke="oklch(0.62 0.16 38)"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.8"
          />

          {/* Linha orgânica em loop assimétrico */}
          <path
            d="M980,580 Q920,640 980,700 Q1040,760 1120,700 Q1160,640 1100,600 Q1040,560 980,580"
            fill="none"
            stroke="oklch(0.58 0.15 35)"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.7"
          />


          {/* ========== LINHAS QUEBRADAS ORGÂNICAS ========== */}
          
          {/* Linha quebrada orgânica superior - assimétrica */}
          <path
            d="M580,210 L630,190 L680,220 L730,195 L780,225 L830,200"
            fill="none"
            stroke="oklch(0.58 0.15 35)"
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity="0.65"
          />

          {/* Linha quebrada orgânica meio - trajetória livre */}
          <path
            d="M980,550 L1030,530 L1080,560 L1130,535 L1180,565 L1230,540"
            fill="none"
            stroke="oklch(0.65 0.18 30)"
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity="0.65"
          />

          {/* ========== CÍRCULOS ANIMADOS ========== */}
          
          {/* Círculo pequeno superior esquerda */}
          <circle
            cx="400"
            cy="150"
            r="18"
            stroke="oklch(0.58 0.15 35)"
            strokeWidth="2.5"
            fill="none"
            opacity="0.7"
            className="animate-circle-pulse"
          />

          {/* Círculo médio meio direita */}
          <circle
            cx="1600"
            cy="450"
            r="22"
            stroke="oklch(0.65 0.18 30)"
            strokeWidth="2.5"
            fill="none"
            opacity="0.7"
            className="animate-circle-pulse"
          />

          {/* Círculo pequeno inferior esquerda */}
          <circle
            cx="300"
            cy="850"
            r="15"
            stroke="oklch(0.62 0.16 38)"
            strokeWidth="2.5"
            fill="none"
            opacity="0.7"
            className="animate-circle-pulse animate-circle-rotate"
          />

          {/* Círculo médio centro */}
          <circle
            cx="960"
            cy="650"
            r="20"
            stroke="oklch(0.58 0.15 35)"
            strokeWidth="2.5"
            fill="none"
            opacity="0.65"
            className="animate-circle-pulse"
          />

          {/* Círculo grande direita inferior */}
          <circle
            cx="1700"
            cy="800"
            r="28"
            stroke="oklch(0.52 0.12 45)"
            strokeWidth="2.5"
            fill="none"
            opacity="0.65"
            className="animate-circle-pulse animate-circle-rotate"
          />
        </svg>
        {/* </CHANGE> */}

        {/* Terracotta gradient orbs */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse-slow" />
        <div
          className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-accent/15 rounded-full blur-3xl animate-pulse-slow"
          style={{ animationDelay: "2s" }}
        />

        {/* Geometric Shapes with terracotta tones */}
        <div className="absolute top-20 right-1/4 w-32 h-32 border-2 border-accent/30 rotate-45 animate-spin-slow" />
        <div className="absolute bottom-32 left-1/3 w-24 h-24 border-2 border-accent/40 rounded-full animate-float" />
        <div
          className="absolute top-1/3 left-20 w-16 h-16 bg-accent/10 rotate-12 animate-float"
          style={{ animationDelay: "1s" }}
        />

        {/* Diagonal lines pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%">
            <pattern id="diagonals" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="40" y2="40" stroke="oklch(0.58 0.15 35)" strokeWidth="1" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#diagonals)" />
          </svg>
        </div>
      </div>

      {/* Dark overlay with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/85 to-background z-[1]" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-5xl mx-auto space-y-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 backdrop-blur-sm animate-fade-in">
            <Sparkles className="h-4 w-4 text-accent" />
            <span className="text-sm font-medium text-accent">{t.hero.badge}</span>
          </div>

          <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-bold leading-[0.95] text-balance tracking-tight">
            {t.hero.title}
          </h1>

          <p className="text-xl md:text-2xl lg:text-3xl text-foreground/70 font-light max-w-3xl mx-auto leading-relaxed">
            {t.hero.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold text-base px-8 py-6 rounded-xl shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30 transition-all hover:scale-105"
              onClick={scrollToPortfolio}
            >
              <Play className="h-5 w-5 mr-2 fill-current" />
              {t.hero.ctaPortfolio}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-foreground/10 hover:border-accent hover:bg-accent/5 font-semibold text-base px-8 py-6 rounded-xl backdrop-blur-sm transition-all hover:scale-105 bg-transparent"
              onClick={() => {
                const element = document.getElementById("contact")
                element?.scrollIntoView({ behavior: "smooth" })
              }}
            >
              {t.hero.ctaContact}
            </Button>
          </div>

          {/* Scroll Indicator - enhanced */}
          <div className="flex flex-col items-center gap-2 animate-bounce pt-16">
            <span className="text-xs text-muted-foreground uppercase tracking-wider">{t.hero.scroll}</span>
            <div className="w-6 h-10 rounded-full border-2 border-foreground/20 flex items-start justify-center p-2">
              <div className="w-1 h-2 bg-accent rounded-full animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
