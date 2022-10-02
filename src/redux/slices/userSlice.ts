import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios';
import {Url} from "../../constans";
import {RootState} from "../store";
import {Form} from "../../pages/AuthForm";

type Users = {
    id: number
    userName: string
    password: string
}

enum STATUS {
    LOADING =  'loading',
    SUCCESS = 'success',
    ERROR = 'error',
    IDLE = 'idle'
}

type UserState = {
    authorizedUser: null | Users,
    status: STATUS
    error: string | null | undefined
}

export const fetchAuthUser = createAsyncThunk<Users, Form,  { rejectValue: string }>('user/fetchAuthUserStatus',
    async (formValues: Form, {rejectWithValue}) => {
       const {data, status} = await axios.get<Users[]>(Url.USERS)
       if (status !== 200) {
           throw new Error('Error')
       }
       const isUser =  data.find(item => item.userName === formValues.login && item.password === formValues.password)

       if (!isUser) {
           return rejectWithValue('Такого пользователя не существует')
       }
       return isUser
})

const initialState: UserState = {
    authorizedUser: null,
    status: STATUS.IDLE,
    error: null
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAuthUser.pending, (state) => {
            state.status = STATUS.LOADING
            state.error = ''
        })
        builder.addCase(
            fetchAuthUser.fulfilled,
            (state, { payload }: PayloadAction<Users>) => {
                state.status = STATUS.SUCCESS
                state.authorizedUser = payload
            },
        )
        builder.addCase(fetchAuthUser.rejected, (state, action) => {
            state.status = STATUS.ERROR
            if (action.payload) {
                state.error = action.payload
            } else  {
                console.log(action.error)
                state.error = action.error.message
            }
        })
    },
})

export const selectUser = (state: RootState) => state.user
export default userSlice.reducer