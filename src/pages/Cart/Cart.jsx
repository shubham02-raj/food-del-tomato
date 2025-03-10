import React, { useContext, useEffect, useState } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cartData, setCartData] = useState([]);

  const { cartItems, list, removeFromCart, getTotalCartAmount } =
    useContext(StoreContext);

  const navigate = useNavigate();

  useEffect(() => {
    updatedCart();
  }, [cartItems]);

  const updatedCart = () => {
    const keys = Object.keys(cartItems);
    let arr = [];
    arr = list.filter((item) => keys.includes(item.id));
    console.log(arr.length);
    console.log("testing keys ", keys);

    setCartData((prev) => [
      ...prev, // Keep existing cart items
      ...arr.map((item) => ({
        name: item.data.name,
        price: item.data.price,
        quantity: cartItems[item.id],
      })),
    ]);
  };

  const goToCheckoutPage = () => {
    navigate("/order", { state: { cartData } });
  };

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {list.map((item, index) => {
          if (cartItems[item.id] > 0) {
            return (
              <div key={index}>
                <div className="cart-items-title cart-items-item">
                  <img src={item.image} alt="" />
                  <p>{item.data.name}</p>
                  <p>${item.data.price}</p>
                  <p>{cartItems[item.id]}</p>
                  <p>${item.data.price * cartItems[item.id]}</p>
                  <p onClick={() => removeFromCart(item.id)} className="cross">
                    x
                  </p>
                </div>
                <hr />
              </div>
            );
          }
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>
                ${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}
              </b>
            </div>
          </div>
          <button onClick={goToCheckoutPage}>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have promocode, enter it here</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder="PROMOCODE" />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
