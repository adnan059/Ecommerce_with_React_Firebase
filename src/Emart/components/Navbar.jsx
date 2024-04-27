import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "../../assets/css/navbar.css";
import { signout } from "../redux/authSlice";
import { clearCart } from "../redux/cartSlice";
import SearchBar from "./SearchBar";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const navList = (
    <ul className="flex space-x-3 text-white font-medium text-md px-5 ">
      {/* Home */}
      <li>
        <Link to={"/"}>Home</Link>
      </li>
      {/* All Product */}
      <li>
        <Link to={"/allproduct"}>All Products</Link>
      </li>
      {/* Sign in */}
      {user ? null : (
        <li>
          <Link to={"/signin"}>Sign-in</Link>
        </li>
      )}
      {/* User */}

      {user?.role === "user" ? (
        <li>
          <Link to={"/user-dashboard"} className="capitalize">
            {user.name}
          </Link>
        </li>
      ) : null}

      {/* Admin */}

      {user?.role === "admin" ? (
        <li>
          <Link to={"/admin-dashboard"} className="capitalize">
            {user.name}
          </Link>
        </li>
      ) : null}

      {/* logout */}
      {user ? (
        <li
          onClick={() => {
            dispatch(signout());
            dispatch(clearCart());
            navigate("/");
          }}
          className="cursor-pointer"
        >
          Sign-Out
        </li>
      ) : null}
      {/* Cart */}

      {cart.length > 0 ? (
        <li>
          <Link to={"/cart"}>Cart ({`${cart.length}`})</Link>
        </li>
      ) : null}
    </ul>
  );
  return (
    <nav className="bg-green-900 sticky top-0">
      {/* main  */}
      <div className="lg:flex lg:justify-between items-center py-3 lg:px-3 ">
        {/* left  */}
        <div className="left py-3 lg:py-0">
          <Link to={"/"}>
            <h2 className=" font-bold text-white text-4xl text-center">
              Emart
            </h2>
          </Link>
        </div>

        {/* right  */}
        <div className="right flex justify-center mb-4 lg:mb-0">{navList}</div>

        {/* Search Bar  */}
        <SearchBar />
      </div>
    </nav>
  );
};

export default Navbar;
