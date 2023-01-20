import { configureStore } from '@reduxjs/toolkit';
import phonebookReduser from './phonebookSlice';
import storage from 'redux-persist/lib/storage';

import {
  persistStore,
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import persistReducer from 'redux-persist/es/persistReducer';

const persistConfig = {
  key: 'phonebook',
  storage,
};

export const persistedPhonebookReducer = persistReducer(
  persistConfig,
  phonebookReduser
);

export const store = configureStore({
  reducer: {
    phonebook: persistedPhonebookReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
