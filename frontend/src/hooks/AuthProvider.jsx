// src/hooks/AuthProvider.js
import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState(null);
  const [role, setRole] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const navigate = useNavigate();
  const API_URL = "http://localhost:8080/api/v1/auth";

  const authenticate = async (username, password) => {
    try {
      const response = await axios.post(`${API_URL}/authenticate`, {
        username,
        password,
      });

      if (response.data.token) {
        const decodedToken = jwtDecode(response.data.token);
        setUsername(decodedToken.sub);
        setRole(decodedToken.role);
        setToken(response.data.token);
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

  const register = async (username, password, role) => {
    try {
      const response = await axios.post(`${API_URL}/register`, {
        username,
        password,
        role,
      });

      if (response.data.token) {
        const decodedToken = jwtDecode(response.data.token);
        setUsername(decodedToken.sub);
        setRole(decodedToken.role);
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        return response.data;
      }

      throw new Error("Registration failed");
    } catch (error) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error("An error occurred during registration");
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{ username, role, token, authenticate, register }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
