'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { type ThemeProviderProps } from 'next-themes/dist/types'
import { SessionProvider } from 'next-auth/react'
import { Provider } from 'react-redux'
import { setupStore } from '@/redux-store/store'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      <SessionProvider>
        <Provider store={setupStore()}>{children}</Provider>
      </SessionProvider>
    </NextThemesProvider>
  )
}
