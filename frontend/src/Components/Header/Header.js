import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./Header.css";
import yummato from "../../images/yummato.png";
import emptyavtar from "../../images/empty_avatar.jpg";
import avatar from "../../images/avatar1.png";
import axios from "axios";
import { getUserData, isLogin, isUserAdmin } from "../../utils/Auth";
import UserProfile from "../../Pages/UserProfile";

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleProfileClick = () => {
    setShowProfileModal(true);
  };

  const toggleDropdown = (e) => {
    e.preventDefault();
    setDropdownOpen(!dropdownOpen);
  };

  const isAdmin = isUserAdmin();

  const login = isLogin();
  const userData = getUserData();

  const handleLogout = async () => {
    await axios("http://localhost:8000/api/v1/auth/logout", {
      withCredentials: true,
    }).catch((err) => {
      console.log("Error logging out: ", err);
    });
    localStorage.removeItem("login");
    localStorage.removeItem("data");
  };

  const navigate = useNavigate();

  return (
    <>
      <nav className="navbar">
        <div className="container">
          <img
            src={yummato}
            alt="Logos"
            style={{
              height: "70px",
              marginTop: "-10px",
              marginLeft: "-35px",
            }}
            onClick={() => navigate("/")}
            className="logo_image"
          />
          <ul
            className="navbar-list"
            style={{
              marginTop: "-13px",
            }}
          >
            <li className="navbar-item">
              <NavLink className="navbar-link" to="/">
                Home
              </NavLink>
            </li>
            <li className="navbar-item">
              <NavLink className="navbar-link" to="/restaurant">
                Restaurant
              </NavLink>
            </li>
            <li className="navbar-item">
              <NavLink className="navbar-link" to="/about">
                About
              </NavLink>
            </li>
            <li className="navbar-item">
              <NavLink className="navbar-link" to="/contact">
                Contact
              </NavLink>
            </li>
            {login && (
              <li className="navbar-item">
                <NavLink className="navbar-link">
                  Hi {userData?.name?.split(" ")?.[0]}
                </NavLink>
              </li>
            )}
            <li className="navbar-item">
              <NavLink className="navbar-link">
                <li className="profile">
                  <button className="avatar" onClick={toggleDropdown}>
                    <img
                      src={login ? avatar : emptyavtar}
                      alt="Logo"
                      className="avatar"
                    />
                  </button>
                  {dropdownOpen && login && (
                    <ul className="dropdown-menu">
                      <li onClick={handleProfileClick}>
                        <Link>Profile</Link>
                      </li>
                      {isAdmin ? (
                        <li>
                          <Link to={"/orderhistoryadmin"}>My Orders</Link>
                        </li>
                      ) : (
                        <li>
                          <Link to={"/orderhistory"}>My Orders</Link>
                        </li>
                      )}

                      <li onClick={handleLogout}>
                        <Link to={"/login"}>Logout</Link>
                      </li>
                    </ul>
                  )}
                </li>
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
      <UserProfile
        showProfileModal={showProfileModal}
        setShowProfileModal={setShowProfileModal}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
      />
    </>
  );
};
export default Header;
