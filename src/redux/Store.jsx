// src/redux/store.js

import { configureStore } from "@reduxjs/toolkit";
import UserReducer, { loadUserFromStorage } from "./userSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, UserReducer);

const store = configureStore({
  reducer: {
    user: persistedReducer,
  },
});

let persistor = persistStore(store);
store.dispatch(loadUserFromStorage());

export { store, persistor };
