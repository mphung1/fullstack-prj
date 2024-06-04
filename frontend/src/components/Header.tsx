import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ApiClient from "../api/apiClient";

const Header: React.FC = () => {
  const { isAuthenticated, logout, showMessage } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await ApiClient.logout();
      logout();
      showMessage("Logged out successfully", "success");
      navigate("/signin");
    } catch (error) {
      showMessage("Logout error: Unable to logout", "error");
      console.error("Logout error", error);
    }
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          VINBRAIN
        </Typography>
        {!isAuthenticated ? (
          <>
            <Button color="inherit" component={RouterLink} to="/signup">
              Sign Up
            </Button>
            <Button color="inherit" component={RouterLink} to="/signin">
              Sign In
            </Button>
          </>
        ) : (
          <Button color="inherit" onClick={handleLogout}>
            Log Out
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
