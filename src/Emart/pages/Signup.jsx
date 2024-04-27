/* eslint-disable react/no-unescaped-entities */
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { auth, fireDB } from "../config/firebase";
import { useMyContext } from "../context/myState";
import { signup } from "../redux/authSlice";
import Loader from "./../components/Loader";

const Signup = () => {
  const { loading, setLoading } = useMyContext();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const [userSignup, setUserSignup] = useState({
  //   name: "",
  //   email: "",
  //   password: "",
  //   role: "user",
  // });

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

  // ********* User Signup Function ***********

  const userSignupFunction = async (data) => {
    setLoading(true);
    try {
      const users = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      console.log(users);

      const user = {
        name: data.name,
        email: users.user.email,
        uid: users.user.uid,
        role: data.role,
        date: new Date().toLocaleString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
      };

      const userReference = collection(fireDB, "user");

      await addDoc(userReference, user);

      dispatch(signup({ user }));

      //setUserSignup({ name: "", password: "", email: "" });

      reset();
      toast.success("Signup Successful");
      setLoading(false);
      navigate("/user-dashboard");
    } catch (error) {
      toast.error("Sign up failed!");

      setLoading(false);
    }
  };

  // ============== Final Return =============
  return (
    <div className="flex justify-center items-center h-screen">
      {loading && <Loader />}
      {/* Signup Form  */}
      <div className="login_Form bg-green-50 px-1 lg:px-8 py-6 border border-green-100 rounded-xl shadow-md">
        {/* Top Heading  */}
        <div className="mb-5">
          <h2 className="text-center text-2xl font-bold text-green-700 ">
            Signup
          </h2>
        </div>

        {/* Input One  */}
        <div className="mb-3">
          <input
            type="text"
            placeholder="Full Name"
            className="bg-green-50 border border-green-200 px-2 py-2 w-96 rounded-md outline-none placeholder-green-400"
            data-error={Boolean(errors?.name?.message)}
            {...register("name", {
              required: "Full name is required",
              maxLength: {
                value: 20,
                message: "Not more than 20 characters is allowed",
              },
              minLength: {
                value: 2,
                message: "Not less than 2 characters is allowed",
              },
            })}
          />
          {errors?.name?.message && (
            <p className="error-msg text-red-500 text-xl mt-2">
              {errors?.name?.message}
            </p>
          )}
        </div>

        {/* Input Two  */}
        <div className="mb-3">
          <input
            type="email"
            placeholder="Email Address"
            className="bg-green-50 border border-green-200 px-2 py-2 w-96 rounded-md outline-none placeholder-green-400"
            {...register("email", {
              required: "Email address is required",
              pattern: {
                value:
                  /^[a-zA-Z0-9]+([-_\.]?[a-zA-Z0-9]+[_]?){1,}@([a-zA-Z0-9]{2,}\.){1,}[a-zA-Z]{2,4}$/,
                message: "This is not a valid email address",
              },
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
              pattern: {
                value:
                  /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
                message:
                  "Min 8 Chars: upperCase, lowerCase, number/special Char ",
              },
            })}
          />
          {errors?.password?.message && (
            <p className="error-msg text-red-500 text-xl mt-2 w-80">
              {errors?.password?.message}
            </p>
          )}
        </div>

        {/* Signup Button  */}
        <div className="mb-5">
          <button
            onClick={handleSubmit(userSignupFunction)}
            type="button"
            disabled={loading}
            className="bg-green-500 hover:bg-green-600 w-full text-white text-center py-2 font-bold rounded-md "
          >
            Signup
          </button>
        </div>

        <div>
          <h2 className="text-black">
            Have an account{" "}
            <Link className=" text-green-700 font-bold" to={"/signin"}>
              Sign in
            </Link>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Signup;
