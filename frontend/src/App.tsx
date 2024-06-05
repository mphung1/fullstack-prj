import { Routes, Route, Navigate } from "react-router-dom";
import {
  Dashboard,
  CreatePatient,
  CreatePatientConfirm,
  EditPatient,
  EditPatientConfirm,
  SignIn,
  SignUp,
} from "./pages";
import { Header } from "./components";
import useRole from "./hooks/useRole";
import { useAuth } from "./context/AuthContext";

function App() {
  const { isAuthenticated } = useAuth();
  const { isAdmin } = useRole();

  // console.log(isAuthenticated, isAdmin);

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        {isAuthenticated && isAdmin && (
          <>
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
          </>
        )}
        {!isAuthenticated && (
          <>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </>
        )}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
