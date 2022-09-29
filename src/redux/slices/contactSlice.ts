import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import axios from 'axios';
import {Url} from "../../constans";
import {RootState} from "../store";

enum STATUS {
    LOADING = 'loading', SUCCESS = 'success', ERROR = 'error', IDLE = 'idle'
}

type ContactType = {
    id: string,
    name: string,
    phone: string,
    isEdit: boolean
}

type ContactsState = {
    contacts:  ContactType[] | []
    status: STATUS
    error: string | null | undefined
}

export const fetchContacts = createAsyncThunk<ContactType[], void, { rejectValue: string; }>('user/fetchContactsStatus', async (_, {rejectWithValue}) => {
    const {data, status} = await axios.get<ContactType[]>(Url.CONTACTS)
    if (status !== 200) {
        return rejectWithValue('Server Error');
    }
    return data
});

export const deleteContact = createAsyncThunk<string, string, { rejectValue: string; }>('user/deleteContactStatus', async (id, {rejectWithValue}) => {
    const { status } = await axios.delete(`${Url.CONTACTS}/${id}`)
    if (status !== 200) {
        return rejectWithValue('Server Error')
    }
    return id
});

export const editContact = createAsyncThunk<ContactType, ContactType, { rejectValue: string }>('contact/editContact', async (modifiedContract: ContactType, { rejectWithValue }) => {
    const { status, data } = await axios.put(`${Url.CONTACTS}/${modifiedContract.id}`, modifiedContract);
    if (status !== 200) {
        return rejectWithValue('Server Error')
    }
    return data
});

const initialState: ContactsState = {
    contacts: [],
    status: STATUS.IDLE,
    error: null,
}

export const contactSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchContacts.pending, (state) => {
            state.status = STATUS.LOADING
            state.error = ''
        })
        builder.addCase(fetchContacts.fulfilled, (state, {payload}: PayloadAction<ContactType[]>) => {
            state.status = STATUS.SUCCESS
            state.contacts = payload
        })
        builder.addCase(fetchContacts.rejected, (state, action) => {
            state.status = STATUS.ERROR
            if (action.payload) {
                state.error = action.payload
            } else {
                state.error = action.error.message
            }
        })
        builder.addCase(deleteContact.pending, (state) => {
            state.status = STATUS.LOADING
            state.error = ''
        })
        builder.addCase(deleteContact.fulfilled, (state, {payload}: PayloadAction<string>) => {
            state.status = STATUS.SUCCESS
            state.contacts = state.contacts.filter(item => item.id !== payload)
        });
        builder.addCase(deleteContact.rejected, (state, action) => {
            state.status = STATUS.ERROR
            if (action.payload) {
                state.error = action.payload
            } else {
                state.error = action.error.message
            }
        });
        builder.addCase(editContact.pending, (state) => {
            state.status = STATUS.LOADING
            state.error = ''
        })
        builder.addCase(editContact.fulfilled, (state, {payload}: PayloadAction<ContactType>) => {
            state.status = STATUS.SUCCESS
            state.contacts = state.contacts.map(item => {
                if (item.id === payload.id) {
                    return payload;
                }
                return item;
            });
        },);
        builder.addCase(editContact.rejected, (state, action) => {
            state.status = STATUS.ERROR
            if (action.payload) {
                state.error = action.payload
            } else {
                state.error = action.error.message
            }
        });
    },
})

export const selectContact = (state: RootState) => state.contact
export default contactSlice.reducer