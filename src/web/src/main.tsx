import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/App";
import "@/styles/global.css";
import { FavoritesProvider } from "@/context/FavoritesContext";
import { AuthProvider } from "@/context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthProvider>
  <FavoritesProvider> 
  
    <App />
  
  </FavoritesProvider>
  </AuthProvider>
);