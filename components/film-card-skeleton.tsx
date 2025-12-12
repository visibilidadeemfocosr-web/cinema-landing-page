import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function FilmCardSkeleton() {
  return (
    <Card className="overflow-hidden border-2 bg-card/50 backdrop-blur-sm">
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <Skeleton className="w-full h-full" />
      </div>
      <div className="p-6 space-y-3">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </Card>
  )
}

