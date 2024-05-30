import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Button,
  Grid,
  Paper,
  Snackbar,
  Alert,
} from "@mui/material";
import { usePatient } from "../context/PatientContext";
import api from "../api";
import axios, { AxiosError } from "axios";

const EditPatientConfirm: React.FC = () => {
  const navigate = useNavigate();
  const { patient } = usePatient();
  const [isSaved, setIsSaved] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const handleBack = () => {
    navigate("/edit-patient");
  };

  const handleSave = async () => {
    try {
      const response = await api.put(`/patients/${patient.patientId}`, patient);
      console.log("Patient updated:", response.data);
      setIsSaved(true);
      setSnackbarMessage("Patient updated successfully!");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setSnackbarMessage(
          "Error updating patient: " + (error.response?.data || error.message)
        );
      } else {
        setSnackbarMessage("Error updating patient: " + String(error));
      }
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      console.error("Error updating patient", error);
    }
  };

  const handleGoHome = () => {
    navigate("/");
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  if (isSaved) {
    return (
      <Container>
        <Typography variant="h4" gutterBottom>
          Congrats! Patient was edited
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleGoHome}
          style={{ marginTop: "20px" }}
        >
          Go Home
        </Button>
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Confirm Edited Patient
      </Typography>
      <Paper style={{ padding: "20px" }}>
        <Typography variant="h6">Name: {patient.name}</Typography>
        <Typography variant="h6">Gender: {patient.gender}</Typography>
        <Typography variant="h6">Age: {patient.age}</Typography>
        <Typography variant="h6">Email: {patient.email}</Typography>
        <Typography variant="h6">
          Phone number: {patient.phoneNumber}
        </Typography>
      </Paper>
      <Grid
        container
        spacing={2}
        style={{ marginTop: "20px" }}
        justifyContent="space-between"
      >
        <Grid item>
          <Button variant="contained" color="secondary" onClick={handleBack}>
            Back
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save
          </Button>
        </Grid>
      </Grid>
      <Snackbar
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
    </Container>
  );
};

export default EditPatientConfirm;
