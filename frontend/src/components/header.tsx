import { Home, Wallet } from 'lucide-react'
import { useMemo } from 'react'

import { useAuth } from '@/hooks/use-auth'
import { cn } from '@/lib/utils'
import { formatMoneyBR } from '@/utils'

import { AccountMenu } from './account-menu'
import { NavLink } from './nav-link'
import { ThemeToggle } from './theme/theme-toggle'
import { Separator } from './ui/separator'
import { Skeleton } from './ui/skeleton'

export function Header() {
  const { user } = useAuth()

  const balance: string = useMemo(() => {
    if (user) return formatMoneyBR(user.balance)
    return formatMoneyBR(0)
  }, [user])

  return (
    <div className="border-b">
      <div className="flex h-16 items-center gap-6 px-6">
        <Wallet className="h-6 w-6" />
        <Separator orientation="vertical" className="h-6" />
        <nav className="flex items-center space-x-4 lg:space-x-6">
          <NavLink to="/">
            <Home className="h-4 w-4" />
            Início
          </NavLink>
        </nav>
        <div className="ml-auto flex items-center gap-4">
          {!user ? (
            <Skeleton className={cn('h-10 w-40')} />
          ) : (
            <div className="flex min-w-40 items-center rounded-md bg-muted px-3 py-1 text-sm font-medium">
              <span className="mr-2 text-muted-foreground">Saldo atual:</span>
              <span className="font-semibold text-primary-foreground dark:text-primary">
                {balance}
              </span>
            </div>
          )}

          <ThemeToggle />
          <AccountMenu />
        </div>
      </div>
    </div>
  )
}
