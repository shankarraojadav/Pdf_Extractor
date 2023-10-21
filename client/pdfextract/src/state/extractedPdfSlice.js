import { createSlice } from "@reduxjs/toolkit";
import { pdfExtract } from "./api";

const initialState = {
  pdfUrl: null,
  isLoading: false,
  error: null,
};

const extractPdfSlice = createSlice({
  name: "extractpdf",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(pdfExtract.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(pdfExtract.fulfilled, (state, action) => {
        state.pdfUrl = action.payload;
        state.isLoading = false;
        state.error = false;
      })
      .addCase(pdfExtract.rejected, (state, action) => {
        state.error = action.payload.message;
        state.isLoading = false;
      });
  },
});

export default extractPdfSlice.reducer;
