import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  theme: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.user = payload;
    },
    setTheme: (state, { payload }) => {
      state.theme = payload;
    },
  },
});

export const { setUser, setTheme } = userSlice.actions;

export default userSlice.reducer;
