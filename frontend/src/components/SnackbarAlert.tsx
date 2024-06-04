import React from "react";
import { Snackbar, Alert } from "@mui/material";

interface SnackbarAlertProps {
  openSnackbar: boolean;
  handleSnackbarClose: () => void;
  snackbarMessage: string;
  snackbarSeverity: "success" | "error";
}

const SnackbarAlert: React.FC<SnackbarAlertProps> = ({
  openSnackbar,
  handleSnackbarClose,
  snackbarMessage,
  snackbarSeverity,
}) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={openSnackbar}
      autoHideDuration={6000}
      onClose={handleSnackbarClose}
    >
      <Alert
        onClose={handleSnackbarClose}
        severity={snackbarSeverity}
        sx={{ width: "100%" }}
      >
        {snackbarMessage}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarAlert;
