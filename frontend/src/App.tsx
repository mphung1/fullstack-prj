import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import {
  Dashboard,
  CreatePatient,
  CreatePatientConfirm,
  EditPatient,
  EditPatientConfirm,
} from "./pages";
import { Header } from "./components";
import { SignUp, SignIn } from "./pages";
import { useAuth } from "./context/AuthContext";

const ProtectedRoute: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Outlet /> : <Navigate to="/signin" />;
};

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<ProtectedRoute />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/create-patient" element={<CreatePatient />} />
          <Route
            path="/create-patient-confirm"
            element={<CreatePatientConfirm />}
          />
          <Route path="/edit-patient" element={<EditPatient />} />
          <Route
            path="/edit-patient-confirm"
            element={<EditPatientConfirm />}
          />
        </Route>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </div>
  );
}

export default App;
