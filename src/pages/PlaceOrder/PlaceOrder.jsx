import React, { useContext, useState } from "react";
import "./Placeorder.css";
import { StoreContext } from "../../context/StoreContext";
import { useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

const stripePromise = loadStripe(
  "pk_test_51QuXT5R0uaflj3LO2TN5p6sf20nJ2ZujBpU19SmOPrFSUKJUsGVPyfLEIDaj3JNogNVcw1Rup2ZMIjYNcdUXhKmB00WbAk7fz5"
);

const PlaceOrder = () => {
  const [deliveryInfo, setDeliveryInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phoneNo: "",
  });

  const [errors, setErrors] = useState({});

  const location = useLocation();

  const { getTotalCartAmount } = useContext(StoreContext);

  const cartData = location.state?.cartData || [];

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setDeliveryInfo((deliveryInfo) => ({ ...deliveryInfo, [name]: value }));
    
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

   // Validation Function
   const validateDeliveryInfo = () => {
    let newErrors = {};
    if (!deliveryInfo.firstName.trim()) newErrors.firstName = "First Name is required.";
    if (!deliveryInfo.lastName.trim()) newErrors.lastName = "Last Name is required.";
    if (!deliveryInfo.street.trim()) newErrors.street = "Street is required.";
    if (!deliveryInfo.city.trim()) newErrors.city = "City is required.";
    if (!deliveryInfo.state.trim()) newErrors.state = "State is required.";
    if (!deliveryInfo.country.trim()) newErrors.country = "Country is required.";
    if (!/^\d{10}$/.test(deliveryInfo.phoneNo)) newErrors.phoneNo = "Enter a valid 10-digit phone number.";
    if (!/^\d{6}$/.test(deliveryInfo.zipCode)) newErrors.zipCode = "Enter a valid Zip Code.";
    if (!/^\S+@\S+\.\S+$/.test(deliveryInfo.email)) newErrors.email = "Enter a valid email.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleDeliveryData = async () => {
    //event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/deliveryData",
        deliveryInfo
      );
      console.log("Response:", response.data);
      if (response.data) {
        setDeliveryInfo({
          firstName: "",
          lastName: "",
          email: "",
          street: "",
          city: "",
          state: "",
          zipCode: "",
          country: "",
          phoneNo: "",
        });
        console.log("inside delivery data");
        
      }
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  //function for stripe xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

  const handleCheckout = async (event) => {
    event.preventDefault();
    if (!validateDeliveryInfo()) return; // Stop if validation fails
    handleDeliveryData();

    const stripe = await stripePromise;

    const response = await fetch(
      "http://localhost:5000/create-checkout-session",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cartItems: cartData }),
      }
    );
    console.log("Stripe Session Response:", response);

    

    const { sessionId } = await response.json();

    if (sessionId) {
      stripe.redirectToCheckout({ sessionId });
    }
  };

  return (
    <form className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <label htmlFor="firstName"></label>
          <input
            type="text"
            id="firstName"
            placeholder="First Name *"
            required
            name="firstName"
            onChange={onChangeHandler}
            value={deliveryInfo.firstName}
          />
          {errors.firstName && <p className="text-red-500">{errors.firstName}</p>}
          <label htmlFor="lastName"></label>
          <input
            type="text"
            id="lastName"
            placeholder="Last Name *"
            required
            name="lastName"
            onChange={onChangeHandler}
            value={deliveryInfo.lastName}
          />
          {errors.lastName && <p className="text-red-500">{errors.lastName}</p>}

        </div>
        <label htmlFor="email"></label>
        <input
          type="email"
          id="email"
          placeholder="Email *"
          required
          name="email"
          onChange={onChangeHandler}
          value={deliveryInfo.email}
        />
        {errors.email && <p className="text-red-500">{errors.email}</p>}

        <label htmlFor="street"></label>
        <input
          type="text"
          id="street"
          placeholder="Street *"
          required
          name="street"
          onChange={onChangeHandler}
          value={deliveryInfo.street}
        />
        {errors.street && <p className="text-red-500">{errors.street}</p>}

        <div className="multi-fields">
          <label htmlFor="city"></label>
          <input
            type="text"
            id="city"
            placeholder="City *"
            required
            name="city"
            onChange={onChangeHandler}
            value={deliveryInfo.city}
          />
          {errors.city && <p className="text-red-500">{errors.city}</p>}

          <label htmlFor="state"></label>
          <input
            type="text"
            id="state"
            placeholder="State *"
            required
            name="state"
            onChange={onChangeHandler}
            value={deliveryInfo.state}
          />
          {errors.state && <p className="text-red-500">{errors.state}</p>}

        </div>
        <div className="multi-fields">
          <label htmlFor="zipCode"></label>
          <input
            type="text"
            id="zipCode"
            placeholder="Zip code *"
            required
            name="zipCode"
            onChange={onChangeHandler}
            value={deliveryInfo.zipCode}
          />
          {errors.zipCode && <p className="text-red-500">{errors.zipCode}</p>}

          <label htmlFor="country"></label>
          <input
            type="text"
            id="country"
            placeholder="Country *"
            required
            name="country"
            onChange={onChangeHandler}
            value={deliveryInfo.country}
          />
        </div>
        <label htmlFor="phoneNo"></label>
        <input
          type="number"
          id="phoneNo"
          placeholder="Phone *"
          required
          name="phoneNo"
          onChange={onChangeHandler}
          value={deliveryInfo.phoneNo}
        />
        {errors.phoneNo && <p className="text-red-500">{errors.phoneNo}</p>}

      </div>
      <div className="place-order-right">
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
          <button onClick={handleCheckout}>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
