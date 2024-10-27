// src/hooks/AuthProvider.js
import { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

/**
 * AuthProvider component that provides authentication context to its children.
 * Manages user authentication, registration, and session state.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child components that will have access to the authentication context.
 * @returns {JSX.Element} The rendered AuthProvider component.
 */
export const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState(null);
  const [role, setRole] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      const decodedToken = jwtDecode(storedToken);
      setUsername(decodedToken.sub);
      setRole(decodedToken.role[0].authority); // Adjust this line if the structure is different
      console.log("Role:", decodedToken.role[0].authority);
    }
  }, []);

  /**
   * Authenticates the user using their username and password.
   *
   * @param {string} username - The username of the user.
   * @param {string} password - The password of the user.
   * @returns {Promise<Object>} The response data containing the token and user details.
   * @throws {Error} Throws an error if authentication fails.
   */
  const authenticate = async (username, password) => {
    try {
      const response = await axios.post(`${API_URL}/auth/authenticate`, {
        username,
        password,
      });

      if (response.data.token) {
        const decodedToken = jwtDecode(response.data.token);
        setUsername(decodedToken.sub);
        setRole(decodedToken.role[0].authority);
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

  /**
   * Registers a new user with the specified username, password, and role.
   *
   * @param {string} username - The desired username for the new user.
   * @param {string} password - The password for the new user.
   * @param {string} role - The role of the new user (e.g., 'user', 'admin').
   * @returns {Promise<Object>} The response data containing the token and user details.
   * @throws {Error} Throws an error if registration fails.
   */
  const register = async (username, password, role) => {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, {
        username,
        password,
        role,
      });

      if (response.data.token) {
        const decodedToken = jwtDecode(response.data.token);
        setUsername(decodedToken.sub);
        setRole(decodedToken.role[0].authority);
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

  /**
   * Logs out the user, clearing their authentication data.
   */
  const logout = () => {
    setUsername(null);
    setRole(null);
    setToken("");
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{ username, role, token, authenticate, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Custom hook to access the authentication context.
 *
 * @returns {Object} The authentication context values.
 */
export const useAuth = () => useContext(AuthContext);
