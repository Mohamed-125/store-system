import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "tailwindcss/tailwind.css";
import "react-notifications/lib/notifications.css";
import { NotificationContainer } from "react-notifications";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <NotificationContainer />
      <App />
    </Router>
  </React.StrictMode>
);
