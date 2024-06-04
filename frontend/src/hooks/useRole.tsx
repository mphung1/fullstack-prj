import Cookies from "js-cookie";
import { useEffect, useState } from "react";

enum USER_ROLE {
  USER = "USER",
  ADMIN = "ADMIN",
}

const useRole = () => {
  const [userRole, setUserRole] = useState<USER_ROLE | null>(null);

  useEffect(() => {
    const storedUserRole = Cookies.get("role");
    if (storedUserRole) {
      const role = storedUserRole.toUpperCase();
      if (role === USER_ROLE.USER || role === USER_ROLE.ADMIN) {
        setUserRole(role as USER_ROLE);
      } else {
        console.error(`Unknown user role: ${storedUserRole}`);
      }
    }
  }, []);

  return {
    userRole,
    isAdmin: userRole === USER_ROLE.ADMIN,
  };
};

export default useRole;
