import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const initialState = {
  contacts: {
    contacts: [],
    filter: '',
  },
};

export const phonebookSlice = createSlice({
  name: 'phonebook',
  initialState,
  reducers: {
    addContact: (state, action) => {
      state.contacts.contacts.push(action.payload);
    },
    removeContact: (state, action) => {
      state.contacts.contacts = state.contacts.contacts.filter(
        it => it.id !== action.payload
      );
    },
    filterContact: (state, action) => {
      state.contacts.filter = action.payload;
    },
  },
});

export const { addContact, removeContact, filterContact } =
  phonebookSlice.actions;

const persistConfig = {
  key: 'phonebook',
  storage,
};

export const persistedPhonebookReducer = persistReducer(
  persistConfig,
  phonebookSlice.reducer
);
