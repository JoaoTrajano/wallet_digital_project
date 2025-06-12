import { ReactNode } from 'react'

import { cn } from '@/lib/utils'

type HeaderProps = {
  children: ReactNode
  className?: string
}

export function Header({ children, className }: HeaderProps) {
  return (
    <div
      className={cn(
        'flex w-full max-w-full items-center justify-between gap-4 overflow-x-auto p-4',
        className
      )}
    >
      {children}
    </div>
  )
}
