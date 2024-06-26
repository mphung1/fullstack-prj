import axios from "axios";
import { Patient } from "../utils/types";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const ApiClient = {
  signUp: (username: string, password: string, role: string) => {
    return api.post("/api/v1/auth/signup", { username, password, role });
  },

  signIn: (username: string, password: string) => {
    return api.post("/api/v1/auth/signin", { username, password });
  },

  logout: () => {
    return api.post("/api/v1/auth/logout");
  },

  getPatients: (page: number, size: number, filters: Patient) => {
    return api.get("/patients", {
      params: {
        page: page - 1,
        size: size,
        id: filters.id,
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
