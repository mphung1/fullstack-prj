import React from "react";
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

const EditPatient: React.FC = () => {
  const navigate = useNavigate();
  const { patient, setPatient } = usePatient();

  const handleCancel = () => {
    navigate("/");
  };

  const handleNext = () => {
    navigate("/edit-patient-confirm");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPatient((prevPatient) => ({
      ...prevPatient,
      [name]: value,
    }));
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Edit Patient
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Name"
            fullWidth
            name="name"
            value={patient.name}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            select
            label="Gender"
            fullWidth
            name="gender"
            value={patient.gender}
            onChange={handleChange}
          >
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Age"
            fullWidth
            name="age"
            value={patient.age}
            onChange={handleChange}
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

export default EditPatient;
