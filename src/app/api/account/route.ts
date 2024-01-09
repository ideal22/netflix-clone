import Account from '@/database/account'
import { connectToDatabase } from '@/lib/mongoose'
import { AccountProps } from '@/types/context.interface'
import { hash } from 'bcryptjs'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export const POST = async (req: Request) => {
  try {
    await connectToDatabase()
    const { name, uid, pin } = (await req.json()) as AccountProps

    const isAccountExist = await Account.findOne({ name })
    const allAccounts = await Account.find({ uid })

    if (isAccountExist && isAccountExist.name === name) {
      return NextResponse.json({
        success: false,
        message: 'You already have an account',
      })
    }

    if (allAccounts && allAccounts.length > 3) {
      return NextResponse.json({
        success: false,
        message: 'You can only have 4 accounts',
      })
    }

    const hashedPin = await hash(uid, 10)

    const account = await Account.create({ name, uid, pin: hashedPin })
    return NextResponse.json({ account })
  } catch (e) {
    return NextResponse.json({
      success: false,
      message: 'Something went wrong!',
    })
  }
}
