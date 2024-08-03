import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  activeUser: null,
};

const adminSlice = createSlice({
  name: "admin",
    initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setActiveUser: (state, action) => {
      state.activeUser = action.payload;
    },
    logout: (state) => {
      state.token = null;
      state.activeUser = null;
    },
  },
});

export const { setToken, setActiveUser, logout } = adminSlice.actions;

export default adminSlice.reducer;
