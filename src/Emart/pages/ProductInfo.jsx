import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Layout from "../components/Layout";
import { addToCart, deleteFromCart } from "../redux/cartSlice";

const ProductInfo = () => {
  const { cart } = useSelector((state) => state.cart);
  const { state } = useLocation();
  const { item } = state;
  const dispatch = useDispatch();

  return (
    <Layout>
      <section className="py-5 lg:py-16 font-poppins dark:bg-gray-800">
        <div className="max-w-6xl px-4 mx-auto mt-20">
          <div className="flex flex-wrap mb-24 -mx-4">
            <div className="w-full px-4 mb-8 md:w-1/2 md:mb-0">
              <div>
                <div className="border-solid border-2 border-green-500 p-5">
                  <img
                    className=" w-80 rounded-lg object-cover mx-auto "
                    src={item.productImageUrl}
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div className="w-full px-4 md:w-1/2">
              <div className="lg:pl-20">
                <div className="mb-6 ">
                  <h2 className="max-w-xl mb-6 text-xl font-semibold leading-loose tracking-wide text-gray-700 md:text-2xl dark:text-gray-300 capitalize">
                    {item.title}
                  </h2>

                  <p className="inline-block text-2xl font-semibold text-gray-700 dark:text-gray-400 ">
                    <span>${item.price}</span>
                  </p>
                </div>
                <div className="mb-6">
                  <h2 className="mb-2 text-lg font-bold text-gray-700 dark:text-gray-400">
                    Description :
                  </h2>
                  <p>{item.description}</p>
                </div>

                <div className="mb-6 " />
                <div className="flex flex-wrap items-center mb-6">
                  {cart.some((product) => product.id === item.id) ? (
                    <button
                      className="w-full px-4 py-3 text-center text-red-600 bg-red-100 border border-red-600  hover:bg-red-600 hover:text-gray-100 rounded-xl"
                      onClick={() => dispatch(deleteFromCart({ item }))}
                    >
                      Delete From Cart
                    </button>
                  ) : (
                    <button
                      className="w-full px-4 py-3 text-center text-green-600 bg-green-100 border border-green-600  hover:bg-green-600 hover:text-gray-100 rounded-xl"
                      onClick={() => dispatch(addToCart({ item }))}
                    >
                      Add to cart
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProductInfo;
