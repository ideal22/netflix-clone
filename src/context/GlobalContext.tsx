'use client'
import { ChildProps } from '@/types/children.interface'
import { AccountProps, ContextType } from '@/types/context.interface'
import { createContext, useContext, useState } from 'react'

const Context = createContext<ContextType | null>(null)

const GlobalContext = ({ children }: ChildProps) => {
  const [account, setAccount] = useState<AccountProps | null>(null)
  return (
    <Context.Provider value={{ account, setAccount }}>
      {children}
    </Context.Provider>
  )
}
export default GlobalContext

export const useGlobalContext = () => {
  const context = useContext(Context)

  if (context === null) {
    throw new Error('useGlobalContext must be use within a GlobalContext')
  }

  return context
}
