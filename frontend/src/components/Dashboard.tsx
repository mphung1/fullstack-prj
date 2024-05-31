import React, { useState, useEffect, useRef } from "react";
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
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import { usePatient } from "../context/PatientContext";
import { Patient } from "../utils/types";
import useKeyPress from "../hooks/useKeyPress";
import ApiClient from "../apiClient";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { setEditingPatient } = usePatient();
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string>("");
  const [patients, setPatients] = useState<Patient[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState("5");
  const pageSizeArray = [5, 10, 15, 20];

  const [filterPatientId, setFilterPatientId] = useState<string>("");
  const [filterName, setFilterName] = useState<string>("");
  const [filterGender, setFilterGender] = useState<string>("");
  const [filterAge, setFilterAge] = useState<string>("");
  const [filterEmail, setFilterEmail] = useState<string>("");
  const [filterPhoneNumber, setFilterPhoneNumber] = useState<string>("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const filterButtonRef = useRef<HTMLButtonElement>(null);

  useKeyPress("Enter", () => {
    if (filterButtonRef.current) {
      filterButtonRef.current.click();
    }
  });

  const loadPatients = async (page: number, size: number, filters: any) => {
    try {
      const response = await ApiClient.getPatients(page, size, filters);
      setPatients(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching patients", error);
    }
  };

  useEffect(() => {
    loadPatients(currentPage, Number(pageSize), {
      patientId: filterPatientId,
      name: filterName,
      gender: filterGender,
      age: filterAge,
      email: filterEmail,
      phoneNumber: filterPhoneNumber,
    });
  }, [pageSize, currentPage]);

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
      await ApiClient.deletePatient(Number(selectedId));
      loadPatients(currentPage, Number(pageSize), {
        patientId: filterPatientId,
        name: filterName,
        gender: filterGender,
        age: filterAge,
        email: filterEmail,
        phoneNumber: filterPhoneNumber,
      });
      setSnackbarMessage("Patient deleted successfully!");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
    } catch (error: any) {
      console.error("Error deleting patient", error);
      setSnackbarMessage(
        "Error deleting patient: " + (error.response?.data || error.message)
      );
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
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

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    filterSetter: React.Dispatch<React.SetStateAction<string>>
  ) => {
    filterSetter(e.target.value);
  };

  const applyFilters = () => {
    setCurrentPage(1);
    loadPatients(1, Number(pageSize), {
      patientId: filterPatientId,
      name: filterName,
      gender: filterGender,
      age: filterAge,
      email: filterEmail,
      phoneNumber: filterPhoneNumber,
    });
  };

  const handlePageSizeChange = (event: SelectChangeEvent) => {
    setPageSize(event.target.value);
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container>
      <Grid
        container
        spacing={2}
        alignItems="center"
        justifyContent="space-between"
        style={{ marginTop: "20px" }}
      >
        <Grid item xs={12} sm={2}>
          <TextField
            label="Patient ID"
            value={filterPatientId}
            onChange={(e) => handleFilterChange(e, setFilterPatientId)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <TextField
            label="Name"
            value={filterName}
            onChange={(e) => handleFilterChange(e, setFilterName)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <TextField
            select
            label="Gender"
            value={filterGender}
            onChange={(e) => handleFilterChange(e, setFilterGender)}
            fullWidth
          >
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={2}>
          <TextField
            label="Age"
            value={filterAge}
            onChange={(e) => handleFilterChange(e, setFilterAge)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <TextField
            label="Email"
            value={filterEmail}
            onChange={(e) => handleFilterChange(e, setFilterEmail)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <TextField
            label="Phone Number"
            value={filterPhoneNumber}
            onChange={(e) => handleFilterChange(e, setFilterPhoneNumber)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={1}>
          <Button
            ref={filterButtonRef}
            variant="contained"
            color="primary"
            onClick={applyFilters}
          >
            Filter
          </Button>
        </Grid>
      </Grid>
      <TableContainer component={Paper} style={{ marginTop: "20px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>ID</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>NAME</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>GENDER</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>AGE</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>EMAIL</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>PHONE NUMBER</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>ACTIONS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {patients.map((patient) => (
              <TableRow key={patient.patientId}>
                <TableCell>{patient.patientId}</TableCell>
                <TableCell>{patient.name}</TableCell>
                <TableCell>{patient.gender}</TableCell>
                <TableCell>{patient.age}</TableCell>
                <TableCell>{patient.email}</TableCell>
                <TableCell>{patient.phoneNumber}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEdit(patient)}>Edit</Button>
                  <Button
                    onClick={() => {
                      if (patient.patientId) {
                        handleDelete(patient.patientId);
                      }
                    }}
                  >
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
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-filled-label">
                Page size
              </InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={pageSize}
                onChange={handlePageSizeChange}
              >
                {pageSizeArray.map((val) => (
                  <MenuItem key={val} value={val}>
                    {val}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              variant="outlined"
              color="primary"
              sx={{ m: 1 }}
            />
          </Box>
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

export default Dashboard;
