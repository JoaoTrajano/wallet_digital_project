import { User } from '../../user/@types'

export type AuthenticateParams = {
  email: string
  password: string
}

export type AuthenticateStoreResponseApi = {
  user: User
  access_token: string
}
