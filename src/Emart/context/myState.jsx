import { createContext, useContext, useState } from "react";

const MyContext = createContext();

const MyState = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [getAllProducts, setGetAllProducts] = useState([]);
  const [getAllOrders, setGetAllOrders] = useState([]);
  const [getAllUsers, setGetAllUsers] = useState([]);

  return (
    <MyContext.Provider
      value={{
        loading,
        setLoading,
        getAllProducts,
        setGetAllProducts,
        getAllOrders,
        setGetAllOrders,
        getAllUsers,
        setGetAllUsers,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

const useMyContext = () => {
  return useContext(MyContext);
};

export { MyState, useMyContext };
