// src/context/PatientContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

interface Patient {
  patientId: string;
  name: string;
  gender: string;
  age: string;
  email: string;
  phoneNumber: string;
}

interface PatientContextType {
  patient: Patient;
  setPatient: React.Dispatch<React.SetStateAction<Patient>>;
  setEditingPatient: (patient: Patient) => void;
}

const PatientContext = createContext<PatientContextType | undefined>(undefined);

interface PatientProviderProps {
  children: ReactNode;
}

export const PatientProvider: React.FC<PatientProviderProps> = ({
  children,
}) => {
  const [patient, setPatient] = useState<Patient>({
    patientId: "",
    name: "",
    gender: "",
    age: "",
    email: "",
    phoneNumber: "",
  });

  const setEditingPatient = (patient: Patient) => {
    setPatient(patient);
  };

  return (
    <PatientContext.Provider value={{ patient, setPatient, setEditingPatient }}>
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
