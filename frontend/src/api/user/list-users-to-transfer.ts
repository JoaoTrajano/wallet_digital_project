import {
  useQuery,
  UseQueryOptions,
  UseQueryResult
} from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { api } from '@/lib/axios'

import { User } from './@types'

export const listUsersToTransfer = async () => {
  const { data } = await api.get<User[]>('/users/users-to-transfer')
  return data
}

export const useListUsersToTransfer = (
  options?: UseQueryOptions<User[], AxiosError>
): UseQueryResult<User[], AxiosError> =>
  useQuery<User[], AxiosError>({
    queryKey: ['users-to-transfer'],
    queryFn: () => listUsersToTransfer(),
    ...options
  })
