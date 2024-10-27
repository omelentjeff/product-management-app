import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

/**
 * Entry point of the application.
 *
 * This file initializes the React application by rendering the
 * main App component inside a StrictMode wrapper to help
 * identify potential problems in the application.
 */
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
