import React, { createContext, useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { Snackbar, Alert } from "@mui/material";
import Cookies from "js-cookie";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
  showMessage: (message: string, severity: "success" | "error") => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!Cookies.get("token")
  );
  const [snackbar, setSnackbar] = useState<{
    message: string;
    severity: "success" | "error";
  } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleStorageChange = () => {
      const token = Cookies.get("token");
      if (!token) {
        setIsAuthenticated(false);
        navigate("/signin");
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [navigate]);

  const login = (token: string) => {
    Cookies.set("token", token, {
      expires: 7,
      secure: true,
      sameSite: "strict",
    });
    setIsAuthenticated(true);
    showMessage("Login successful", "success");
  };

  const logout = () => {
    Cookies.remove("token");
    setIsAuthenticated(false);
    navigate("/signin");
    showMessage("Logged out successfully", "success");
  };

  const showMessage = (message: string, severity: "success" | "error") => {
    setSnackbar({ message, severity });
  };

  const handleSnackbarClose = () => {
    setSnackbar(null);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, showMessage }}
    >
      {children}
      {snackbar && (
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={true}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          key={"top" + "right"}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity={snackbar.severity}
            sx={{ width: "100%" }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
