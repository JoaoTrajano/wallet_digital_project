import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

export function Loading() {
  return (
    <main className="mt-4 flex min-h-[120px] flex-1 flex-col gap-4 p-4 pt-0">
      <Skeleton className={cn('h-16 w-full')} />
      <Skeleton className={cn('mt-8 h-60 w-full')} />
      <Skeleton className={cn('mt-12 h-[32rem] w-full')} />
    </main>
  )
}
