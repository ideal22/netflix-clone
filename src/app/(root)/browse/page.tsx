'use client'

import Login from '@/components/shared/Login'
import ManageAccount from '@/components/shared/ManageAccount'
import { useGlobalContext } from '@/context/GlobalContext'
import { useSession } from 'next-auth/react'

const BrowsePage = () => {
  const { account } = useGlobalContext()
  const { data: session } = useSession()

  if (session === null) return <Login />
  if (account === null) return <ManageAccount />

  return <div>BrowsePage</div>
}
export default BrowsePage
