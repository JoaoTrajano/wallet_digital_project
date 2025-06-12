import {
  useQuery,
  UseQueryOptions,
  UseQueryResult
} from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { api } from '@/lib/axios'

import { User } from './@types'

export const getAccount = async () => {
  const { data } = await api.get<User>('/users/account')
  return data
}

export const useGetAccount = (
  options?: UseQueryOptions<User, AxiosError>
): UseQueryResult<User, AxiosError> =>
  useQuery<User, AxiosError>({
    queryKey: ['account'],
    queryFn: () => getAccount(),
    ...options
  })
