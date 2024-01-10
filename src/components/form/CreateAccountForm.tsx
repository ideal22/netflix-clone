'use client'

import { CreateFormType, createAccountSchema } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import PinInput from 'react-pin-input'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { accountApi } from '@/redux-store/reducers/AccountReducer'
import { AccountProps } from '@/types/context.interface'
import { useSession } from 'next-auth/react'

const CreateAccountForm = () => {
  const form = useForm<CreateFormType>({
    resolver: zodResolver(createAccountSchema),
    defaultValues: {
      name: '',
      pin: '',
    },
  })

  const { data: session }: any = useSession()

  const [createAccount, {}] = accountApi.useCreateAccountMutation()

  const submitForm = async (values: CreateFormType) => {
    try {
      await createAccount({
        ...values,
        uid: session?.user?.uid,
      } as AccountProps)
    } catch (e) {
      if (e instanceof Error) {
        console.error(e.message)
      }
    }
  }
  return (
    <>
      <h1 className={'text-white text-center font-bold text-3xl'}>
        Create your account
      </h1>
      <div className={'w-full h-[2px] bg-slate-500/20 mb-4'} />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(submitForm)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    autoComplete="off"
                    className="h-14"
                    disabled={form.formState.isSubmitting}
                  />
                </FormControl>
                <FormDescription>
                  Your name is used to identify your account.
                </FormDescription>
                <FormMessage className="text-red-600" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="pin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>PIN Code</FormLabel>
                <FormControl>
                  <PinInput
                    length={4}
                    initialValue={field.value}
                    secret
                    disabled={form.formState.isSubmitting}
                    secretDelay={100}
                    onChange={(value) => field.onChange(value)}
                    type={'numeric'}
                    inputMode={'number'}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(4, 1fr)',
                      gap: '10px',
                    }}
                    inputStyle={{
                      borderColor: 'RGBA(255, 255, 255, 0.16)',
                      height: '56px',
                      width: '100%',
                      fontSize: '40px',
                    }}
                    inputFocusStyle={{
                      borderColor: 'RGBA(255, 255, 255, 0.80)',
                    }}
                    autoSelect={true}
                  />
                </FormControl>
                <FormDescription>
                  Your pin is used to identify your account.
                </FormDescription>
                <FormMessage className="text-red-600" />
              </FormItem>
            )}
          />

          <Button
            className="w-full bg-red-600 hover:bg-red-700 flex justify-center items-center h-[56px] !text-white mt-4"
            disabled={form.formState.isSubmitting}
            type="submit"
          >
            Create account
          </Button>
        </form>
      </Form>
    </>
  )
}
export default CreateAccountForm
