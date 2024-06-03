import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  TextField,
  Button,
  MenuItem,
  Grid,
} from "@mui/material";
import { usePatient } from "../context/PatientContext";

const CreatePatient: React.FC = () => {
  const navigate = useNavigate();
  const { patient, setPatient, resetPatient } = usePatient();
  const [errors, setErrors] = React.useState({
    name: false,
    gender: false,
    age: false,
  });

  const handleCancel = () => {
    resetPatient();
    navigate("/");
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      name: !patient.name,
      gender: !patient.gender,
      age: !patient.age,
    };

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((error) => error);
    if (hasErrors) {
      return;
    }

    navigate("/create-patient-confirm");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPatient((prevPatient) => ({
      ...prevPatient,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: false,
    }));
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Create New Patient
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Name *"
            fullWidth
            name="name"
            value={patient.name}
            onChange={handleChange}
            error={errors.name}
            helperText={errors.name ? "Name is required" : ""}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            select
            label="Gender *"
            fullWidth
            name="gender"
            value={patient.gender}
            onChange={handleChange}
            error={errors.gender}
            helperText={errors.gender ? "Gender is required" : ""}
          >
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Age *"
            fullWidth
            name="age"
            value={patient.age}
            onChange={handleChange}
            error={errors.age}
            helperText={errors.age ? "Age is required" : ""}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Email"
            fullWidth
            name="email"
            value={patient.email}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Phone number"
            fullWidth
            name="phoneNumber"
            value={patient.phoneNumber}
            onChange={handleChange}
          />
        </Grid>
        <Grid
          item
          xs={12}
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <Button variant="contained" color="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={handleNext}>
            Next
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CreatePatient;
