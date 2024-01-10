import Account from '@/database/account'
import { connectToDatabase } from '@/lib/mongoose'
import { AccountProps } from '@/types/context.interface'
import { hash } from 'bcryptjs'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

// Create an account
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

    const hashedPin = await hash(pin, 10)

    const account = await Account.create({
      name,
      uid,
      pin: hashedPin,
    })
    return NextResponse.json({ account, success: true, message: 'success' })
  } catch (e) {
    return NextResponse.json({
      success: false,
      message: 'Something went wrong!',
    })
  }
}

// Get account by uid
export const GET = async (req: Request) => {
  try {
    await connectToDatabase()

    const { searchParams } = new URL(req.url)
    const uid = searchParams.get('uid')

    if (!uid) {
      return NextResponse.json({
        success: false,
        message: 'Account uid is required!',
      })
    }

    const accounts = await Account.find({ uid })

    return NextResponse.json({
      success: true,
      data: accounts,
      message: 'success',
    })
  } catch (e) {
    return NextResponse.json({
      success: false,
      message: 'Something went wrong!',
    })
  }
}

// Delete an account
export const DELETE = async (req: Request) => {
  try {
    await connectToDatabase()

    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({
        success: false,
        message: 'Account id is required!',
      })
    }

    await Account.findByIdAndDelete({ id })

    return NextResponse.json({
      success: true,
      message: 'Account deleted successfully!',
    })
  } catch (e) {
    return NextResponse.json({
      success: false,
      message: 'Something went wrong!',
    })
  }
}
