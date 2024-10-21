import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import MyAppBar from "./components/MyAppBar";
import ProductTable from "./components/ProductTable";
import { AuthProvider } from "./hooks/AuthProvider";

function App() {
  return (
    <Router>
      <AuthProvider>
        <MyAppBar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<ProductTable />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
