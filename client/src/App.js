import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { clearErrors } from "./features/pdfUpload/pdfUploadSlice";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./features/auth/authSlice";
import { useEffect } from "react";
import { store } from "./store/store";
import { Box } from "@mui/material";
import PdfViewer from "./pages/PdfViewer";
import { ToastContainer } from "react-toastify";

function App() {
  const dispatch = useDispatch();
  const { status, errorMessage } = useSelector((state) => state.auth);
  useEffect(() => {
    store.dispatch(loadUser());
  }, [dispatch]);

  useEffect(() => {
    if (status === "ERROR") {
      setTimeout(() => {
        dispatch(clearErrors());
      }, 2000);
    }
  }, [status, dispatch, errorMessage]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
      }}
    >
      <Navbar />
      <Routes>
        {/* USER protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path='/' element={<Home />} />
        </Route>
        <Route>
          <Route path='/auth/signin' element={<SignIn />} />
          <Route path='/auth/signup' element={<SignUp />} />
          <Route path='/pdf-viewer/:pdfId' element={<PdfViewer />} />
        </Route>
      </Routes>
      <ToastContainer />
    </Box>
  );
}

export default App;
