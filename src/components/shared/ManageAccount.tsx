'use client'
import { LockKeyhole, Trash2 } from 'lucide-react'
import Image from 'next/image'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { Dialog, DialogContent } from '../ui/dialog'
import CreateAccountForm from '../form/CreateAccountForm'
import LoginAccountForm from '../form/LoginAccountForm'
import { useSession } from 'next-auth/react'
import { accountApi } from '@/redux-store/reducers/AccountReducer'

const ManageAccount = () => {
  const [isDelete, setIsDelete] = useState<boolean>(false)
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const [state, setState] = useState<'login' | 'create'>('create')
  const [currentAccountId, setCurrentAccountId] = useState<string>('')

  const { data: session }: any = useSession()
  const { data: result } = accountApi.useFetchAllAccountsQuery(
    session?.user?.uid,
  )
  const [deleteAccount] = accountApi.useDeleteAccountMutation()

  const createAccount = () => {
    setOpenDialog(true)
    setState('create')
  }

  const loginIntoAccount = (id: string) => {
    if (isDelete) return
    setOpenDialog(true)
    setState('login')
    setCurrentAccountId(id)
  }

  const onDelete = async (id: string) => {
    try {
      const isConfirmed = confirm('Are you sure?')

      if (isConfirmed) {
        await deleteAccount(id)
      }
    } catch (e) {
      console.log(e, 'error')
    }
  }
  return (
    <div className="min-h-screen flex justify-center items-center flex-col relative">
      <div className="flex justify-center flex-col items-center">
        <h1 className="text-white font-bold text-5xl my-12">
          Who is Watching?
        </h1>

        <ul className="flex p-8 my-12">
          {Array.isArray(result?.data) &&
            result?.data?.map((account) => (
              <li
                className="max-w-[200px] w-[155px] cursor-pointer flex flex-col items-center gap-3 min-w-[200px]"
                key={account._id}
              >
                <div className="relative">
                  <div
                    className="max-w-[200px] w-[155px] cursor-pointer flex flex-col items-center gap-3 min-w-[200px] relative"
                    onClick={() => loginIntoAccount(account._id)}
                  >
                    <Image
                      src={
                        'https://occ-0-2611-3663.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABfNXUMVXGhnCZwPI1SghnGpmUgqS_J-owMff-jig42xPF7vozQS1ge5xTgPTzH7ttfNYQXnsYs4vrMBaadh4E6RTJMVepojWqOXx.png?r=1d4'
                      }
                      alt={'account'}
                      width={155}
                      height={155}
                    />
                  </div>
                  {isDelete ? (
                    <div
                      className="absolute transform bottom-0 left-5 z-10 cursor-pointer"
                      onClick={() => onDelete(account._id)}
                    >
                      <Trash2 className="w-8 h-8 text-red-600" />
                    </div>
                  ) : null}
                </div>

                <div className="flex items-center gap-1">
                  <span className="font-mono font-bold text-xl">
                    {account.name}
                  </span>
                  <LockKeyhole />
                </div>
              </li>
            ))}

          {Array.isArray(result?.data) && result?.data?.length < 4 ? (
            <li
              className="border  bg-[#e5b109] font-bold text-xl border-black rounded max-w-[200px] min-w-[84px] max-h-[200px] min-h-[84px] w-[155px] h-[155px] cursor-pointer flex justify-center items-center"
              onClick={createAccount}
            >
              Add Account
            </li>
          ) : null}
        </ul>

        <Button
          onClick={() => setIsDelete((prev) => !prev)}
          className="bg-transparent rounded-none hover:bg-transparent !text-white border border-gray-100 cursor-pointer tracking-wide inline-flex text-sm px-[1.5em] py-[0.5em]"
        >
          Manage Profiles
        </Button>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          {state === 'create' ? (
            <CreateAccountForm openDialog={setOpenDialog} />
          ) : null}
          {state === 'login' ? (
            <LoginAccountForm currentAccountId={currentAccountId} />
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  )
}
export default ManageAccount
