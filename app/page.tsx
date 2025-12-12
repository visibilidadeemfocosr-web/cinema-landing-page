import { lazy, Suspense } from "react"
import { Spinner } from "@/components/ui/spinner"
import { ScrollToTop } from "@/components/scroll-to-top"

const VimeoStyleProfile = lazy(() => 
  import("@/components/vimeo-style-profile").then(module => ({ default: module.VimeoStyleProfile }))
)

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-screen">
          <Spinner className="h-8 w-8" />
        </div>
      }>
        <VimeoStyleProfile />
        <ScrollToTop />
      </Suspense>
    </main>
  )
}
