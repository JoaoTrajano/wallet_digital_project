import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { api } from '@/lib/axios'

import { WalletDigital } from '../wallet-digital/@types'

export type RevertTransactionParams = {
  transactionId: string
}

export const revertTransaction = async (
  body: RevertTransactionParams
): Promise<WalletDigital> => {
  const { data } = await api.post<WalletDigital>('/transactions/revert', body)
  return data
}

export const useRevertTransaction = (
  options?: UseMutationOptions<
    WalletDigital,
    AxiosError,
    RevertTransactionParams
  >
) =>
  useMutation<WalletDigital, AxiosError, RevertTransactionParams>({
    mutationKey: ['revert-transaction'],
    mutationFn: async (body) => await revertTransaction(body),
    ...options
  })
