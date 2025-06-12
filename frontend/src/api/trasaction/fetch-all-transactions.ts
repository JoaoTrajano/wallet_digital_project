import {
  useQuery,
  UseQueryOptions,
  UseQueryResult
} from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { api } from '@/lib/axios'

import { FetchAllTransactionsResponseOutputApi } from './@types'

export interface FetchAllTransactionsParams {
  page?: number
  perPage?: number
}

export const fetchAllTransactions = async (
  params?: FetchAllTransactionsParams
) => {
  const { data } = await api.get<FetchAllTransactionsResponseOutputApi>(
    '/transactions',
    {
      params: {
        page: params?.page,
        perPage: params?.perPage
      }
    }
  )
  return data
}

export const useFetchAllTransactions = (
  params?: FetchAllTransactionsParams,
  options?: UseQueryOptions<FetchAllTransactionsResponseOutputApi, AxiosError>
): UseQueryResult<FetchAllTransactionsResponseOutputApi, AxiosError> =>
  useQuery<FetchAllTransactionsResponseOutputApi, AxiosError>({
    queryKey: ['fetch-all-transactions', params],
    queryFn: () => fetchAllTransactions(params),
    ...options
  })
