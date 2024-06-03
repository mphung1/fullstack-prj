import React, { useState } from "react";
import ApiClient from "../api/apiClient";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Container, TextField, Button, Typography } from "@mui/material";

const SignIn: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const handleSignIn = async () => {
    try {
      const response = await ApiClient.signIn(username, password);
      login(response.data.accessToken);
      const from = location.state?.from?.pathname || "/";
      navigate(from);
    } catch (error) {
      console.error("Sign in error", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Sign In
      </Typography>
      <TextField
        label="Username"
        variant="outlined"
        fullWidth
        margin="normal"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        fullWidth
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleSignIn}
      >
        Sign In
      </Button>
    </Container>
  );
};

export default SignIn;
