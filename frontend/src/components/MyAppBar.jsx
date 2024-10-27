import * as React from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Typography, Button } from "@mui/material";
import { useAuth } from "../hooks/AuthProvider";

/**
 * MyAppBar Component - A navigation bar for the application.
 *
 * Displays the application title and a logout button if the user is authenticated.
 *
 * @returns {JSX.Element} The rendered app bar component.
 */
export default function MyAppBar() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { token } = useAuth();

  /**
   * Handles the logout action by calling the logout function from the authentication context.
   */
  const handleLogout = () => {
    logout();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, textAlign: "center" }}
          >
            Product API
          </Typography>
          {token && (
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
