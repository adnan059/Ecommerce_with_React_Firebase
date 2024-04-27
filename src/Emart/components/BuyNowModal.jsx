import { Button, Dialog, DialogBody } from "@material-tailwind/react";
import { addDoc, collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fireDB } from "../config/firebase";
import { useMyContext } from "../context/myState";
import { clearCart } from "../redux/cartSlice";

const BuyNowModal = () => {
  const [open, setOpen] = useState(false);
  const { loading, setLoading } = useMyContext();
  const { user } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  const { totalPrice } = useSelector((state) => state.cart);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [orderInfo, setOrderInfo] = useState({
    customer: user.name,
    email: user.email,
    userId: user.uid,
    address: "",
    phone: "",
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
    time: Date.now(),
    totalPrice: totalPrice,
  });

  const {
    register,

    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "onTouched", defaultValues: orderInfo });

  const buyNowFunction = async (data) => {
    handleOpen();
    orderInfo.customer = data.customer;
    orderInfo.address = data.address;
    orderInfo.phone = data.phone;
    setLoading(true);
    try {
      const orderRef = collection(fireDB, "orders");
      await addDoc(orderRef, orderInfo);
      reset();
      //setOrderInfo({ ...orderInfo, phone: "", address: "" });
      // console.log("Order Info after Order Placement", orderInfo);
      setLoading(false);
      toast.success("Order Placed Successfully");
      dispatch(clearCart());
      navigate("/user-dashboard");
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    setOrderInfo({
      ...orderInfo,
      products: cart.map((item) => ({
        title: item.title,
        price: item.price,
        category: item.category,
        quantity: item.quantity,
      })),
      totalPrice: totalPrice,
    });
  }, [cart, totalPrice]);

  const handleOpen = () => setOpen(!open);
  return (
    <>
      <Button
        type="button"
        onClick={handleOpen}
        className="w-full px-4 text-2xl py-3 text-center text-gray-100 bg-green-600 border border-transparent dark:border-gray-700 hover:border-green-500 hover:text-green-700 hover:bg-green-100 rounded-xl"
      >
        Buy now
      </Button>

      <Dialog open={open} handler={handleOpen} className=" bg-green-50">
        <DialogBody className="">
          <div className="mb-3">
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              className="bg-green-50 border border-green-200 px-2 py-2 w-full rounded-md outline-none text-3xl text-green-700 placeholder-green-700 capitalize"
              data-error={Boolean(errors?.customer?.message)}
              {...register("customer", {
                required: "Full name is required",
                maxLength: {
                  value: 30,
                  message: "Not more than 30 characters is allowed",
                },
                minLength: {
                  value: 2,
                  message: "Not less than 2 characters is allowed",
                },
              })}
            />
            {errors?.customer?.message && (
              <p className="error-msg text-red-500 text-xl mt-2">
                {errors?.customer?.message}
              </p>
            )}
          </div>
          <div className="mb-3">
            <input
              type="text"
              name="address"
              placeholder="Enter your address"
              className="bg-green-50 border border-green-200 px-2 py-2 w-full rounded-md outline-none text-3xl text-green-700 placeholder-green-700"
              data-error={Boolean(errors?.address?.message)}
              {...register("address", {
                required: "Address is required",
                maxLength: {
                  value: 50,
                  message: "Not more than 50 characters is allowed",
                },
                minLength: {
                  value: 5,
                  message: "Not less than 5 characters is allowed",
                },
              })}
            />
            {errors?.address?.message && (
              <p className="error-msg text-red-500 text-xl mt-2">
                {errors?.address?.message}
              </p>
            )}
          </div>

          <div className="mb-3">
            <input
              type="text"
              name="phone"
              placeholder="Enter this demo phone number : +123456"
              className="bg-green-50 border border-green-200 px-2 py-2 w-full rounded-md outline-none text-green-700 text-3xl placeholder-green-700"
              data-error={Boolean(errors?.phone?.message)}
              {...register("phone", {
                required: "Phone number is required",
                pattern: {
                  value: /^\+\d{6}$/,
                  message: "It is not a valid phone number",
                },
              })}
            />
            {errors?.phone?.message && (
              <p className="error-msg text-red-500 text-xl mt-2">
                {errors?.phone?.message}
              </p>
            )}
          </div>

          <div className="mb-3">
            <input
              type="text"
              name="paymentMethod"
              placeholder="Payment Method: Cash on Delivery"
              className="bg-green-50 border border-green-200 px-2 py-2 w-full rounded-md outline-none text-3xl text-green-600 placeholder-green-700"
              readOnly={true}
            />
          </div>

          <div className="">
            <Button
              type="button"
              onClick={handleSubmit(buyNowFunction)}
              disabled={loading}
              className="w-full px-4 py-3 text-center text-gray-100 bg-green-600 border border-transparent text-2xl dark:border-gray-700 rounded-lg"
            >
              Confirm
            </Button>
          </div>
        </DialogBody>
      </Dialog>
    </>
  );
};

export default BuyNowModal;
