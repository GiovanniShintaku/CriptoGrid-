import React from 'react';

import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  GlobalStyles,
  GridLegacy as Grid,
  TextField,
  Typography,
} from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import { useState } from "react";
import logo from "@assets/logo.svg";
import { Link } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
  localStorage.setItem("name", name);
  localStorage.setItem("email", email);
  localStorage.setItem("password", password);

  window.location.href = "/login";
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
          <Typography variant="h5" sx={{ color: "#FFFFFF", fontWeight: "bold"}}>Abra sua conta</Typography>

          <Box sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Nome"
                  autoFocus
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Endereço de e-mail"
                  name="email"
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
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Senha"
                  type="password"
                  id="password"
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
              </Grid>
            </Grid>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: "#FF00B8", "&:hover": {backgroundColor: "#D40094"} }}
              onClick={handleRegister}
            >

              Cadastre-se
            </Button>

            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login"
                style={{ color: "#62F7FF", textDecoration: "none"}}
                >Possui uma conta? Faça seu Login</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Register;