// src/App.tsx
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import CreatePatient from "./components/CreatePatient";
import CreatePatientConfirm from "./components/CreatePatientConfirm";
import EditPatient from "./components/EditPatient";
import EditPatientConfirm from "./components/EditPatientConfirm";
import Header from "./components/Header";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/create-patient" element={<CreatePatient />} />
        <Route
          path="/create-patient-confirm"
          element={<CreatePatientConfirm />}
        />
        <Route path="/edit-patient" element={<EditPatient />} />
        <Route path="/edit-patient-confirm" element={<EditPatientConfirm />} />
      </Routes>
    </div>
  );
}

export default App;
