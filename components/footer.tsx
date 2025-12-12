"use client"

export function Footer() {
  return (
    <footer className="border-t border-zinc-200 py-6 relative overflow-hidden" style={{ backgroundColor: 'oklch(0.99 0.01 35)' }}>
      <div className="absolute inset-0 opacity-10">
        <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 1920 100">
          <defs>
            <linearGradient id="footerTerracotta1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="oklch(0.58 0.15 35)" stopOpacity="0.6" />
              <stop offset="100%" stopColor="oklch(0.65 0.18 30)" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          <path
            d="M0,50 Q480,40 960,50 T1920,50"
            fill="none"
            stroke="url(#footerTerracotta1)"
            strokeWidth="2"
            strokeLinecap="round"
            className="animate-draw"
          />
        </svg>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center py-4 sm:py-6">
          <p className="text-xs sm:text-sm" style={{ color: 'oklch(0.50 0.06 35)' }}>
            @ Alice Stamato - Todos os direitos reservados
          </p>
        </div>
      </div>
    </footer>
  )
}
