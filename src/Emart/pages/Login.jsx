/* eslint-disable react/no-unescaped-entities */
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { auth, fireDB } from "../config/firebase";
import { useMyContext } from "../context/myState";
import { signin } from "../redux/authSlice";

const Login = () => {
  const { loading, setLoading } = useMyContext();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const {
    register,
    getValues,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "user",
    },
    mode: "onTouched",
  });

  const userLoginFunction = async (data) => {
    console.log("clicked");
    setLoading(true);

    try {
      const users = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      const q = query(
        collection(fireDB, "user"),
        where("uid", "==", users.user.uid)
      );

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const loggedInUser = doc.data();
        dispatch(signin({ user: loggedInUser }));
        reset();
        toast.success("Login Successful");
        setLoading(false);
        if (loggedInUser.role === "user") {
          navigate("/user-dashboard");
        } else {
          navigate("/admin-dashboard");
        }
      });
    } catch (error) {
      toast.error("login Failed!");
      setLoading(false);
    }
  };
  return (
    <div className="flex justify-center items-center h-screen">
      {loading && <Loader />}
      {/* Login Form  */}
      <div className="login_Form bg-green-50 px-1 lg:px-8 py-6 border border-green-100 rounded-xl shadow-md">
        {/* Top Heading  */}
        <div className="mb-5">
          <h2 className="text-center text-2xl font-bold text-green-700 ">
            Sign in
          </h2>
        </div>

        {/* Input Two  */}
        <div className="mb-3">
          <input
            type="email"
            placeholder="Email Address"
            className="bg-green-50 border border-green-200 px-2 py-2 w-96 rounded-md outline-none placeholder-green-400"
            {...register("email", {
              required: "Email address is required",
            })}
            data-error={Boolean(errors?.email?.message)}
          />
          {errors?.email?.message && (
            <p className="error-msg text-red-500 text-xl mt-2">
              {errors?.email?.message}
            </p>
          )}
        </div>

        {/* Input Three  */}
        <div className="mb-5">
          <input
            type="password"
            placeholder="Password"
            className="bg-green-50 border border-green-200 px-2 py-2 w-96 rounded-md outline-none placeholder-green-400"
            data-error={Boolean(errors?.password?.message)}
            {...register("password", {
              required: "Password is required.",
            })}
          />
          {errors?.password?.message && (
            <p className="error-msg text-red-500 text-xl mt-2">
              {errors?.password?.message}
            </p>
          )}
        </div>

        {/* Signup Button  */}
        <div className="mb-5">
          <button
            disabled={loading}
            type="button"
            className="bg-green-500 hover:bg-green-600 w-full text-white text-center py-2 font-bold rounded-md "
            onClick={handleSubmit(userLoginFunction)}
          >
            Sign in
          </button>
        </div>

        <div>
          <h2 className="text-black">
            Don't Have an account{" "}
            <Link className=" text-green-700 font-bold" to={"/signup"}>
              Signup
            </Link>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Login;
