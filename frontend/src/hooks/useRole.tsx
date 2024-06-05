import { useAuth } from "../context/AuthContext";

const useRole = () => {
  const { userRole } = useAuth();

  return {
    userRole,
    isAdmin: userRole === "ADMIN",
  };
};

export default useRole;
