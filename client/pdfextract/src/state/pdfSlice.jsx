import { createSlice } from "@reduxjs/toolkit";
import { uploadPdf } from "./api";

const initialState = {
  pdfUrl: null,
  isLoading: false,
  error: null,
};

const pdfSlice = createSlice({
  name: "pdf",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(uploadPdf.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(uploadPdf.fulfilled, (state, action) => {
        state.pdfUrl = action.payload.url;
        state.isLoading = false;
      })
      .addCase(uploadPdf.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      });
  },
});

export default pdfSlice.reducer;
