import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import Layout from "../components/Layout";
import Loader from "../components/Loader";
import ProductCard from "../components/ProductCard";
import { fireDB } from "../config/firebase";
import { useMyContext } from "../context/myState";

const AllProduct = () => {
  const navigate = useNavigate();

  const { getAllProducts, setGetAllProducts, loading, setLoading } =
    useMyContext();

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

  return (
    <Layout>
      <div className="py-8">
        {/* Heading  */}
        <div className="">
          <h1 className=" text-center mb-5 text-5xl font-semibold text-green-900">
            All Products
          </h1>
        </div>

        {/* main  */}
        <section className="text-gray-600 body-font">
          <div className="container px-5 lg:px-0 py-5 mx-auto">
            <div className="flex justify-center">{loading && <Loader />}</div>
            <div className="flex flex-wrap -m-4">
              {getAllProducts.map((item, index) => {
                return <ProductCard key={index} item={item} />;
              })}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default AllProduct;
