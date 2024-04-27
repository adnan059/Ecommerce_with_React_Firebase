import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { fireDB } from "../config/firebase";
import { useMyContext } from "../context/myState";

const OrderDetail = () => {
  const { getAllOrders, setGetAllOrders, loading, setLoading } = useMyContext();

  const fetchAllOrders = async () => {
    setLoading(true);
    try {
      const ordersRef = collection(fireDB, "orders");

      const q = query(ordersRef, orderBy("time", "desc"));

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
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Do you want to delete this order?")) {
      setLoading(true);
      try {
        await deleteDoc(doc(fireDB, "orders", id));
        const filteredOrders = getAllOrders.filter((order) => order.id !== id);
        setGetAllOrders(filteredOrders);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    } else {
      return;
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);
  // console.log(getAllOrder)
  return (
    <div>
      <div>
        <div className="py-5">
          {/* text  */}
          <h1 className=" text-xl text-green-300 font-bold">All Order</h1>
        </div>

        {/* table  */}
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border border-collapse sm:border-separate border-green-100 text-green-400">
            <tbody>
              <tr>
                <th
                  scope="col"
                  className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-green-100 text-green-900 bg-slate-100"
                >
                  Order Id
                </th>

                <th
                  scope="col"
                  className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-green-100 text-green-900 bg-slate-100"
                >
                  Title
                </th>

                <th
                  scope="col"
                  className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-green-100 text-green-900 bg-slate-100"
                >
                  Category
                </th>

                <th
                  scope="col"
                  className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-green-100 text-green-900 bg-slate-100"
                >
                  Price
                </th>

                <th
                  scope="col"
                  className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-green-100 text-green-900 bg-slate-100"
                >
                  Quantity
                </th>

                <th
                  scope="col"
                  className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-green-100 text-green-900 bg-slate-100"
                >
                  Total Price
                </th>

                <th
                  scope="col"
                  className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-green-100 text-green-900 bg-slate-100"
                >
                  Status
                </th>

                <th
                  scope="col"
                  className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-green-100 text-green-900 bg-slate-100"
                >
                  Customer
                </th>

                <th
                  scope="col"
                  className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-green-100 text-green-900 bg-slate-100"
                >
                  Address
                </th>

                <th
                  scope="col"
                  className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-green-100 text-green-900 bg-slate-100"
                >
                  Phone Number
                </th>

                <th
                  scope="col"
                  className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-green-100 text-green-900 bg-slate-100"
                >
                  Email
                </th>

                <th
                  scope="col"
                  className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-green-100 text-green-900 bg-slate-100"
                >
                  Date
                </th>

                <th
                  scope="col"
                  className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-green-100 text-green-900 bg-slate-100"
                >
                  Action
                </th>
              </tr>
              {getAllOrders?.map((order) => {
                return (
                  <>
                    {order?.products?.map((item, index) => {
                      const { title, category, price, quantity } = item;
                      return (
                        <tr key={index} className="text-green-300">
                          <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-green-100 stroke-slate-500 text-green-700 ">
                            {order.id}
                          </td>

                          <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-green-100 stroke-slate-500 text-green-700 first-letter:uppercase ">
                            {title}
                          </td>

                          <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-green-100 stroke-slate-500 text-green-700 first-letter:uppercase ">
                            {category}
                          </td>

                          <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-green-100 stroke-slate-500 text-green-700 first-letter:uppercase ">
                            ${price}
                          </td>

                          <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-green-100 stroke-slate-500 text-green-700 first-letter:uppercase ">
                            {quantity}
                          </td>

                          <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-green-100 stroke-slate-500 text-green-700 first-letter:uppercase ">
                            ${parseFloat((price * quantity).toFixed(2))}
                          </td>

                          <td className="h-12 px-6 text-md transition duration-300 border-t border-l  first:border-l-0 border-green-100 stroke-slate-500 text-green-700 first-letter:uppercase ">
                            Confirmed
                          </td>

                          <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-green-100 stroke-slate-500 text-green-700 first-letter:uppercase ">
                            {order.customer}
                          </td>

                          <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-green-100 stroke-slate-500 text-green-700 first-letter:uppercase ">
                            {order.address}
                          </td>

                          <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-green-100 stroke-slate-500 text-green-700 first-letter:uppercase ">
                            {order.phone}
                          </td>

                          <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-green-100 stroke-slate-500 text-green-700 ">
                            {order.email}
                          </td>

                          <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-green-100 stroke-slate-500 text-green-700 first-letter:uppercase ">
                            {order.date}
                          </td>

                          <td
                            className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-green-100 stroke-slate-500 text-red-500 cursor-pointer "
                            onClick={() => handleDelete(order.id)}
                          >
                            Delete
                          </td>
                        </tr>
                      );
                    })}
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
