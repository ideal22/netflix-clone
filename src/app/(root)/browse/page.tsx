'use client'

import Login from '@/components/shared/Login'
import { useGlobalContext } from '@/context/GlobalContext'

const BrowsePage = () => {
  const { account } = useGlobalContext()

  if (account === null) return <Login />
  return <div>BrowsePage</div>
}
export default BrowsePage
