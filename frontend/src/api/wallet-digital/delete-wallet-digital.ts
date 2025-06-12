import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { api } from '@/lib/axios'

import { WalletDigital } from './@types'

export type DeleteWalletDigitalParams = {
  billId: string
}

export const deleteWalletDigital = async (body: DeleteWalletDigitalParams) => {
  const { data } = await api.delete<WalletDigital>('/bills', { data: body })
  return data
}

export const useDeleteWalletDigital = (
  options?: UseMutationOptions<
    WalletDigital,
    AxiosError,
    DeleteWalletDigitalParams
  >
) =>
  useMutation<WalletDigital, AxiosError, DeleteWalletDigitalParams>({
    mutationKey: ['delete-wallet-digital'],
    mutationFn: async (body) => await deleteWalletDigital(body),
    ...options
  })
