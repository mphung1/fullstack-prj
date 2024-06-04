import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Grid, Button, SelectChangeEvent } from "@mui/material";
import { usePatient } from "../context/PatientContext";
import { Patient } from "../utils/types";
import useKeyPress from "../hooks/useKeyPress";
import ApiClient from "../api/apiClient";
import {
  FilterPanel,
  PatientTable,
  PaginationControl,
  DeleteDialog,
  SnackbarAlert,
} from "../components";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { setEditingPatient } = usePatient();
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  const [selectedId, setSelectedId] = useState<string>("");
  const [patients, setPatients] = useState<Patient[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState("5");
  const pageSizeArray = [5, 10, 15, 20];

  const [filterId, setFilterId] = useState<string>("");
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
    } catch (error: any) {
      if (error.response?.status === 401) {
        navigate("/signin");
      } else {
        console.error("Error fetching patients", error);
      }
    }
  };

  useEffect(() => {
    loadPatients(currentPage, Number(pageSize), {
      id: filterId,
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
    setOpenDeletePopup(true);
  };

  const handleClose = () => {
    setOpenDeletePopup(false);
  };

  const handleConfirmDelete = async () => {
    try {
      await ApiClient.deletePatient(Number(selectedId));
      loadPatients(currentPage, Number(pageSize), {
        id: filterId,
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
      setOpenDeletePopup(false);
    }
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  const applyFilters = () => {
    setCurrentPage(1);
    loadPatients(1, Number(pageSize), {
      id: filterId,
      name: filterName,
      gender: filterGender,
      age: filterAge,
      email: filterEmail,
      phoneNumber: filterPhoneNumber,
    });
  };

  const handlePageSizeChange = (event: SelectChangeEvent<string>) => {
    setPageSize(event.target.value);
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container>
      <FilterPanel
        filterId={filterId}
        filterName={filterName}
        filterGender={filterGender}
        filterAge={filterAge}
        filterEmail={filterEmail}
        filterPhoneNumber={filterPhoneNumber}
        setFilterId={setFilterId}
        setFilterName={setFilterName}
        setFilterGender={setFilterGender}
        setFilterAge={setFilterAge}
        setFilterEmail={setFilterEmail}
        setFilterPhoneNumber={setFilterPhoneNumber}
        applyFilters={applyFilters}
        filterButtonRef={filterButtonRef}
      />
      <PatientTable
        patients={patients}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
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
          <PaginationControl
            pageSize={pageSize}
            pageSizeArray={pageSizeArray}
            totalPages={totalPages}
            currentPage={currentPage}
            handlePageSizeChange={handlePageSizeChange}
            handlePageChange={handlePageChange}
          />
        </Grid>
      </Grid>
      <DeleteDialog
        open={openDeletePopup}
        handleClose={handleClose}
        handleConfirmDelete={handleConfirmDelete}
        selectedId={selectedId}
      />
      <SnackbarAlert
        openSnackbar={openSnackbar}
        handleSnackbarClose={handleSnackbarClose}
        snackbarMessage={snackbarMessage}
        snackbarSeverity={snackbarSeverity}
      />
    </Container>
  );
};

export default Dashboard;
