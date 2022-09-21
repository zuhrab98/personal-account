import { createSlice } from '@reduxjs/toolkit'
import { RootState } from "../store";

export const authFormSlice = createSlice({
  name: 'authForm',
  initialState: {
    auth: true
  },
  reducers: {
    
  }
})

export const selectAuthForm = (state: RootState) => state.login

export default authFormSlice.reducer