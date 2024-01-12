import Account from '@/database/account'
import { connectToDatabase } from '@/lib/mongoose'
import { compare } from 'bcryptjs'
import { NextResponse } from 'next/server'

export const POST = async (req: Request) => {
  try {
    await connectToDatabase()

    const { uid, pin, accountId } = await req.json()

    const currentAccount = await Account.findOne({ _id: accountId, uid })
    if (!currentAccount) {
      return NextResponse.json({
        message: 'Account not found!',
        success: false,
      })
    }

    const isMatch = await compare(pin, currentAccount.pin)

    if (isMatch) {
      return NextResponse.json({
        success: true,
        data: currentAccount,
        message: 'success',
      })
    } else {
      return NextResponse.json({ success: false, message: 'Incorrect pin' })
    }
  } catch (e) {
    return NextResponse.json({
      message: 'Something went wrong',
      success: false,
    })
  }
}
