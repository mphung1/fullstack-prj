import React, { useState } from "react";
import ApiClient from "../api/apiClient";
import {
  Container,
  TextField,
  Button,
  Typography,
  MenuItem,
} from "@mui/material";

const SignUp: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER");

  const handleSignUp = async () => {
    try {
      await ApiClient.signUp(username, password, role);
      alert("Sign up successful");
    } catch (error) {
      console.error("Sign up error", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Sign Up
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
        <MenuItem value="ADMIN">ADMIN</MenuItem>
      </TextField>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleSignUp}
      >
        Sign Up
      </Button>
    </Container>
  );
};

export default SignUp;
