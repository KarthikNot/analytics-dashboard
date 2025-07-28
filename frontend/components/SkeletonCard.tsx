import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function SkeletonCard() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle><Skeleton className="h-4 w-24" /></CardTitle>
      </CardHeader>
      <CardContent>
        <Skeleton className="h-[200px] w-full" />
      </CardContent>
    </Card>
  )
}
