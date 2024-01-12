import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { accountApi } from './reducers/AccountReducer'
import { loginApi } from './reducers/LoginReducer'

const rootReducer = combineReducers({
  [accountApi.reducerPath]: accountApi.reducer,
  [loginApi.reducerPath]: loginApi.reducer,
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(accountApi.middleware)
        .concat(loginApi.middleware),
  })
}
