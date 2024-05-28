import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Typography, Button, Grid, Paper } from "@mui/material";
import { usePatient } from "../context/PatientContext";
import api from "../api";

const CreatePatientConfirm: React.FC = () => {
  const navigate = useNavigate();
  const { patient } = usePatient();
  const [isSaved, setIsSaved] = useState(false);

  const handleBack = () => {
    navigate("/create-patient");
  };

  const handleSave = async () => {
    try {
      const response = await api.post("/patients", patient);
      console.log("Patient created:", response.data);
      setIsSaved(true);
    } catch (error) {
      console.error("Error creating patient", error);
    }
  };

  const handleGoHome = () => {
    navigate("/");
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
    </Container>
  );
};

export default CreatePatientConfirm;
