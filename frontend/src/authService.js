import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/auth";

const register = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      username,
      password,
    });

    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      return response.data;
    }

    throw new Error("Registration failed");
  } catch (error) {
    throw (
      error.response?.data || new Error("An error occurred during registration")
    );
  }
};

const authenticate = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/authenticate`, {
      username,
      password,
    });

    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      return response.data;
    }

    throw new Error("Authentication failed");
  } catch (error) {
    throw (
      error.response?.data ||
      new Error("An error occurred during authentication")
    );
  }
};

const logout = () => {
  localStorage.removeItem("token");
};

const getCurrentUser = () => {
  return localStorage.getItem("token");
};

export default {
  register,
  authenticate,
  logout,
  getCurrentUser,
};
