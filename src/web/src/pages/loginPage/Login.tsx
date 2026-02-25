import React from 'react';

import { LockOutlined } from "@mui/icons-material";
import {
  CssBaseline,
  GlobalStyles,
  Box,
  Avatar,
  Typography,
  TextField,
  Button
} from "@mui/material";
import Grid from '@mui/material/Grid';
import Container from "@mui/material/Container";
import logo from "@assets/logo.svg"
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
    const navigate = useNavigate();

const handleLogin = () => {
  const storedEmail = localStorage.getItem("email");
  const storedPassword = localStorage.getItem("password");

  if (email === storedEmail && password === storedPassword) {
    alert("Login realizado com sucesso!");
    login(email, password);
      navigate("/perfil");
  } else {
    alert("E-mail ou senha incorretos.");
  }
};

  return (
    <>
      <Container maxWidth="xs"
        sx={{
          backgroundColor: "#0F1326",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <CssBaseline />
        <GlobalStyles styles={{ body: { backgroundColor: "#0F1326" } }} />
        <Box
          sx={{
            body: { backgroundColor: "#0F1326"},
            mt: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "#0B0E1A",
            p: 4,
            borderRadius: 3,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#000000", width: 80, height: 80}}>
            <img src={logo} alt="logo" style={{ width: 60, height: 60 }} />
            </Avatar>
          <Typography variant="h5" sx={{color: "#FFFFFF", fontWeight: "bold"}}>Login</Typography>
          <Box sx={{ mt: 1, width: "100%" }}>
            <TextField
              required
              fullWidth
              id="email"
              label="Endereço de e-mail"
              name="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                  backgroundColor: "#D6D6D6",
                  borderRadius: 1,
                  "& .MuiInputBase-input": { color: "#000000" },
                  "& .MuiInputLabel-root": { color: "#FFFFFF" },
                  "& .MuiInputLabel-root.Mui-focused": { color: "#FFFFFF" },
                  "& .MuiOutlinedInput-root.Mui-focused fieldset": {
                  borderColor: "#FF00B8"
                  }
              }}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              name="password"
              label="Senha"
              type="password"
              value={password}
             onChange={(e) => setPassword(e.target.value)}
             sx={{
                  backgroundColor: "#D6D6D6",
                  borderRadius: 1,
                  "& .MuiInputBase-input": { color: "#000000" },
                  "& .MuiInputLabel-root": { color: "#FFFFFF" },
                  "& .MuiInputLabel-root.Mui-focused": { color: "#FFFFFF" },
                  "& .MuiOutlinedInput-root.Mui-focused fieldset": {
                  borderColor: "#FF00B8"
                  }
              }}
            
            />

            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: "#FF00B8", "&:hover": {backgroundColor: "#D40094"}}}
              onClick={handleLogin}
            >
              Login
            </Button>
            <Grid container justifyContent={"flex-end"}>
              <Grid item>
                <Link to="/register" style={{ color: "#62F7FF", textDecoration: "none"}}>Não possui uma conta? Cadastre-se</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Login;