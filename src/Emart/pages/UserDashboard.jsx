import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import Layout from "../components/Layout";
import { fireDB } from "../config/firebase";
import { useMyContext } from "../context/myState";
import Loader from "./../components/Loader";

const UserDashboard = () => {
  const { getAllOrders, setGetAllOrders, loading, setLoading } = useMyContext();
  const { user } = useSelector((state) => state.auth);

  const fetchUserOrders = async () => {
    setLoading(true);
    try {
      const q = query(
        collection(fireDB, "orders"),
        orderBy("time", "desc"),
        where("userId", "==", user?.uid)
      );

      const querySnapshot = await getDocs(q);
      let ordersArray = [];
      querySnapshot.forEach((doc) => {
        ordersArray.push({ ...doc.data(), id: doc.id });
      });

      setGetAllOrders(ordersArray);
      setLoading(false);
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserOrders();
  }, [user.uid]);

  return (
    <Layout>
      <div className=" container mx-auto px-4 py-5 lg:py-8">
        {/* Top  */}
        <div className="top ">
          {/* main  */}
          <div className=" bg-green-50 py-5 rounded-xl border border-green-100">
            {/* image  */}
            <div className="flex justify-center">
              <img
                src="https://cdn-icons-png.flaticon.com/128/2202/2202112.png"
                alt=""
              />
            </div>
            {/* text  */}
            <div className="mt-8">
              {/* Name  */}
              <h1 className=" text-center text-3xl capitalize text-green-900">
                <span className=" font-bold ">Name : </span>
                {user?.name}
              </h1>
              {/* Email  */}
              <h1 className=" text-center text-3xl text-green-900 my-3">
                <span className=" font-bold">Email : </span>
                {user?.email}
              </h1>
              {/* Date  */}
              <h1 className=" text-center text-3xl capitalize text-green-900 my-3">
                <span className=" font-bold">Account Opening Date : </span>
                {user?.date}
              </h1>
              {/* Role  */}
              <h1 className=" text-center text-3xl capitalize text-green-900 ">
                <span className=" font-bold">Role : </span>
                {user?.role}
              </h1>
            </div>
          </div>
        </div>
        {/* bottom  */}
        <div className="bottom">
          {/* main 1 */}
          <div className="mx-auto my-4 max-w-6xl px-2 md:my-6 md:px-0">
            {/* text  */}
            <h2 className="text-4xl font-bold text-green-900">Order Details</h2>
            <div className="flex justify-center relative top-10">
              {loading && <Loader />}
            </div>
            {/* main 2 */}
            {getAllOrders.map((order, index) => {
              const {
                address,
                customer,
                date,
                email,
                phone,
                products,
                totalPrice,
                id,
              } = order;
              return (
                <div key={index}>
                  {products.map((item, index) => {
                    // console.log('item', item);
                    const {
                      quantity,
                      price,
                      title,

                      category,
                    } = item;
                    // console.log('order', order)

                    return (
                      <div
                        key={index}
                        className="mt-5 flex flex-col overflow-hidden rounded-xl border border-green-100 md:flex-row"
                      >
                        {/* main 3  */}
                        <div className="w-full border-r border-green-100 bg-green-50 md:max-w-xs">
                          {/* left  */}
                          <div className="p-8">
                            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-1">
                              <div className="mb-4">
                                <div className="text-2xl font-semibold text-green-700">
                                  Order Id
                                </div>
                                <div className="text-xl font-medium text-gray-900">
                                  #{id}
                                </div>
                              </div>
                              <div className="mb-4">
                                <div className="text-2xl text-green-700  font-semibold">
                                  Date
                                </div>
                                <div className="text-xl font-medium text-gray-900">
                                  {date}
                                </div>
                              </div>
                              <div className="mb-4">
                                <div className="text-2xl text-green-700 font-semibold">
                                  Total Amount
                                </div>
                                <div className="text-xl font-medium text-gray-900">
                                  ${parseFloat((quantity * price).toFixed(2))}
                                </div>
                              </div>
                              <div className="mb-4">
                                <div className="text-2xl text-green-700 font-semibold">
                                  Order Status
                                </div>
                                <div className="text-xl font-medium text-gray-900 first-letter:uppercase">
                                  confirmed
                                </div>
                              </div>
                              <div className="mb-4">
                                <div className="text-2xl text-green-700 font-semibold">
                                  Estimated Delivery
                                </div>
                                <div className="text-xl font-medium text-gray-900 first-letter:uppercase">
                                  Within 7 days
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* right  */}
                        <div className="flex-1">
                          <div className="p-8">
                            <ul className="-my-7 divide-y divide-gray-200">
                              <li className="flex flex-col justify-between space-x-5 py-7 md:flex-row">
                                <div className="flex flex-1 items-stretch">
                                  <div className="ml-5 flex flex-col justify-between">
                                    <div className="flex-1">
                                      <p className="text-2xl capitalize font-bold text-gray-900">
                                        {title}
                                      </p>
                                      <p className=" text-xxl font-medium text-gray-800 capitalize mt-2">
                                        {category}
                                      </p>
                                    </div>
                                    <p className="mt-4 text-xxl font-medium text-gray-800">
                                      x {quantity}
                                    </p>
                                  </div>
                                </div>
                                <div className="ml-auto flex flex-col items-end justify-between">
                                  <p className="text-right text-2xl font-bold text-gray-900">
                                    ${price}
                                  </p>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserDashboard;
