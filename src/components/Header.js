/* src/components/Header.js */
import React from "react";

function Header() {
  return (
    <div className="header">
      <div className="logo">Fresh Time</div>
      <div className="search-bar">
        <input type="text" placeholder="Search..." />
      </div>
    </div>
  );
}

export default Header;
