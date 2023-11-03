// src/redux/userSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    loadUserFromStorage: (state) => {
      const userString = localStorage.getItem("user");
      if (userString) {
        state.user = JSON.parse(userString); // Parse the user data from the string
      }
    },
  },
});

export const { setUser, loadUserFromStorage } = UserSlice.actions;

export default UserSlice.reducer;
