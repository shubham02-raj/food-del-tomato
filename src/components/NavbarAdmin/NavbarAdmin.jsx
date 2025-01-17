import React from "react";
import "./NavbarAdmin.css";
import { assets } from "../../assets/assets_admin/assets";
import { useNavigate } from "react-router-dom";

const NavbarAdmin = ({setIsAdmin}) => {
  const navigate = useNavigate();

  const handleLogout = () =>{
    setIsAdmin(false);
    navigate('/');
  }
  
  return (
    <div className="Navbar-admin">
      <img className="logo" src={assets.logo} alt="" />

      <div className="right">
        <img className="profile" src={assets.profile_image} alt="" />
        <img onClick={handleLogout } className="logout-icon" src={assets.logout_icon} alt="" />
      </div>
    </div>
  );
};

export default NavbarAdmin;
