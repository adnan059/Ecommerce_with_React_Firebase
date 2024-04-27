import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { useEffect } from "react";
import "../../assets/css/productcard.css";
import { fireDB } from "../config/firebase";
import { useMyContext } from "../context/myState";
import Loader from "./Loader";
import ProductCard from "./ProductCard";

const HomePageProductCard = () => {
  const { getAllProducts, setGetAllProducts, loading, setLoading } =
    useMyContext();

  const fetchAllProducts = async () => {
    setLoading(true);
    try {
      const q = query(
        collection(fireDB, "products"),
        orderBy("time", "desc"),
        limit(8)
      );

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
    <div className="mt-20">
      {/* Heading  */}
      <div className="">
        <h1 className=" text-center text-green-900 mb-5 text-4xl font-semibold">
          Latest Products
        </h1>
      </div>

      {/* main  */}
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-5 mx-auto">
          <div className="flex justify-center">{loading && <Loader />}</div>
          <div className="flex flex-wrap -m-4">
            {getAllProducts.map((item, index) => {
              return <ProductCard key={index} item={item} />;
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePageProductCard;
