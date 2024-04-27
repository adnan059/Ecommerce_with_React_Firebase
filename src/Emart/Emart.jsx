import "../assets/css/emart.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Toaster } from "react-hot-toast";
import { ProtectedRouteForAdmin } from "./components/ProtectedRouteForAdmin";
import ProtectedRouteForAuth from "./components/ProtectedRouteForAuth";
import ProtectedRouteForUser from "./components/ProtectedRouteForUser";
import ScrollTop from "./components/ScrollTop";
import AddProductPage from "./pages/AddProductPage";
import AdminDashboard from "./pages/AdminDashboard";
import AllProduct from "./pages/AllProduct";
import CartPage from "./pages/CartPage";
import CategoryPage from "./pages/CategoryPage";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NoPage from "./pages/NoPage";
import ProductInfo from "./pages/ProductInfo";
import Signup from "./pages/Signup";
import UpdateProductPage from "./pages/UpdateProductPage";
import UserDashboard from "./pages/UserDashboard";

const Emart = () => {
  return (
    <>
      <BrowserRouter>
        <ScrollTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/*" element={<NoPage />} />
          <Route path="/productinfo/:id" element={<ProductInfo />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/allproduct" element={<AllProduct />} />
          <Route path="/category/:categoryname" element={<CategoryPage />} />
          <Route path="/*" element={<ProtectedRouteForAuth />}>
            <Route path="signup" element={<Signup />} />
            <Route path="signin" element={<Login />} />
          </Route>
          <Route path="/*" element={<ProtectedRouteForUser />}>
            <Route path="user-dashboard" element={<UserDashboard />} />
          </Route>

          <Route path="/*" element={<ProtectedRouteForAdmin />}>
            <Route path="admin-dashboard" element={<AdminDashboard />} />
            <Route path="addproduct" element={<AddProductPage />} />
            <Route path="updateproduct/:id" element={<UpdateProductPage />} />
          </Route>
        </Routes>
        <Toaster />
      </BrowserRouter>
    </>
  );
};

export default Emart;
