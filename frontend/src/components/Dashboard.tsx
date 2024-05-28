import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  Pagination,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { usePatient } from "../context/PatientContext";
import api from "../api";
import { Patient } from "../utils/types";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { setEditingPatient } = usePatient();
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [patients, setPatients] = useState<Patient[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const patientsPerPage = 4; // Number of patients per page

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await api.get("/patients");
        const sortedPatients = response.data.sort(
          (a: Patient, b: Patient) => Number(a.patientId) - Number(b.patientId)
        );
        setPatients(sortedPatients);
      } catch (error) {
        console.error("Error fetching patients", error);
      }
    };

    fetchPatients();
  }, []);

  const handleCreatePatient = () => {
    navigate("/create-patient");
  };

  const handleEdit = (patient: any) => {
    setEditingPatient(patient);
    navigate("/edit-patient");
  };

  const handleDelete = (id: string) => {
    setSelectedId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirmDelete = async () => {
    try {
      await api.delete(`/patients/${selectedId}`);
      setPatients((prevPatients) =>
        prevPatients.filter((patient) => patient.patientId !== selectedId)
      );
    } catch (error) {
      console.error("Error deleting patient", error);
    } finally {
      setOpen(false);
    }
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  const indexOfLastPatient = currentPage * patientsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
  const currentPatients = patients.slice(
    indexOfFirstPatient,
    indexOfLastPatient
  );

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Patient Dashboard
      </Typography>
      <Grid
        container
        spacing={2}
        alignItems="center"
        justifyContent="space-between"
        style={{ marginBottom: "20px" }}
      >
        <Grid item>
          <Button
            variant="text"
            style={{ backgroundColor: "white", color: "black" }}
          >
            PatientID
          </Button>
          <Button
            variant="text"
            style={{ backgroundColor: "white", color: "black" }}
          >
            Name
          </Button>
          <Button
            variant="text"
            style={{ backgroundColor: "white", color: "black" }}
          >
            Gender
          </Button>
          <Button
            variant="text"
            style={{ backgroundColor: "white", color: "black" }}
          >
            Age
          </Button>
          <Button
            variant="text"
            style={{ backgroundColor: "white", color: "black" }}
          >
            Email
          </Button>
          <Button
            variant="text"
            style={{ backgroundColor: "white", color: "black" }}
          >
            Phone number
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            style={{ backgroundColor: "black", color: "white" }}
          >
            Filter
          </Button>
        </Grid>
      </Grid>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>PatientID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone number</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentPatients.map((patient) => (
              <TableRow key={patient.patientId}>
                <TableCell>{patient.patientId}</TableCell>
                <TableCell>{patient.name}</TableCell>
                <TableCell>{patient.gender}</TableCell>
                <TableCell>{patient.age}</TableCell>
                <TableCell>{patient.email}</TableCell>
                <TableCell>{patient.phoneNumber}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEdit(patient)}>Edit</Button>
                  <Button onClick={() => handleDelete(patient.patientId)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid
        container
        spacing={2}
        alignItems="center"
        justifyContent="space-between"
        style={{ marginTop: "20px" }}
      >
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreatePatient}
          >
            Create Patient
          </Button>
        </Grid>
        <Grid item>
          <Pagination
            count={Math.ceil(patients.length / patientsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            variant="outlined"
            color="primary"
          />
        </Grid>
      </Grid>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Delete Patient</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Do you want to delete patient with id {selectedId}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="primary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Dashboard;
