import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { api } from '@/lib/axios'

import { WalletDigital } from '../wallet-digital/@types'

export type CreateNewTransactionParams = {
  description: string
  type: string
  value: string
  billId: string
  destinationId?: string
}

export const createNewTransaction = async (
  body: CreateNewTransactionParams
): Promise<WalletDigital> => {
  const { data } = await api.post<WalletDigital>('/transactions', body)
  return data
}

export const useCreateNewTransaction = (
  options?: UseMutationOptions<
    WalletDigital,
    AxiosError,
    CreateNewTransactionParams
  >
) =>
  useMutation<WalletDigital, AxiosError, CreateNewTransactionParams>({
    mutationKey: ['create-new-wallet-digital'],
    mutationFn: async (body) => await createNewTransaction(body),
    ...options
  })
