import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import pdfUploadReducer from "../features/pdfUpload/pdfUploadSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    pdfUpload: pdfUploadReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
