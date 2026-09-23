import { Skeleton } from "@/components/ui/skeleton"

export default function GameLoading() {
  return (
    <main className="flex min-h-svh items-center justify-center px-6 py-20">
      <div className="flex w-full max-w-sm flex-col items-center gap-2">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-64" />
      </div>
    </main>
  )
}
