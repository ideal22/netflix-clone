import {
  AccountProps,
  AccountsAxsiosResponse,
  AxiosResponse,
} from '@/types/context.interface'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const accountApi = createApi({
  reducerPath: 'accountApi',
  tagTypes: ['Account'],
  baseQuery: fetchBaseQuery({ baseUrl: '' }),
  endpoints: (build) => ({
    fetchAllAccounts: build.query<AccountsAxsiosResponse, string>({
      query: (uid) => ({
        url: `api/account?uid=${uid}`,
      }),
      providesTags: ['Account'],
    }),
    createAccount: build.mutation<AccountsAxsiosResponse, AccountProps>({
      query: (account) => ({
        url: 'api/account',
        method: 'POST',
        body: account,
      }),
      invalidatesTags: ['Account'],
    }),
    deleteAccount: build.mutation<AxiosResponse, string>({
      query: (id) => ({
        url: `api/account?id=${id}`,
        method: 'delete',
      }),
      invalidatesTags: ['Account'],
    }),
  }),
})
