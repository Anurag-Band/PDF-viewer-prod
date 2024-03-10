import Axios from "../../utils/Axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "IDLE",
  isUploading: false,
  uploadError: null,
  allPdfs: null,
  allPdfError: null,
  pdfDetails: null,
};

export const pdfUploadSlice = createSlice({
  name: "pdfUpload",
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.status = "IDLE";
      state.uploadError = null;
      state.allPdfError = null;
    },
    removePdfDetails: (state) => {
      state.pdfDetails = null;
      state.status = "IDLE";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadPdf.pending, (state) => {
        state.status = "LOADING";
        state.isUploading = true;
      })
      .addCase(uploadPdf.fulfilled, (state, action) => {
        state.status = "IDLE";
        state.isUploading = false;
        state.uploadError = action.payload;
      })
      .addCase(uploadPdf.rejected, (state, action) => {
        state.status = "IDLE";
        state.isUploading = false;
        state.uploadError = action.payload;
      })
      .addCase(getAllPdfs.pending, (state) => {
        state.status = "LOADING";
      })
      .addCase(getAllPdfs.fulfilled, (state, action) => {
        state.allPdfs = action.payload;
      })
      .addCase(getAllPdfs.rejected, (state, action) => {
        state.allPdfError = action.payload;
        state.status = "IDLE";
      })
      .addCase(fetchPdfDetails.pending, (state) => {
        state.status = "LOADING";
      })
      .addCase(fetchPdfDetails.fulfilled, (state, action) => {
        state.pdfDetails = action.payload;
        state.status = "IDLE";
      })
      .addCase(fetchPdfDetails.rejected, (state, action) => {
        state.allPdfError = action.payload;
        state.status = "IDLE";
      });
  },
});

export const uploadPdf = createAsyncThunk(
  "upload/pdf",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await Axios.post("/upload/pdf", formData);

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getAllPdfs = createAsyncThunk(
  "pdf/all",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await Axios.get("/pdf/all");

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const fetchPdfDetails = createAsyncThunk(
  "pdf/details",
  async (pdfId, { rejectWithValue }) => {
    try {
      const { data } = await Axios.get(`/pdf/${pdfId}`);

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const { clearErrors, removePdfDetails } = pdfUploadSlice.actions;
export default pdfUploadSlice.reducer;
