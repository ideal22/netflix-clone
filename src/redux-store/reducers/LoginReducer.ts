import { AccountsAxsiosResponse } from '@/types/context.interface'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

type BodyData = {
  uid: string | any
  pin: string
  accountId: string
}

export const loginApi = createApi({
  reducerPath: 'login',
  baseQuery: fetchBaseQuery({ baseUrl: '' }),
  endpoints: (build) => ({
    loginAccount: build.mutation<AccountsAxsiosResponse, BodyData>({
      query: (account) => ({
        url: 'api/login',
        method: 'POST',
        body: account,
      }),
    }),
  }),
})
