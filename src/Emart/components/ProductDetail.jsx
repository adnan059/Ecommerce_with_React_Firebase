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
import { Link, useNavigate } from "react-router-dom";
import { fireDB } from "../config/firebase";
import { useMyContext } from "../context/myState";
import Loader from "./Loader";

const ProductDetail = () => {
  const { loading, setLoading, getAllProducts, setGetAllProducts } =
    useMyContext();
  // console.log(getAllProduct)
  const navigate = useNavigate();

  // ************** Get All Products ********************
  const fetchAllProducts = async () => {
    setLoading(true);
    try {
      const q = query(collection(fireDB, "products"), orderBy("time", "desc"));

      const querySnapshot = await getDocs(q);
      let productsArray = [];
      querySnapshot.forEach((doc) => {
        productsArray.push({ id: doc.id, ...doc.data() });
      });
      setGetAllProducts(productsArray);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  // ********************** Delete Product **********************
  const deleteProduct = async (id) => {
    if (window.confirm("Do you really want to delete this item?")) {
      setLoading(true);
      try {
        await deleteDoc(doc(fireDB, "products", id));
        const filteredProducts = getAllProducts.filter((doc) => doc.id !== id);
        setGetAllProducts(filteredProducts);
        setLoading(false);
        toast.success("Product Deleted Successfully");
      } catch (error) {
        toast.error(error.message);
        setLoading(false);
      }
    } else {
      return;
    }
  };

  return (
    <div>
      <div className="py-5 flex justify-between items-center">
        {/* text  */}
        <h1 className=" text-xl text-green-300 font-bold">All Product</h1>
        {/* Add Product Button  */}
        <Link to={"/addproduct"}>
          <button className="px-5 py-2 bg-green-50 border border-green-100 rounded-lg">
            Add Product
          </button>
        </Link>
      </div>

      {/* Loading  */}
      <div className="flex justify-center relative top-20">
        {loading && <Loader />}
      </div>

      {/* table  */}
      <div className="w-full overflow-x-auto mb-5">
        <table className="w-full text-left border border-collapse sm:border-separate border-green-100 text-green-400">
          <tbody>
            <tr>
              <th
                scope="col"
                className="h-12 px-6 text-md border-l first:border-l-0 border-green-100 text-slate-700 bg-slate-100 font-bold fontPara"
              >
                S.No.
              </th>
              <th
                scope="col"
                className="h-12 px-6 text-md border-l first:border-l-0 border-green-100 text-slate-700 bg-slate-100 font-bold fontPara"
              >
                Image
              </th>
              <th
                scope="col"
                className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-green-100 text-slate-700 bg-slate-100"
              >
                Title
              </th>
              <th
                scope="col"
                className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-green-100 text-slate-700 bg-slate-100"
              >
                Price
              </th>
              <th
                scope="col"
                className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-green-100 text-slate-700 bg-slate-100"
              >
                Category
              </th>
              <th
                scope="col"
                className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-green-100 text-slate-700 bg-slate-100"
              >
                {" "}
                Date
              </th>
              <th
                scope="col"
                className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-green-100 text-slate-700 bg-slate-100"
              >
                Action
              </th>
              <th
                scope="col"
                className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-green-100 text-slate-700 bg-slate-100"
              >
                Action
              </th>
            </tr>
            {getAllProducts?.map((item, index) => {
              const {
                id,
                title,
                price,
                category,
                date,
                productImageUrl,
                description,
              } = item;
              return (
                <tr key={index} className="text-green-300">
                  <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-green-100 stroke-slate-500 text-slate-500 ">
                    {index + 1}.
                  </td>
                  <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-green-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                    <div className="flex justify-center">
                      <img className="w-20 " src={productImageUrl} alt="" />
                    </div>
                  </td>
                  <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-green-100 stroke-slate-500 text-slate-500 capitalize ">
                    {title}
                  </td>
                  <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-green-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                    ${price}
                  </td>
                  <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-green-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                    {category}
                  </td>
                  <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-green-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                    {date}
                  </td>
                  <td
                    className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-green-100 stroke-slate-500 text-slate-500 text-green-500 cursor-pointer "
                    onClick={() =>
                      navigate("/updateproduct/" + id, {
                        state: {
                          id,
                          title,
                          price,
                          category,
                          productImageUrl,
                          description,
                        },
                      })
                    }
                  >
                    Edit
                  </td>
                  <td
                    className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-green-100 stroke-slate-500 text-slate-500 text-red-500 cursor-pointer "
                    onClick={() => deleteProduct(id)}
                  >
                    Delete
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductDetail;
