import React, { useContext, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const [showSearchIcon, setShowSearchIcon] = useState(true);

  const { getTotalCartAmount, searchQuery, setSearchQuery } = useContext(StoreContext);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
    console.log(searchQuery);
  };

  const handleShowHide = () => {
    setShowSearchIcon(false);
  };

  return (
    <div className="navbar">
      <Link to="/">
        <img src={assets.logo} alt="" className="logo" />
      </Link>
      <ul className="navbar-menu">
        <Link
          to="/"
          onClick={() => setMenu("home")}
          className={menu === "home" ? "active" : ""}
        >
          home
        </Link>
        <a
          href="#explore-menu"
          onClick={() => setMenu("menu")}
          className={menu === "menu" ? "active" : ""}
        >
          menu
        </a>
        <a
          href="#app-download"
          onClick={() => setMenu("mobile-app")}
          className={menu === "mobile-app" ? "active" : ""}
        >
          mobile-app
        </a>
        <a
          href="#footer"
          onClick={() => setMenu("contact-us")}
          className={menu === "contact-us" ? "active" : ""}
        >
          contact us
        </a>
      </ul>

      <div className="navbar-right">
        {showSearchIcon ? (
          <img
            src={assets.search_icon}
            alt="search-icon"
            onClick={handleShowHide}
          />
        ) : (
          <input
            type="search"
            className="input-search"
            placeholder="Search for food..."
            onChange={handleSearch}
            value={searchQuery}
          />
        )}
        <div className="navbar-cart-icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="" />
          </Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>
        <button
          onClick={() => {
            setShowLogin(true);
          }}
        >
          sign In
        </button>
      </div>
    </div>
  );
};

export default Navbar;
