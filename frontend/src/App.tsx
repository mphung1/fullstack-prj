import { Routes, Route } from "react-router-dom";
import {
  Dashboard,
  CreatePatient,
  CreatePatientConfirm,
  EditPatient,
  EditPatientConfirm,
} from "./pages";
import { Header } from "./components";

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
