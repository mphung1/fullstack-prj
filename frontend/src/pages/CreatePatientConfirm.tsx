import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Typography, Button, Grid, Paper } from "@mui/material";
import { usePatient } from "../context/PatientContext";
import ApiClient from "../api/apiClient";
import axios from "axios";
import SnackbarAlert from "../components/SnackbarAlert";

const CreatePatientConfirm: React.FC = () => {
  const navigate = useNavigate();
  const { patient } = usePatient();
  const [isSaved, setIsSaved] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const handleBack = () => {
    navigate("/create-patient");
  };

  const validatePhoneNumber = (phoneNumber: string) => {
    const phoneRegex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;
    return (
      phoneNumber === null || phoneNumber === "" || phoneRegex.test(phoneNumber)
    );
  };

  const handleSave = async () => {
    if (!validatePhoneNumber(patient.phoneNumber!)) {
      setSnackbarMessage("Phone number must contain only numeric characters");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      return;
    }

    try {
      const response = await ApiClient.createPatient(patient);
      console.log("Patient created:", response.data);
      setIsSaved(true);
      setSnackbarMessage("Patient created successfully!");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setSnackbarMessage(
          "Error creating patient: " + (error.response?.data || error.message)
        );
      } else {
        setSnackbarMessage("Error creating patient: " + String(error));
      }
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      console.error("Error creating patient", error);
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
          Congrats! Patient was created
        </Typography>
        <Button variant="contained" color="primary" onClick={handleGoHome}>
          Go Home
        </Button>
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Confirm New Patient
      </Typography>
      <Paper style={{ padding: "20px" }}>
        <Typography variant="h6">Name*: {patient.name}</Typography>
        <Typography variant="h6">Gender*: {patient.gender}</Typography>
        <Typography variant="h6">Age*: {patient.age}</Typography>
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
      <SnackbarAlert
        openSnackbar={openSnackbar}
        handleSnackbarClose={handleSnackbarClose}
        snackbarMessage={snackbarMessage}
        snackbarSeverity={snackbarSeverity}
      />
    </Container>
  );
};

export default CreatePatientConfirm;
