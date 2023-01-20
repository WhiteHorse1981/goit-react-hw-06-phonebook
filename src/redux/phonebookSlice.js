import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  contacts: [],
  filter: '',
};

const phonebookSlice = createSlice({
  name: 'phonebook',
  initialState,
  reducers: {
    addContact: (state, action) => {
      state.contacts.push(action.payload);
    },
    removeContact: (state, action) => {
      state.contacts = state.contacts.filter(
        contact => contact.id !== action.payload
      );
    },
    filterContact: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const { addContact, removeContact, filterContact } =
  phonebookSlice.actions;

export default phonebookSlice.reducer;
