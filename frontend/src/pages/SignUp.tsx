import React, { useState } from "react";
import ApiClient from "../api/apiClient";
import {
  Container,
  TextField,
  Button,
  Typography,
  MenuItem,
} from "@mui/material";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER");
  const { showMessage } = useAuth();
  const navigate = useNavigate();

  const handleSignUp = async (event?: React.FormEvent) => {
    if (event) event.preventDefault();
    try {
      await ApiClient.signUp(username, password, role);
      showMessage("Sign up successful", "success");
      navigate("signin");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        showMessage(`Sign up error: ${error.response.data}`, "error");
      } else if (error instanceof Error) {
        showMessage(`Sign up error: ${error.message}`, "error");
      } else {
        showMessage("Sign up error: An unknown error occurred", "error");
      }
      console.error("Sign up error", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Sign Up
      </Typography>
      <form onSubmit={handleSignUp}>
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
        <TextField
          select
          label="Role"
          variant="outlined"
          fullWidth
          margin="normal"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <MenuItem value="USER">USER</MenuItem>
          {/*<MenuItem value="ADMIN">ADMIN</MenuItem>*/}
        </TextField>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Sign Up
        </Button>
      </form>
    </Container>
  );
};

export default SignUp;
