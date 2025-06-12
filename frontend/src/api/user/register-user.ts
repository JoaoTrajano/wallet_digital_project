import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { api } from '@/lib/axios'

import { User } from './@types'

export type RegisterUserUserParams = {
  name: string
  password: string
  email: string
}

export const registerUserUser = async (
  body: RegisterUserUserParams
): Promise<User> => {
  const { data } = await api.post<User>('/users', body)
  return data
}

export const useRegisterUser = (
  options?: UseMutationOptions<User, AxiosError, RegisterUserUserParams>
) =>
  useMutation<User, AxiosError, RegisterUserUserParams>({
    mutationKey: ['register-user'],
    mutationFn: async (body) => await registerUserUser(body),
    ...options
  })
