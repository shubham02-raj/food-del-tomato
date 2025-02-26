import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { HashRouter as Router } from "react-router-dom";
import StoreContextProvider from "./context/StoreContext.jsx";

createRoot(document.getElementById("root")).render(
  <HashRouter>
    <Router>
      <StoreContextProvider>
        <App />
      </StoreContextProvider>
    </Router>
  </HashRouter>
);
