import { doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { fireDB } from "../config/firebase";
import { useMyContext } from "../context/myState";

const categoryList = [
  {
    name: "fashion",
  },
  {
    name: "shirt",
  },
  {
    name: "jacket",
  },
  {
    name: "mobile",
  },
  {
    name: "laptop",
  },
  {
    name: "shoes",
  },
  {
    name: "home",
  },
  {
    name: "books",
  },
];

const UpdateProductPage = () => {
  const { state } = useLocation();
  const { loading, setLoading } = useMyContext();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    title: state.title,
    price: state.price,
    productImageUrl: state.productImageUrl,
    category: state.category,
    description: state.description,
    time: Date.now(),
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  });

  const updateProduct = async () => {
    if (
      product.title === "" ||
      product.price === "" ||
      product.productImageUrl === "" ||
      product.category === "" ||
      product.description === ""
    ) {
      return toast.error("All the fields must be filled out");
    }

    product.price = parseFloat(product.price);

    setLoading(true);
    try {
      const productRef = doc(fireDB, "products", state.id);
      await updateDoc(productRef, product);
      setLoading(false);
      navigate("/admin-dashboard");
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center h-screen">
        {/* Login Form  */}
        <div className="login_Form bg-green-50 px-8 py-6 border border-green-100 rounded-xl shadow-md">
          {/* Top Heading  */}
          <div className="mb-5">
            <h2 className="text-center text-2xl font-bold text-green-500 ">
              Update Product
            </h2>
          </div>

          {/* Input One  */}
          <div className="mb-3">
            <input
              type="text"
              name="title"
              placeholder="Product Title"
              className="bg-green-50 border text-green-300 border-green-200 px-2 py-2 w-96 rounded-md outline-none placeholder-green-300"
              value={product.title}
              onChange={(e) =>
                setProduct({ ...product, title: e.target.value })
              }
            />
          </div>

          {/* Input Two  */}
          <div className="mb-3">
            <input
              type="number"
              name="price"
              placeholder="Product Price"
              className="bg-green-50 border text-green-300 border-green-200 px-2 py-2 w-96 rounded-md outline-none placeholder-green-300"
              value={product.price}
              onChange={(e) =>
                setProduct({ ...product, price: e.target.value })
              }
            />
          </div>

          {/* Input Three  */}
          <div className="mb-3">
            <input
              type="text"
              name="productImageUrl"
              placeholder="Product Image Url"
              className="bg-green-50 border text-green-300 border-green-200 px-2 py-2 w-96 rounded-md outline-none placeholder-green-300"
              value={product.productImageUrl}
              onChange={(e) =>
                setProduct({ ...product, productImageUrl: e.target.value })
              }
            />
          </div>

          {/* Input Four  */}
          <div className="mb-3">
            <select
              value={product.category}
              onChange={(e) =>
                setProduct({ ...product, category: e.target.value })
              }
              className="w-full px-1 py-2 text-green-300 bg-green-50 border border-green-200 rounded-md outline-none  "
            >
              <option disabled>Select Product Category</option>
              {categoryList.map((value, index) => {
                const { name } = value;
                return (
                  <option
                    className=" first-letter:uppercase"
                    key={index}
                    value={name}
                  >
                    {name}
                  </option>
                );
              })}
            </select>
          </div>

          {/* Input Five  */}
          <div className="mb-3">
            <textarea
              value={product.description}
              onChange={(e) =>
                setProduct({ ...product, description: e.target.value })
              }
              name="description"
              placeholder="Product Description"
              rows="5"
              className=" w-full px-2 py-1 text-green-300 bg-green-50 border border-green-200 rounded-md outline-none placeholder-green-300 "
            ></textarea>
          </div>

          {/* Update Product Button  */}
          <div className="mb-3">
            <button
              onClick={updateProduct}
              disabled={loading}
              type="button"
              className="bg-green-500 hover:bg-green-600 w-full text-white text-center py-2 font-bold rounded-md "
            >
              Update Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProductPage;
