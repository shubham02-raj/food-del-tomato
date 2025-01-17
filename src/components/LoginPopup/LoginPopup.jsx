import React, { useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const LoginPopup = ({ setShowLogin, setIsAdmin }) => {
  const [currentState, setCurrentState] = useState("Login");
  const [loggedInUser, setLoggedInUser] = useState({});
  const [usersData, setUsersData] = useState([]);
  const [loginData, setLoginData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const navigate = useNavigate();

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setLoginData((loginData) => ({ ...loginData, [name]: value }));
  };

  const handleSignUp = async () => {
    //event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/usersData",
        loginData
      );
      console.log("Response:", response.data);
      if (response.data) {
        setLoginData({
          name: "",
          email: "",
          password: "",
          role: "",
        });
        toast.success("Sign Up Successful!");
      }
      setShowLogin(false);
    } catch (error) {
      console.error("Error posting data:", error);
      toast.error("Error occured!");
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.get("http://localhost:8000/usersData");

      setUsersData(response.data);
      console.log("Response:", response.data);

      const userFound = response.data.some((user) => {
        if (user.email === loginData.email) {
          if (user.password === loginData.password) {
            if (user.role === "admin") {
              setIsAdmin(true);
              navigate("/add");
            }
          }
          console.log("userdata ---  " + user.email);
          console.log("logindata ---  " + loginData.email);

          toast.success("Login Successful!");
          setShowLogin(false);
          console.log("logindataAfter setshowlogin ---  " + loginData.email);

          return true;
        }
        return false;
      });

      if (!userFound) {
        toast.error("Incorrect Credentials!");
      }
    } catch (error) {
      console.error("Error getting data:", error);
      toast.error("Error fetching user data!");
    }
  };

  const handleLoginSignUp = async (event) => {
    event.preventDefault();
    let loginState = currentState;

    if (loginState === "Sign Up") {
      handleSignUp();
    } else {
      handleLogin();
    }
  };

  return (
    <div className="login-popup">
      <form className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currentState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <div className="login-popup-inputs">
          {currentState === "Login" ? (
            <></>
          ) : (
            <input
              type="text"
              placeholder="Your name"
              required
              name="name"
              onChange={onChangeHandler}
              value={loginData.name}
            />
          )}
          <input
            type="email"
            placeholder="Your email"
            required
            name="email"
            onChange={onChangeHandler}
            value={loginData.email}
          />
          <input
            type="password"
            placeholder="Password"
            required
            name="password"
            onChange={onChangeHandler}
            value={loginData.password}
          />
        </div>
        <button onClick={handleLoginSignUp}>
          {currentState === "Sign Up" ? "Create account" : "Login"}
        </button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, i agree to the terms of use & privacy policy.</p>
        </div>
        {currentState === "Login" ? (
          <p>
            Create a new account?{" "}
            <span onClick={() => setCurrentState("Sign Up")}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span onClick={() => setCurrentState("Login")}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
