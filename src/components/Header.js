/* src/components/Header.js */
import React from "react";

function Header() {
  return (
    <div className="header">
      <div className="logo">
          <img src="/Freshtime.png" alt="로고"/>
      </div>
        <div className="text">
            <div className="fresh">Fresh</div>
            <div className="time">Time</div>
        </div>
    </div>
  );
}

export default Header;
