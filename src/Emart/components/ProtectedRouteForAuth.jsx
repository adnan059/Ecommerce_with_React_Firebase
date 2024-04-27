import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRouteForAuth = () => {
  const { user } = useSelector((state) => state.auth);
  return user ? <Navigate to="/" /> : <Outlet />;
};

export default ProtectedRouteForAuth;
