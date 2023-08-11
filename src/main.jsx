import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "tailwindcss/tailwind.css";
import "react-notifications/lib/notifications.css";
import { NotificationContainer } from "react-notifications";
// import UserContext from "./UserContext";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthContextProvider } from "./components/context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
    <AuthContextProvider>
      <NotificationContainer />
      <App />
    </AuthContextProvider>
    </Router>
  </React.StrictMode>
);
