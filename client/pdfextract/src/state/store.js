import { configureStore } from "@reduxjs/toolkit";
import googleReducer from "./googleSlice";
import pdfReducer from "./pdfSlice";
import pdfHistoryReducer from "./pdfHistorySlice";
import pdfExtraReducer from "./extractedPdfSlice";

export const store = configureStore({
  reducer: {
    signin: googleReducer,
    pdfData: pdfReducer,
    pdfHistory: pdfHistoryReducer,
    extractedPdfs: pdfExtraReducer,
  },
});
