import { Navigate } from "react-router-dom";

import { useGetLoggedUserQuery } from "../redux/features/baseApi";
const ProtectedRoute = ({ children }) => {
    const {data:userData, isLoading} = useGetLoggedUserQuery();
//   const [role, isLoading] = useRole();
console.log({userData})

  if (isLoading) return "Loading"
  if (userData.email === "admin@gmail.com") return children;
//   if (role === "admin") return children;
  return <Navigate to="/" />;
};

export default ProtectedRoute;