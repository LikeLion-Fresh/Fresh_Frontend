/* src/App.js*/
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./main/mainpage";
import CalendarPage from "./calendar/calendarpage";
import MembershipPage from "./membership/m-page";
import ChallengePage from "./challenge/c-page";
import Statistics from "./statistics/Statistics";
import LoginPage from "./login/loginpage";

function App() {
  return (
    <Router>
        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/main" element={<MainPage />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/membership" element={<MembershipPage />} />
            <Route path="/challenge" element={<ChallengePage />} />
            <Route path="/statistics" element={<Statistics />} />
      </Routes>
    </Router>
  );
}

export default App;
