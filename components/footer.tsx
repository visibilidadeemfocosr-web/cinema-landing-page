"use client"

export function Footer() {
  return (
    <footer className="py-6 relative overflow-hidden" style={{ backgroundColor: 'oklch(0.99 0.01 35)' }}>
      <div className="absolute inset-0 opacity-10">
        <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 1920 8" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M 0 4 L 40 2 L 80 6 L 120 1 L 160 5 L 200 3 L 240 7 L 280 2 L 320 6 L 360 4 L 400 5 L 440 3 L 480 7 L 520 2 L 560 6 L 600 4 L 640 5 L 680 3 L 720 7 L 760 2 L 800 6 L 840 4 L 880 5 L 920 3 L 960 7 L 1000 2 L 1040 6 L 1080 4 L 1120 5 L 1160 3 L 1200 7 L 1240 2 L 1280 6 L 1320 4 L 1360 5 L 1400 3 L 1440 7 L 1480 2 L 1520 6 L 1560 4 L 1600 5 L 1640 3 L 1680 7 L 1720 2 L 1760 6 L 1800 4 L 1840 5 L 1880 3 L 1920 5"
            stroke="oklch(0.58 0.15 35)"
            strokeWidth="0.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
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
