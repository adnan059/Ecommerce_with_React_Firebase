import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import BuyNowModal from "../components/BuyNowModal";
import Layout from "../components/Layout";
import {
  decCartQty,
  deleteFromCart,
  incCartQty,
  totalPriceSetter,
} from "../redux/cartSlice";

const CartPage = () => {
  const { user } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);

  const [totalItems, setTotalItems] = useState();
  const [totalPrice, setTotalPrice] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const deleteItem = (item) => {
    if (window.confirm("Do you want to remove this item?")) {
      dispatch(deleteFromCart({ item }));
    } else {
      return;
    }
  };

  useEffect(() => {
    if (cart.length < 1) {
      navigate("/");
    }
  }, [cart]);

  const priceCalculation = () => {
    if (cart.length > 0) {
      const itemQty = cart
        ?.map((item) => item.quantity)
        ?.reduce((t, v) => t + v);
      setTotalItems(itemQty);

      const priceTotal = cart
        ?.map((item) => {
          const quantity = parseFloat(item.quantity);
          const price = parseFloat(item.price);
          const totalPrice = parseFloat(quantity * price);

          return totalPrice;
        })
        ?.reduce((t, v) => parseFloat((t + v).toFixed(2)), 10);

      setTotalPrice(priceTotal);
      dispatch(totalPriceSetter({ totalPrice: priceTotal }));
    } else {
      return;
    }
  };
  useEffect(() => {
    priceCalculation();
  }, [cart]);

  return (
    <Layout>
      <div className="container mx-auto px-4 max-w-7xl lg:px-0">
        <div className="mx-auto max-w-2xl py-8 lg:max-w-7xl">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 ">
            Shopping Cart
          </h1>
          <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
            <section
              aria-labelledby="cart-heading"
              className="rounded-lg bg-white lg:col-span-8"
            >
              <ul role="list" className="divide-y divide-gray-200">
                {cart.length > 0 ? (
                  <>
                    {cart.map((item, index) => {
                      const {
                        id,
                        title,
                        price,
                        productImageUrl,
                        quantity,
                        category,
                      } = item;
                      return (
                        <div key={index} className="">
                          <li className="flex py-6 sm:py-6 ">
                            <div className="flex-shrink-0">
                              <img
                                src={productImageUrl}
                                alt="img"
                                className="sm:h-38 sm:w-38 h-24 w-24 rounded-md object-contain object-center"
                              />
                            </div>

                            <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                              <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                                <div>
                                  <div className="flex justify-between">
                                    <h3 className="text-sm">
                                      <div className="font-semibold text-3xl text-green-700 capitalize">
                                        {title}
                                      </div>
                                    </h3>
                                  </div>
                                  <div className="mt-1 flex text-sm">
                                    <p className="text-gray-700 text-2xl my-2 capitalize">
                                      {category}
                                    </p>
                                  </div>
                                  <div className="mt-1 flex items-end">
                                    <p className="text-3xl font-medium text-gray-900">
                                      $
                                      {parseFloat(
                                        (price * quantity).toFixed(2)
                                      )}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>
                          <div className="mb-2 flex items-center">
                            <div className="min-w-24 flex">
                              <button
                                onClick={() => dispatch(decCartQty({ id }))}
                                type="button"
                                className="h-7 w-7"
                              >
                                -
                              </button>
                              <input
                                value={quantity}
                                className="mx-1 h-7 w-9 rounded-md border text-center"
                              />

                              <button
                                type="button"
                                className="flex h-7 w-7 items-center justify-center"
                                onClick={() => dispatch(incCartQty({ id }))}
                              >
                                +
                              </button>
                            </div>
                            <div className="ml-6 flex text-xl items-center">
                              <button
                                type="button"
                                className="flex items-center space-x-1 px-2 py-1 pl-0"
                                onClick={() => deleteItem(item)}
                              >
                                <i className="fa-regular fa-trash-can text-red-500 text-3xl"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </>
                ) : (
                  <h1>Not Found</h1>
                )}
              </ul>
            </section>
            {/* Order summary */}
            <section
              aria-labelledby="summary-heading"
              className="mt-16 rounded-md bg-white lg:col-span-4 lg:mt-0 lg:p-0"
            >
              <h2
                id="summary-heading"
                className=" border-b border-gray-200 px-4 py-3 text-4xl font-bold text-gray-900 sm:p-4 "
              >
                Price Details
              </h2>
              <div>
                <dl className=" space-y-1 px-2 py-4">
                  <div className="flex items-center justify-between">
                    <dt className="text-3xl text-gray-800">
                      Price ({`${totalItems}`} items)
                    </dt>
                    <dd className="text-3xl font-medium text-gray-900">
                      ${parseFloat((totalPrice - 10).toFixed(2))}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between py-4">
                    <dt className="flex text-3xl text-gray-800">
                      <span>Delivery Charge</span>
                    </dt>
                    <dd className="text-3xl font-medium text-green-700">$10</dd>
                  </div>

                  <div className="flex items-center justify-between border-y border-dashed py-4 ">
                    <dt className="text-3xl font-medium text-gray-900">
                      Total Amount
                    </dt>
                    <dd className="text-3xl font-medium text-gray-900">
                      $ {totalPrice}
                    </dd>
                  </div>
                </dl>
                <div className="px-2 pb-4 font-medium text-green-700">
                  <div className="flex gap-4 mb-6">
                    {user ? (
                      <BuyNowModal />
                    ) : (
                      <Link
                        to="/signin"
                        className="mx-auto bg-green-500 text-white px-3 py-1 rounded-lg"
                      >
                        Sign in to Buy
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </section>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
