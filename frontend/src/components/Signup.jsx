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
import authService from "../authService";

export default function SignUp() {
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

  const checkPasswordMatch = (password1, password2) => {
    return password1 === password2;
  };

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

    try {
      const response = await authService.register(username, password);
      if (response.token) {
        navigate("/protected"); // todo: navigate to some protected page
      } else {
        setErrorMessage("Registration failed.");
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message ||
          "An error occurred during registration."
      );
    } finally {
      setLoading(false);
    }
  };

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
              <Link component={RouterLink} to="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
