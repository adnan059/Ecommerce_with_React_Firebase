import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

export const ProtectedRouteForAdmin = () => {
  const { user } = useSelector((state) => state.auth);

  return user?.role === "admin" ? <Outlet /> : <Navigate to="/" />;
};
