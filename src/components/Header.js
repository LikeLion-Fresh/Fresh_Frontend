/* src/components/Header.js */
import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

function Header() {
  const navigate = useNavigate();

  const handleSubscribeClick = () => {
    navigate("/membership");
  };

  return (
    <div className="header">
      <div className="logo">Fresh Time</div>
      <div className="search-bar-container">
        <input type="text" placeholder="Search..." className="search-bar" />
      </div>
      <div className="header-right">
        <button onClick={handleSubscribeClick} className="subscribe-button">
          구독하기
        </button>
        <FontAwesomeIcon icon={faBell} className="notification-icon" />
      </div>
    </div>
  );
}

export default Header;
