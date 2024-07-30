import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Sidebar />
      <MainContent />
    </div>
  );
}

function Header() {
  return (
    <div className="header">
      <div className="logo">프레쉬 타임</div>
      <div className="search-bar">
        <input type="text" placeholder="Search..." />
      </div>
    </div>
  );
}

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="logo">프레쉬 타임</div>
      <nav>
        <ul>
          <li className="active">Main</li>
          <li>Calender</li>
          <li>Statistics</li>
          <li>main</li>
          <li>Membership</li>
        </ul>
      </nav>
    </div>
  );
}

function MainContent() {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else if (!isActive && time !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, time]);

  const handleStart = () => {
    setIsActive(true);
  };

  const handleStop = () => {
    setIsActive(false);
    setTime(0);
  };

  const formatTime = (seconds) => {
    const getSeconds = `0${seconds % 60}`.slice(-2);
    const minutes = `${Math.floor(seconds / 60)}`;
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(seconds / 3600)}`.slice(-2);
    return `${getHours}:${getMinutes}:${getSeconds}`;
  };

  return (
    <div className="main-content">
      <div className="search-bar">
        <input type="text" placeholder="Search..." />
      </div>
      <div className="timer-container">
        <AnalogClock />
        <div>
          <div className="timer-box">
            <TimerDisplay time={formatTime(time)} />
          </div>
          <Buttons handleStart={handleStart} handleStop={handleStop} />
        </div>
      </div>
    </div>
  );
}

function AnalogClock() {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  const hourStyle = {
    transform: `rotate(${hours * 30 + minutes / 2}deg)`,
  };
  const minuteStyle = {
    transform: `rotate(${minutes * 6}deg)`,
  };
  const secondStyle = {
    transform: `rotate(${seconds * 6}deg)`,
  };

  return (
    <div className="clock">
      <div className="clock-face">
        <div className="hand hour-hand" style={hourStyle}></div>
        <div className="hand minute-hand" style={minuteStyle}></div>
        <div className="hand second-hand" style={secondStyle}></div>
      </div>
    </div>
  );
}

function TimerDisplay({ time }) {
  return <div className="timer-display">{time}</div>;
}

function Buttons({ handleStart, handleStop }) {
  return (
    <div className="buttons">
      <button className="start-button" onClick={handleStart}>
        시작
      </button>
      <button className="end-button" onClick={handleStop}>
        종료
      </button>
    </div>
  );
}

export default App;
