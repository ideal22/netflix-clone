import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { accountApi } from './reducers/AccountReducer'

const rootReducer = combineReducers({
  [accountApi.reducerPath]: accountApi.reducer,
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(accountApi.middleware),
  })
}
