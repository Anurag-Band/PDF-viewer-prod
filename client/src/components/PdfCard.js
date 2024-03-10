import React from "react";
import CommentIcon from "@mui/icons-material/Comment";
import { Box, Typography } from "@mui/material";
import { blueGrey, grey } from "@mui/material/colors";
import { Link } from "react-router-dom";

export default function PdfCard({ file }) {
  return (
    <Link
      to={`/pdf-viewer/${file.id}`}
      style={{ color: "inherit", textDecoration: "inherit" }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          padding: 2,
          border: "1px solid grey",
          bgcolor: grey[300],
          borderRadius: 1,
          width: 350,
          cursor: "pointer",
          color: blueGrey
        }}
      >
        <CommentIcon sx={{ mr: 2 }} />
        <Typography
          variant='h6'
          color='inherit'
          noWrap
          fontSize={15}
          fontWeight={300}
        >
          {file.fileName}
        </Typography>
      </Box>
    </Link>
  );
}
