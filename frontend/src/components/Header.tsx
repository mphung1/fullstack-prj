import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/signin");
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
