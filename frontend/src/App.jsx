import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import MyAppBar from "./components/MyAppBar";
import ProductTable from "./components/ProductTable";
import { AuthProvider } from "./hooks/AuthProvider";
import NotFound from "./components/NotFound";

/**
 * Main application component.
 *
 * This component sets up the routing for the application using React Router.
 * It wraps the entire app in the AuthProvider for managing authentication state
 * and provides the main navigation bar.
 *
 * @returns {JSX.Element} The main application structure.
 */
function App() {
  return (
    <Router>
      <AuthProvider>
        <MyAppBar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<ProductTable />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
