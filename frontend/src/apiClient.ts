import axios from "axios";
import { Patient } from "./utils/types";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const ApiClient = {
  getPatients: (page: number, size: number, filters: any) => {
    return api.get("/patients", {
      params: {
        page: page - 1,
        size: size,
        patientId: filters.patientId,
        name: filters.name,
        gender: filters.gender,
        age: filters.age,
        email: filters.email,
        phoneNumber: filters.phoneNumber,
      },
    });
  },

  createPatient: (patient: Patient) => {
    return api.post("/patients", patient);
  },

  updatePatient: (id: number, patient: Patient) => {
    return api.put(`/patients/${id}`, patient);
  },

  deletePatient: (id: number) => {
    return api.delete(`/patients/${id}`);
  },
};

export default ApiClient;
