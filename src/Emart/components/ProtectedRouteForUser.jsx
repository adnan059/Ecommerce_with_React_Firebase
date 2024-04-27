/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

const ProtectedRouteForUser = () => {
  const { user } = useSelector((state) => state.auth);

  return user?.role === "user" ? <Outlet /> : <Navigate to="/signin" />;
};

export default ProtectedRouteForUser;
