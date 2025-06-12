import { ChevronDown, LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import { useAuth } from '@/hooks/use-auth'

import { StoreProfileDialog } from './store-profile-dialog'
import { Button } from './ui/button'
import { Dialog } from './ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from './ui/dropdown-menu'

export function AccountMenu() {
  const navigate = useNavigate()
  const { signOut } = useAuth()

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="flex select-none items-center gap-2"
          >
            <ChevronDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel className="flex flex-col"></DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-rose-500 dark:text-rose-400"
            asChild
          >
            <button
              className="w-full"
              onClick={() => signOut(() => navigate('/'))}
            >
              <LogOut className="mr-2 h-4 w-2" />
              <span>Sair</span>
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <StoreProfileDialog />
    </Dialog>
  )
}
