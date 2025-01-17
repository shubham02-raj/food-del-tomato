import { createContext, useEffect, useState } from "react";
// import { food_list } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
  const [cartItems, setCartItem] = useState({});
  const [list, setList] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");

  const fetchList = async () => {
    const response = await axios.get("http://localhost:8000/productData");
    console.log(response.data);

    if (response.data) {
      setList(response.data);
    } else {
      toast.error("Error");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const addToCart = (itemId) => {

    if (!cartItems[itemId]) {
      setCartItem((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
  };

  const removeFromCart = (itemId) => {
    setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = list.find((product) => product.id === item);
        totalAmount += itemInfo.data.price * cartItems[item];
      }
    }
    return totalAmount;
  };

  return (
    <StoreContext.Provider
      value={{
        list,
        cartItems,
        setCartItem,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
