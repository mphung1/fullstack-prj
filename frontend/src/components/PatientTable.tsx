import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import { Patient } from "../utils/types";
import useRole from "../hooks/useRole";

interface PatientTableProps {
  patients: Patient[];
  handleEdit: (patient: Patient) => void;
  handleDelete: (id: string) => void;
}

const PatientTable: React.FC<PatientTableProps> = ({
  patients,
  handleEdit,
  handleDelete,
}) => {
  const { isAdmin } = useRole();
  return (
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
            {isAdmin && (
              <TableCell sx={{ fontWeight: "bold" }}>ACTIONS</TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {patients.map((patient) => (
            <TableRow key={patient.id}>
              <TableCell>{patient.id}</TableCell>
              <TableCell>{patient.name}</TableCell>
              <TableCell>{patient.gender}</TableCell>
              <TableCell>{patient.age}</TableCell>
              <TableCell>{patient.email}</TableCell>
              <TableCell>{patient.phoneNumber}</TableCell>
              {isAdmin && (
                <TableCell>
                  <Button onClick={() => handleEdit(patient)}>Edit</Button>
                  <Button
                    onClick={() => {
                      if (patient.id) {
                        handleDelete(patient.id);
                      }
                    }}
                  >
                    Delete
                  </Button>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PatientTable;
