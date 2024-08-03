/* src/components/Sidebar.js */
import React from "react";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const handleButtonClick = (section) => {
    if (section === "Challenge") {
      navigate("/challenge");
    } else if (section === "Main") {
      navigate("/");
    } else if (section === "Calendar") {
      navigate("/calendar");
    } else if (section === "Membership") {
      navigate("/membership");
    } else {
      alert(`${section} 버튼이 클릭되었습니다.`);
    }
  };

  return (
    <div className="sidebar">
      <nav>
        <ul>
          <li>
            <button onClick={() => handleButtonClick("Main")}>Main</button>
          </li>
          <li>
            <button onClick={() => handleButtonClick("Calendar")}>
              Calendar
            </button>
          </li>
          <li>
            <button onClick={() => handleButtonClick("Statistics")}>
              Statistics
            </button>
          </li>
          <li>
            <button onClick={() => handleButtonClick("Challenge")}>
              Challenge
            </button>
          </li>
          <li>
            <button onClick={() => handleButtonClick("Membership")}>
              Membership
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
