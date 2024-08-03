/* src/challenge/c-page.js */
import React, { useState } from "react";
import Layout from "../Layout";
import "./c-page.css";

function ChallengePage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [completedChallenges, setCompletedChallenges] = useState({
    stretching: false,
    wakeUp: false,
  });

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = `0${date.getMonth() + 1}`.slice(-2);
    const day = `0${date.getDate()}`.slice(-2);
    return `${year} / ${month} / ${day}`;
  };

  const handleNextDate = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(newDate.getDate() + 1);
      return newDate;
    });
  };

  const handlePreviousDate = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(newDate.getDate() - 1);
      return newDate;
    });
  };

  const handleCheckboxChange = (challenge) => {
    setCompletedChallenges((prevState) => ({
      ...prevState,
      [challenge]: !prevState[challenge],
    }));
  };

  return (
    <Layout>
      <div>
        <div className="date-selector">
          <button className="date-nav" onClick={handlePreviousDate}>
            &lt;
          </button>
          <span className="date-display">{` ${formatDate(currentDate)} `}</span>
          <button className="date-nav" onClick={handleNextDate}>
            &gt;
          </button>
        </div>

        <div className="challenges">
          <div className="challenge-item">
            <span className="challenge-text">Stretch (5 minute)</span>
            <input
              type="checkbox"
              id="stretching"
              checked={completedChallenges.stretching}
              onChange={() => handleCheckboxChange("stretching")}
              className={completedChallenges.stretching ? "checked" : ""}
            />
          </div>

          <div className="challenge-item">
            <span className="challenge-text">Drink water (3 minute)</span>
            <input
              type="checkbox"
              id="Drink-water"
              checked={completedChallenges.wakeUp}
              onChange={() => handleCheckboxChange("drinkWater")}
              className={completedChallenges.drinkWater ? "checked" : ""}
            />
          </div>

          <div className="challenge-item">
            <span className="challenge-text">Eat a snack (15 minute)</span>
            <input
              type="checkbox"
              id="Eat-a-snack"
              checked={completedChallenges.wakeUp}
              onChange={() => handleCheckboxChange("Eatasnack")}
              className={completedChallenges.Eatasnack ? "checked" : ""}
            />
          </div>

          <div className="challenge-item">
            <span className="challenge-text">Take a break (5 minute)</span>
            <input
              type="checkbox"
              id="Take-a-break"
              checked={completedChallenges.wakeUp}
              onChange={() => handleCheckboxChange("Takeabreak")}
              className={completedChallenges.Takeabreak ? "checked" : ""}
            />
          </div>

          <div className="challenge-item">
            <span className="challenge-text">Take a walk (10 minute)</span>
            <input
              type="checkbox"
              id="Take-a-walk"
              checked={completedChallenges.wakeUp}
              onChange={() => handleCheckboxChange("Takeawalk")}
              className={completedChallenges.Takeawalk ? "checked" : ""}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ChallengePage;
