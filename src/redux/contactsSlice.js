import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: { contactList: [] },
  reducers: {
    add: (state, action) => {
      state.contactList.push(action.payload);
    },
    remove: (state, action) => {
      state.contactList = action.payload;
    },
  },
});

const persistConfig = {
  key: 'contacts',
  storage,
};

export const contactsReducer = persistReducer(
  persistConfig,
  contactsSlice.reducer
);

export const { add, remove } = contactsSlice.actions;

// Selectors

export const getContacts = state => state.contacts.contactList;
