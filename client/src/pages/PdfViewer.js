import React, { useEffect, useState } from "react";
import "../index.css";
import PDF from "react-pdf-js";
import { Box } from "@mui/system";
import { Button, Tooltip, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  fetchPdfDetails,
  removePdfDetails,
} from "../features/pdfUpload/pdfUploadSlice";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../assets/loading.svg";
import {
  Rotate90DegreesCcw,
  Rotate90DegreesCw,
  ZoomIn,
  ZoomInMap,
  ZoomOut,
  ZoomOutMap,
} from "@mui/icons-material";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { grey } from "@mui/material/colors";

const PdfViewer = () => {
  const { pdfId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pdfDetails, status } = useSelector((state) => state.pdfUpload);

  const handle = useFullScreenHandle();

  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(0);
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);

  const onDocumentComplete = (numPages) => {
    setPages(numPages);
  };

  const onDocumentError = (err) => {
    console.error("pdf viewer error:", err);
    dispatch(clearErrors());
    navigate("/");
  };

  const onSetScale = (type) => {
    var newScale = type ? scale + 0.1 : scale - 0.1;

    if (newScale > 2) {
      newScale = 2;
    } else if (newScale < 0.1) {
      newScale = 0.1;
    }

    setScale(newScale);
  };

  const onPage = (type) => {
    var newPage = type ? page + 1 : page - 1;

    if (newPage > pages) {
      newPage = 1;
    } else if (newPage < 1) {
      newPage = pages;
    }

    setPage(newPage);
  };

  const zoomStyle = {
    marginLeft: 10,
    cursor: "pointer",
  };

  useEffect(() => {
    if (!pdfId) return;
    dispatch(fetchPdfDetails(pdfId));

    return () => {
      dispatch(removePdfDetails());
    };
  }, [dispatch, pdfId]);

  return (
    <FullScreen handle={handle}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 3,
          bgcolor: "whitesmoke",
          width: "100%",
          minHeight: "100vh",
          overflowX: "hidden",
          zIndex: 999,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 5,
            padding: 1,
            height: "5vh",
            color: "black",
            bgcolor: grey.A400,
            width: "100%",
            margin: "0 auto",
            zIndex: 999,
          }}
          className='footer'
        >
          {pages > 1 && (
            <Button variant='contained' onClick={() => onPage(0)}>
              Previous
            </Button>
          )}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Typography
              component='h3'
              variant='h5'
              sx={{
                textAlign: "center",
                fontSize: 18,
                fontWeight: 500,
              }}
            >
              {`Page ${page} of ${pages}`}
            </Typography>
            <Tooltip title='Zoom Out' placement='top'>
              <ZoomOut
                style={{ ...zoomStyle, opacity: scale === 0.1 ? 0.5 : 1 }}
                onClick={() => onSetScale(0)}
              />
            </Tooltip>
            <Typography
              component='h3'
              variant='h5'
              sx={{
                fontSize: 18,
                fontWeight: 400,
              }}
            >
              {`${Math.round(scale * 100)}%`}
            </Typography>
            <Tooltip title='Zoom In' placement='top'>
              <ZoomIn
                style={{ ...zoomStyle, opacity: scale === 2 ? 0.5 : 1 }}
                onClick={() => onSetScale(1)}
              />
            </Tooltip>
          </Box>
          <Tooltip title='Rotate Left' placement='top'>
            <Rotate90DegreesCcw
              style={{ cursor: "pointer" }}
              onClick={() => setRotate((prev) => prev - 90)}
            />
          </Tooltip>
          <Tooltip title='Rotate Right' placement='top'>
            <Rotate90DegreesCw
              style={{ cursor: "pointer" }}
              onClick={() => setRotate((prev) => prev + 90)}
            />
          </Tooltip>
          {handle.active ? (
            <Tooltip title='Exit Full Screen' placement='top'>
              <ZoomInMap style={{ cursor: "pointer" }} onClick={handle.exit} />
            </Tooltip>
          ) : (
            <Tooltip title='Enter Full Screen' placement='top'>
              <ZoomOutMap
                style={{ cursor: "pointer" }}
                onClick={handle.enter}
              />
            </Tooltip>
          )}
          {pages > 1 && (
            <Button variant='contained' onClick={() => onPage(1)}>
              Next
            </Button>
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "80vh",
            marginTop: 5,
          }}
        >
          {status === "LOADING" ? (
            <img style={{ zIndex: 999 }} src={Loader} alt='Loading...' />
          ) : pdfDetails?.filePublicUrl ? (
            <PDF
              file={pdfDetails?.filePublicUrl}
              onDocumentComplete={onDocumentComplete}
              onDocumentError={onDocumentError}
              page={page}
              scale={scale}
              rotate={rotate}
            />
          ) : null}
        </Box>
      </Box>
    </FullScreen>
  );
};
export default PdfViewer;
