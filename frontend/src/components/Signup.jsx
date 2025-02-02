import React, { useState } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  IconButton,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import { LockOutlined, Visibility, VisibilityOff } from "@mui/icons-material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthProvider";

/**
 * Signup component that handles user registration, including form validation,
 * password matching, and role selection.
 *
 * @returns {JSX.Element} The rendered Signup component.
 */
export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showVerifyPassword, setShowVerifyPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    verifyPassword: "",
    role: "user",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { register } = useAuth();

  /**
   * Checks if the two provided passwords match.
   *
   * @param {string} password1 - The first password.
   * @param {string} password2 - The second password.
   * @returns {boolean} True if passwords match, otherwise false.
   */
  const checkPasswordMatch = (password1, password2) => {
    return password1 === password2;
  };

  /**
   * Handles the form submission for user registration.
   *
   * @param {React.FormEvent<HTMLFormElement>} event - The form submit event.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    setLoading(true);

    const { username, password, verifyPassword } = formData;

    if (!username) {
      setErrorMessage("Please provide a username.");
      setLoading(false);
      return;
    }

    if (!checkPasswordMatch(password, verifyPassword)) {
      setErrorMessage("Passwords do not match.");
      setLoading(false);
      return;
    }

    // Check password length
    if (password.length < 8) {
      setErrorMessage("Password must be at least 8 characters long.");
      setLoading(false);
      return;
    }

    try {
      const response = await register(username, password, formData.role);
      if (response.token) {
        navigate("/home"); // Redirect to dashboard on success
      }
    } catch (error) {
      console.error("Error during signup:", error);

      // Display the error message returned by the backend
      if (error.message) {
        setErrorMessage(error.message); // Show the backend's error message like "username taken"
      } else {
        setErrorMessage(
          "An error occurred while registering. Please try again."
        );
      }
    } finally {
      setLoading(false); // Stop the loading spinner
    }
  };

  /**
   * Handles changes to the input fields and updates the form data.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event - The change event.
   */
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {errorMessage && (
          <Typography color="error" variant="body2" mb={2} align="center">
            {errorMessage}
          </Typography>
        )}
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                value={formData.username}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="new-password"
                value={formData.password}
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="verifyPassword"
                label="Verify Password"
                type={showVerifyPassword ? "text" : "password"}
                id="verifyPassword"
                autoComplete="new-password"
                value={formData.verifyPassword}
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          setShowVerifyPassword(!showVerifyPassword)
                        }
                        edge="end"
                      >
                        {showVerifyPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.role === "admin"}
                    onChange={() =>
                      setFormData({
                        ...formData,
                        role: formData.role === "admin" ? "user" : "admin",
                      })
                    }
                    color="primary"
                  />
                }
                label="I'm an admin."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Sign Up"}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link component={RouterLink} to="/" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
