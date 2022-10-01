import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import axios from 'axios';
import {Url} from "../../constans";
import {RootState} from "../store";

enum STATUS {
    LOADING = 'loading', SUCCESS = 'success', ERROR = 'error', IDLE = 'idle'
}

export type ContactType = {
    avatar: string
    id: string,
    name: string,
    phone: string,
}

type ContactsState = {
    contacts:  ContactType[] | []
    status: STATUS
    error: string | null | undefined
}

export const fetchContacts = createAsyncThunk<ContactType[], void, { rejectValue: string; }>('user/fetchContactsStatus', async (_, {rejectWithValue}) => {
    const {data, status} = await axios.get<ContactType[]>(Url.CONTACTS)
    if (status >= 200 && status < 300) {
        return data;
    }
    return rejectWithValue('Server Error');
});

export const deleteContact = createAsyncThunk<string, string, { rejectValue: string; }>('user/deleteContactStatus', async (id, {rejectWithValue}) => {
    const { status } = await axios.delete(`${Url.CONTACTS}/${id}`)
    if (status >= 200 && status < 300) {
        return id;
    }
    return rejectWithValue('Server Error');
});

export const editContact = createAsyncThunk<ContactType, ContactType, { rejectValue: string }>('contact/editContact', async (modifiedContract: ContactType, { rejectWithValue }) => {
    const { status, data } = await axios.put(`${Url.CONTACTS}/${modifiedContract.id}`, modifiedContract);
    if (status >= 200 && status < 300) {
        return data
    }
    return rejectWithValue('Server Error');
});

export const addContact = createAsyncThunk<ContactType, Record<string, string>, { rejectValue: string }>('contact/addContact', async (newContract, { rejectWithValue }) => {
    const {status, data} = await axios.post(Url.CONTACTS, newContract);
    if (status >= 200 && status < 300) {
        return data
    } else {
        return rejectWithValue('Server Error');
    }
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
        builder.addCase(fetchContacts.rejected, (state, {payload, error}) => {
            state.status = STATUS.ERROR
            if (payload) {
                state.error = payload
            } else {
                state.error = error.message
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
        builder.addCase(deleteContact.rejected, (state, {payload, error}) => {
            state.status = STATUS.ERROR
            if (payload) {
                state.error = payload
            } else {
                state.error = error.message
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
        builder.addCase(editContact.rejected, (state, {payload, error}) => {
            state.status = STATUS.ERROR
            if (payload) {
                state.error = payload
            } else {
                state.error = error.message
            }
        });

        builder.addCase(addContact.pending, (state) => {
            state.status = STATUS.LOADING
            state.error = ''
        });
        builder.addCase(addContact.fulfilled, (state, {payload}:PayloadAction<ContactType>) => {
            state.status = STATUS.SUCCESS
            state.contacts = [...state.contacts, payload]
        });
        builder.addCase(addContact.rejected, (state, {payload, error}) => {
            state.status = STATUS.ERROR
            if ( payload) {
                state.error = payload
            } else {
                state.error = error.message
            }
        });
    },
})

export const selectContact = (state: RootState) => state.contact
export default contactSlice.reducer