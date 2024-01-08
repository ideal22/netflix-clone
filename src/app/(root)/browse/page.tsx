'use client'

import Login from '@/components/shared/Login'
import { useGlobalContext } from '@/context/GlobalContext'
import { useSession } from 'next-auth/react'

const BrowsePage = () => {
  const { account } = useGlobalContext()
  const { data: session } = useSession()

  console.log(session)

  if (session === null) return <Login />
  return <div>BrowsePage</div>
}
export default BrowsePage
