import React, { createContext, useContext, useState, ReactNode } from "react";
import { Patient } from "../utils/types";
interface PatientContextType {
  patient: Patient;
  setPatient: React.Dispatch<React.SetStateAction<Patient>>;
  setEditingPatient: (patient: Patient) => void;
  resetPatient: () => void;
}

const PatientContext = createContext<PatientContextType | undefined>(undefined);

interface PatientProviderProps {
  children: ReactNode;
}

export const PatientProvider: React.FC<PatientProviderProps> = ({
  children,
}) => {
  const [patient, setPatient] = useState<Patient>({
    id: "",
    name: "",
    gender: "",
    age: "",
    email: "",
    phoneNumber: "",
  });

  const setEditingPatient = (patient: Patient) => {
    setPatient(patient);
  };

  const resetPatient = () => {
    setPatient({
      id: "",
      name: "",
      gender: "",
      age: "",
      email: "",
      phoneNumber: "",
    });
  };

  return (
    <PatientContext.Provider
      value={{ patient, setPatient, setEditingPatient, resetPatient }}
    >
      {children}
    </PatientContext.Provider>
  );
};

export const usePatient = () => {
  const context = useContext(PatientContext);
  if (context === undefined) {
    throw new Error("usePatient must be used within a PatientProvider");
  }
  return context;
};
