/* src/App.js*/
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./main/mainpage";
import CalendarPage from "./calendar/calendarpage";
import MembershipPage from "./membership/m-page";
import ChallengePage from "./challenge/c-page";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/membership" element={<MembershipPage />} />
        <Route path="/challenge" element={<ChallengePage />} />
      </Routes>
    </Router>
  );
}

export default App;
