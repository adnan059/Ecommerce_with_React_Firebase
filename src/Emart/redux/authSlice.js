import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
  },
  reducers: {
    signup: (state, action) => {
      state.user = action.payload.user;
    },
    signin: (state, action) => {
      state.user = action.payload.user;
    },
    signout: (state) => {
      state.user = null;
    },
  },
});

export const { signup, signin, signout } = authSlice.actions;

export default authSlice.reducer;
