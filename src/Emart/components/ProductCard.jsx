import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart, deleteFromCart } from "../redux/cartSlice";

const ProductCard = ({ item }) => {
  const navigate = useNavigate();
  const { cart } = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  return (
    <div className="p-4 w-full md:w-1/4">
      <div className="h-full border border-gray-300 rounded-xl overflow-hidden shadow-md cursor-pointer bg-gray-200">
        <img
          className="lg:h-80  h-96 w-full object-cover"
          src={item.productImageUrl}
          alt="blog"
          onClick={() =>
            navigate("/productinfo/" + item.id, { state: { item } })
          }
        />
        <div className="p-6">
          <h2 className="tracking-widest text-lg title-font font-medium text-gray-700 mb-1">
            Emart
          </h2>
          <h1 className="title-font text-xl font-medium text-gray-900 mb-3 capitalize">
            {item.title.substring(0, 25)}
          </h1>
          <h1 className="title-font text-xl font-medium text-gray-900 mb-3">
            ${item.price}
          </h1>

          <div className="flex justify-center ">
            {cart.some((product) => product.id === item.id) ? (
              <button
                className=" bg-red-900 hover:bg-red-600 w-full text-white py-[4px] rounded-lg font-bold"
                onClick={() => dispatch(deleteFromCart({ item }))}
              >
                Delete From Cart
              </button>
            ) : (
              <button
                className=" bg-green-900 hover:bg-green-600 w-full text-white py-[4px] rounded-lg font-bold"
                onClick={() => dispatch(addToCart({ item }))}
              >
                Add To Cart
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
