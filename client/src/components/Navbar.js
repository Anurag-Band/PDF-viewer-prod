import { PictureAsPdf } from "@mui/icons-material";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../features/auth/authSlice";

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleLogOut = () => {
    dispatch(logoutUser());

    navigate("/auth/signin");
  };

  return (
    <AppBar
      position='relative'
      sx={{
        width: "100%",
        overflowX: "hidden"
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <PictureAsPdf sx={{ mr: 2 }} />
          <Typography
            variant='h6'
            color='inherit'
            noWrap
            fontSize={30}
            fontWeight={500}
          >
            PDF Viewer
          </Typography>
        </Box>
        <Box>
          {isAuthenticated && (
            <Typography
              component='h1'
              variant='h5'
              onClick={handleLogOut}
              sx={{
                cursor: "pointer",
              }}
            >
              Log Out
            </Typography>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
