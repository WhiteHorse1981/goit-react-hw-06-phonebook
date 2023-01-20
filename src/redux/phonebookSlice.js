import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const initialState = {
  phonebookContacts: {
    contacts: [],
    filter: '',
  },
};

export const phonebookSlice = createSlice({
  name: 'phonebook',
  initialState,
  reducers: {
    addContact: (state, action) => {
      state.phonebookContacts.contacts.push(action.payload);
    },
    removeContact: (state, action) => {
      state.phonebookContacts.contacts =
        state.phonebookContacts.contacts.filter(
          contact => contact.id !== action.payload
        );
    },
    filterContact: (state, action) => {
      state.phonebookContacts.filter = action.payload;
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
