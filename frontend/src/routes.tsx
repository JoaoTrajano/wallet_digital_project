import { ReactNode } from 'react'
import { useEffect } from 'react'
import { createBrowserRouter, useNavigate } from 'react-router-dom'

import { useGetAccount } from './api/user/get-account'
import { useAuth } from './hooks/use-auth'
import { AppLayout } from './pages/_layouts/app'
import { AuthLayout } from './pages/_layouts/auth'
import { NotFound } from './pages/404'
import { Home } from './pages/app/home'
import { SignIn } from './pages/auth/sign-in'
import { SignUp } from './pages/auth/sign-up'
import { Loading } from './pages/loading'

type AuthenticatedRouteProps = {
  element: ReactNode
}

function AuthenticatedRoute({ element }: AuthenticatedRouteProps) {
  const { data, isLoading, error } = useGetAccount()
  const { setUser, signOut } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (data && !error) {
      setUser(data)
      return
    }
    if (!isLoading && (error || !data)) {
      signOut(() => navigate('/'))
    }
  }, [data, error, isLoading, setUser, signOut, navigate])

  if (isLoading) return <Loading />

  if (!data || error) return null

  return <>{element}</>
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      { index: true, element: <SignIn /> },
      { path: '/sign-up', element: <SignUp /> }
    ]
  },
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: '/home',
        element: <AuthenticatedRoute element={<Home />} />
      }
    ]
  }
])
