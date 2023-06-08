import { useContext } from "react";
import useGetDbUser from "../hooks/useGetDbUser";
import { AuthContext } from "../providers/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

const StudentRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [dbUser, isDbLoading] = useGetDbUser();
  const location = useLocation();
  if (loading || isDbLoading) {
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
    </div>;
  }
  if (user && dbUser[0]?.role === "student") {
    return children;
  }
  return <Navigate to="/" state={{ from: location }}></Navigate>;
};

export default StudentRoute;
