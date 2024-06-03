import { Routes, Route, Navigate } from "react-router-dom";
import {
  Dashboard,
  CreatePatient,
  CreatePatientConfirm,
  EditPatient,
  EditPatientConfirm,
  Login,
} from "./pages";
import { Header } from "./components";
import { useAuth } from "./context/AuthContext";

const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { token } = useAuth();
  if (!token) {
    return <Navigate to="/login" />;
  }
  return children;
};

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-patient"
          element={
            <ProtectedRoute>
              <CreatePatient />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-patient-confirm"
          element={
            <ProtectedRoute>
              <CreatePatientConfirm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-patient"
          element={
            <ProtectedRoute>
              <EditPatient />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-patient-confirm"
          element={
            <ProtectedRoute>
              <EditPatientConfirm />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
