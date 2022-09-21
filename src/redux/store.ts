import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

import { authFormSlice } from './slices/authFormSlice'

export const store = configureStore({
  reducer: {
    // login: authFormSlice,
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch