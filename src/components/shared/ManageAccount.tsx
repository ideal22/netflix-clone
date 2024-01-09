'use client'
import { LockKeyhole, Trash2 } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { Button } from '../ui/button'
import { Dialog, DialogContent } from '../ui/dialog'
import CreateAccountForm from '../form/CreateAccountForm'
import LoginAccountForm from '../form/LoginAccountForm'

const ManageAccount = () => {
  const [isDelete, setIsDelete] = useState<boolean>(false)
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const [state, setState] = useState<'login' | 'create'>('create')

  const createAccount = () => {
    setOpenDialog(true)
    setState('create')
  }

  const loginIntoAccount = () => {
    setOpenDialog(true)
    setState('login')
  }
  return (
    <div className="min-h-screen flex justify-center items-center flex-col relative">
      <div className="flex justify-center flex-col items-center">
        <h1 className="text-white font-bold text-5xl my-12">Who's Watching?</h1>

        <ul className="flex p-8 my-12">
          <li className="max-w-[200px] w-[155px] cursor-pointer flex flex-col items-center gap-3 min-w-[200px]">
            <div className="relative">
              <div
                className="max-w-[200px] w-[155px] cursor-pointer flex flex-col items-center gap-3 min-w-[200px] relative"
                onClick={loginIntoAccount}
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
                <div className="absolute transform bottom-0 left-5 z-10 cursor-pointer">
                  <Trash2 className="w-8 h-8 text-red-600" />
                </div>
              ) : null}
            </div>

            <div className="flex items-center gap-1">
              <span className="font-mono font-bold text-xl">Nodir</span>
              <LockKeyhole />
            </div>
          </li>

          <li
            className="border  bg-[#e5b109] font-bold text-xl border-black rounded max-w-[200px] min-w-[84px] max-h-[200px] min-h-[84px] w-[155px] h-[155px] cursor-pointer flex justify-center items-center"
            onClick={createAccount}
          >
            Add Account
          </li>
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
          {state === 'create' ? <CreateAccountForm /> : null}
          {state === 'login' ? <LoginAccountForm /> : null}
        </DialogContent>
      </Dialog>
    </div>
  )
}
export default ManageAccount
