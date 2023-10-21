import { createSlice } from "@reduxjs/toolkit";
import { googleSignIn, verifyToken } from "./api";

const initialState = {
  user: null,
  isLoggedIn: false,
  isLoading: false,
  error: null,
};

const googleSignSlice = createSlice({
  name: "signin",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(googleSignIn.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(googleSignIn.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isLoading = false;
      })
      .addCase(googleSignIn.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })
      .addCase(verifyToken.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifyToken.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
        state.isLoggedIn = true;
      })
      .addCase(verifyToken.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      });
  },
});

export default googleSignSlice.reducer;
