import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { api } from '@/lib/axios'

import { AuthenticateParams, AuthenticateStoreResponseApi } from './@types'

export const authenticate = async (
  body: AuthenticateParams
): Promise<AuthenticateStoreResponseApi> => {
  const { data } = await api.post<AuthenticateStoreResponseApi>(
    '/authentication',
    body
  )
  return data
}

export const useAuthenticate = (
  options?: UseMutationOptions<
    AuthenticateStoreResponseApi,
    AxiosError,
    AuthenticateParams
  >
) =>
  useMutation<AuthenticateStoreResponseApi, AxiosError, AuthenticateParams>({
    mutationKey: ['authenticate'],
    mutationFn: async (body) => await authenticate(body),
    ...options
  })
