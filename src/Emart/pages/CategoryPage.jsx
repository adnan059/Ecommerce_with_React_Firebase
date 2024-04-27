import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router";
import Layout from "../components/Layout";
import Loader from "../components/Loader";
import ProductCard from "../components/ProductCard";
import { fireDB } from "../config/firebase";
import { useMyContext } from "../context/myState";

const CategoryPage = () => {
  const { categoryname } = useParams();

  const { getAllProducts, setGetAllProducts, loading, setLoading } =
    useMyContext();

  const fetchCategoryProducts = async () => {
    setLoading(true);
    try {
      const q = query(
        collection(fireDB, "products"),
        orderBy("time", "desc"),
        where("category", "==", categoryname)
      );

      const querySnapshot = await getDocs(q);
      let productsArray = [];
      querySnapshot.forEach((doc) => {
        productsArray.push({ id: doc.id, ...doc.data() });
      });
      setGetAllProducts(productsArray);
      setLoading(false);
    } catch (error) {
      toast.error(error.message);
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryProducts();
  }, []);

  // console.log(filterProduct)
  return (
    <Layout>
      <div className="mt-10">
        {/* Heading  */}
        <div className="">
          <h1 className=" text-center mb-5 text-5xl text-green-900 font-semibold first-letter:uppercase">
            {categoryname}
          </h1>
        </div>

        {loading ? (
          <div className="flex justify-center">
            <Loader />
          </div>
        ) : (
          <section className="text-gray-600 body-font">
            {/* main 2 */}
            <div className="container px-5 py-5 mx-auto">
              {/* main 3  */}
              <div className="flex flex-wrap -m-4 justify-center">
                {getAllProducts.length > 0 ? (
                  <>
                    {getAllProducts.map((item, index) => {
                      return <ProductCard key={index} item={item} />;
                    })}
                  </>
                ) : (
                  <div>
                    <div className="flex justify-center">
                      <img
                        className=" mb-2"
                        src="https://cdn-icons-png.flaticon.com/128/2748/2748614.png"
                        alt=""
                      />
                    </div>
                    <h1 className=" text-black text-xl">
                      No {categoryname} product found
                    </h1>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
};

export default CategoryPage;
