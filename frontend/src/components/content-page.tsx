import type { ReactNode } from 'react'
import { Helmet } from 'react-helmet-async'

export interface ContentProps {
  children: ReactNode
  titlePage: string
}

export function ContentPage({ titlePage, children }: ContentProps) {
  return (
    <>
      <Helmet title={titlePage} />
      {children}
    </>
  )
}
