import axios from 'axios'

import { env } from '@/env'
import { getValue } from '@/utils'

export const api = axios.create({
  baseURL: env.VITE_API_URL,
  withCredentials: true
})

if (env.VITE_ENABLED_API_DELAY) {
  api.interceptors.request.use(async (config) => {
    await new Promise((resolve) => setTimeout(resolve, 2000))

    return config
  })
}

api.interceptors.request.use(
  (config) => {
    const accessToken = getValue<string>('access_token@wallet_digital')
    config.headers.Authorization = `Bearer ${accessToken}`

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error)
  }
)
