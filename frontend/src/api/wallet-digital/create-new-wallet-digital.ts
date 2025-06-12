import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { api } from '@/lib/axios'

import { WalletDigital } from './@types'

export type CreateNewWalletDigitalParams = {
  name: string
  amount: string
}

export const createNewWalletDigital = async (
  body: CreateNewWalletDigitalParams
): Promise<WalletDigital> => {
  const { data } = await api.post<WalletDigital>('/bills', body)
  return data
}

export const useCreateNewWalletDigital = (
  options?: UseMutationOptions<
    WalletDigital,
    AxiosError,
    CreateNewWalletDigitalParams
  >
) =>
  useMutation<WalletDigital, AxiosError, CreateNewWalletDigitalParams>({
    mutationKey: ['create-new-wallet-digital'],
    mutationFn: async (body) => await createNewWalletDigital(body),
    ...options
  })
