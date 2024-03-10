import {
  clearErrors,
  getAllPdfs,
  uploadPdf,
} from "../features/pdfUpload/pdfUploadSlice";
import { UploadFile } from "@mui/icons-material";
import { Box, Button, Container, CssBaseline, Typography } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import PdfCard from "../components/PdfCard";
import { unwrapResult } from "@reduxjs/toolkit";
import Loader from "../assets/loading.svg";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UploadLoading from "../assets/upload-loading.svg";

export default function Home() {
  const filePickerRef = useRef(null);

  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.auth);
  const { isUploading, uploadError, allPdfs, allPdfError } = useSelector(
    (state) => state.pdfUpload
  );

  useEffect(() => {
    if (status === "ERROR" || uploadError || allPdfError) {
      setTimeout(() => {
        dispatch(clearErrors());
      }, 2000);
    }
  }, [status, dispatch, uploadError, allPdfError]);

  useEffect(() => {
    dispatch(getAllPdfs());
  }, [dispatch]);

  const handlePdfUpload = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      let formData = new FormData();
      formData.append("file", file);

      dispatch(uploadPdf(formData))
        .then(unwrapResult)
        .then(() => dispatch(getAllPdfs()))
        .catch((err) => {
          toast.error(err, {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        });
    }
  };

  return (
    <Container
      component='main'
      sx={{
        width: "100%",
        height: "100%",
      }}
    >
      <CssBaseline />
      <Box
        component='main'
        maxWidth='xs'
        sx={{
          marginTop: 8,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          marginBottom: 10,
        }}
      >
        {/* Upload Button Section */}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Button
            onClick={() => filePickerRef.current.click()}
            variant='outlined'
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 230,
              height: 50,
              padding: "5px 25px",
              position: "relative",
            }}
          >
            <UploadFile
              sx={{ position: "absolute", left: 15, fontSize: 26 }}
            />
            <Typography
              variant='h6'
              color='inherit'
              noWrap
              fontSize={20}
              fontWeight={400}
            >
              {isUploading ? (
                <img
                  src={UploadLoading}
                  alt='Loading...'
                  width={"35px"}
                  height={"35px"}
                  style={{
                    marginTop: "5px",
                  }}
                />
              ) : (
                "Upload PDF"
              )}
              <input
                type='file'
                name='file'
                ref={filePickerRef}
                accept='application/pdf'
                hidden
                onChange={handlePdfUpload}
              />
            </Typography>
          </Button>
        </Box>
        {/* PDF List Section */}
        <Box
          sx={{
            width: "100%",
            height: "100%",
            marginTop: 10,
            display: "flex",
            flexWrap: "wrap",
            gap: 3,
          }}
        >
          {status === "LOADING" && <img src={Loader} alt='Loading...' />}
          {allPdfs?.map((file) => (
            <PdfCard key={file.id} file={file} />
          ))}
        </Box>
      </Box>
    </Container>
  );
}
