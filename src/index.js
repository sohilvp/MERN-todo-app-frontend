import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthContext from "./context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  
    <BrowserRouter>
      <AuthContext>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </AuthContext>
    </BrowserRouter>
  
);
