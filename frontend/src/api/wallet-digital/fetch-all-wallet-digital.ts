import {
  useQuery,
  UseQueryOptions,
  UseQueryResult
} from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { api } from '@/lib/axios'

import { FetchOrdersOutputApi } from './@types'

export const fetchWalletBills = async () => {
  const { data } = await api.get<FetchOrdersOutputApi>('/bills')
  return data
}

export const useFetchWalletBills = (
  options?: UseQueryOptions<FetchOrdersOutputApi, AxiosError>
): UseQueryResult<FetchOrdersOutputApi, AxiosError> =>
  useQuery<FetchOrdersOutputApi, AxiosError>({
    queryKey: ['fetch-wallets-digital'],
    queryFn: () => fetchWalletBills(),
    ...options
  })
