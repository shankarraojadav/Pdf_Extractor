import { createSlice } from "@reduxjs/toolkit";
import { pdfhistory } from "./api";

const initialState = {
  pdfFiles: [],
  isLoading: false,
  error: null,
};

const pdfHistorySlice = createSlice({
  name: "pdfHistory",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(pdfhistory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(pdfhistory.fulfilled, (state, action) => {
        state.pdfFiles = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(pdfhistory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default pdfHistorySlice.reducer;
