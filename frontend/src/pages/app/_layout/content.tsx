import { ReactNode } from 'react'

import { cn } from '@/lib/utils'

type ContentProps = {
  children: ReactNode
  className?: string
}

export function Content({ children, className }: ContentProps) {
  return (
    <div
      className={cn('w-full max-w-full space-y-4 overflow-x-auto', className)}
    >
      {children}
    </div>
  )
}
