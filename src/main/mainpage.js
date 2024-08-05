/* src/main/mainpage.js */
import React, { useState, useEffect } from "react";
import Layout from "../Layout";
import "./mainpage.css";
import axios from "axios";

function MainPage() {
  return (
    <Layout>
      <div className="main-content">
        <MainContent />
      </div>
    </Layout>
  );
}

function MainContent() {
  const [time, setTime] = useState(0);
  const [pauseTime, setPauseTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isPause, setIsPause] = useState(false);

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

  useEffect(() => {
    let interval = null;
    if(isPause && !isActive) {
      interval = setInterval(() => {
        setPauseTime((prevTime) => prevTime + 1);
      }, 1000);
    } else if(!isPause && pauseTime !== 0 && isActive) {
      clearInterval(interval);
    }
  }, [isPause, pauseTime]);

  const handleStart = () => {
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/timerecords`, {
        type: "start"
      })
      .then(res => {
        console.log("저장되었습니다.");
      })
      .catch(err => {
        console.log(err.toString());
      });

    setIsActive(true);
    setIsPause(false);
  };

  const handlePause = () => {
    setIsActive(false);
    setIsPause(true);
  };

  const handleReset = () => {
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/timerecords`, {
        type: "end",
        breakTimes: pauseTime
      })
      .then(res => {
        console.log("저장되었습니다.");
      })
      .catch(err => {
        console.log(err.toString());
      });

    setIsActive(false);
    setIsPause(false);
    setTime(0);
    setPauseTime(0);
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
      <div className="timer-container">
        <AnalogClock />
        <div>
          <div className="timer-box">
            <TimerDisplay time={formatTime(time)} />
          </div>
          <Buttons
            handleStart={handleStart}
            handlePause={handlePause}
            handleReset={handleReset}
          />
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

function Buttons({ handleStart, handlePause, handleReset }) {
  return (
    <div className="buttons">
      <button className="start-button" onClick={handleStart}>
        시작
      </button>
      <button className="end-button" onClick={handlePause}>
        멈춤
      </button>
      <button className="reset-button" onClick={handleReset}>
        종료
      </button>
    </div>
  );
}

export default MainPage;
