import { toast } from 'sonner'
import { create } from 'zustand'

import { authenticate } from '@/api/auth'
import type { User } from '@/api/user/@types'
import { removeValue, setValue } from '@/utils'

export type SignInParams = { email: string; password: string }

type AuthState = {
  user: User | null
  signIn: (data: SignInParams, onSuccess: () => void) => Promise<void>
  signOut: (onSignOut: () => void) => void
  setUser: (user: User) => void
}

export const useAuth = create<AuthState>((set) => {
  return {
    user: null,
    signIn: async (data: SignInParams, onSuccess) => {
      try {
        const result = await authenticate({
          email: data.email,
          password: data.password
        })

        setValue<string>('access_token@wallet_digital', result.access_token)
        set({ user: result.user })

        onSuccess()
        toast.success('Autenticação realizada com sucesso!')
      } catch (error) {
        toast.error('Nome de usuário ou senha estão incorretos!')
      }
    },
    signOut: async (onSignOut) => {
      try {
        removeValue('access_token@wallet_digital')
        removeValue('user@wallet_digital')
        set({ user: null })
        onSignOut()
      } catch (error) {
        toast.error('Erro ao fazer logout')
      }
    },
    setUser: (user: User) => {
      set({ user })
    }
  }
})
