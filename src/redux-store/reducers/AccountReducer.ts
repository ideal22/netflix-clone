import { AccountProps, AccountsAxsiosResponse } from '@/types/context.interface'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const accountApi = createApi({
  reducerPath: 'accountApi',
  baseQuery: fetchBaseQuery({ baseUrl: '' }),
  endpoints: (build) => ({
    fetchAllAccounts: build.query<AccountsAxsiosResponse, string>({
      query: (uid) => ({
        url: `api/account?uid=${uid}`,
      }),
    }),
    createAccount: build.mutation<AccountsAxsiosResponse, AccountProps>({
      query: (account) => ({
        url: 'api/account',
        method: 'POST',
        body: account,
      }),
    }),
  }),
})
