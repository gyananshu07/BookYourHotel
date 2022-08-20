import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { SearchContextProvider } from "./context/SearchContext";
import { AuthContextProvider } from "./context/AuthContext";
import { DarkModeContextProvider } from "./context/context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <SearchContextProvider>
        <DarkModeContextProvider>
          <App />
        </DarkModeContextProvider>
      </SearchContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
