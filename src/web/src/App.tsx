import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "@pages/Home";
import Perfil from "@pages/Profile";
import CoinScreen from "@pages/Coin_Screen";
import ProtectedRoute from "@/components/ProtectedRoute";

import Login from "@pages/loginPage/Login";
import Register from "@pages/loginPage/Register";

import { getCoins } from "@/api/api";
import { ThemeProvider, createTheme } from "@mui/material/styles";


export default function App() {

    const theme = createTheme();
  useEffect(() => {
    getCoins()
      .then((data) => console.log("✅ API respondeu:", data))
      .catch((err) => console.error("❌ Erro na API:", err));
  }, []);

  return (
     
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/perfil"
               element={
                   <ProtectedRoute>
                       <Perfil />
                   </ProtectedRoute>
                  }
        />
        <Route path="/coin/:id" element={<CoinScreen />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register />} />
      </Routes>
          </BrowserRouter>
     
  );
}