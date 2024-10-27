// components/NotFound.js
import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  // Navigate back to the previous page
  const handleGoBack = () => {
    navigate(-1); // Goes to the previous page in the history stack
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        bgcolor: "background.default",
        color: "text.primary",
        px: 2,
        padding: 4,
      }}
    >
      <Typography variant="h1" component="h1" gutterBottom>
        404
      </Typography>
      <Typography variant="h5" component="p" gutterBottom>
        Page Not Found
      </Typography>
      <Typography variant="body1" component="p" mb={3}>
        The page you are looking for does not exist or has been moved.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleGoBack}
        sx={{ mt: 2 }}
      >
        Go Back
      </Button>
    </Box>
  );
}
