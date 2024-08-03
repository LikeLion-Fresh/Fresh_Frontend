/* src/calendar/calendarpage.js */
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Layout from "../Layout";
import "./calendarpage.css";

function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [timerRecords, setTimerRecords] = useState([
    { id: 1, time: "00:00" },
    { id: 2, time: "00:00" },
    { id: 3, time: "00:00" },
  ]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <Layout>
      <div className="calendar-page">
        <div className="calendar-container">
          <Calendar
            onChange={handleDateChange}
            value={selectedDate}
            nextLabel=">"
            prevLabel="<"
          />
        </div>
        <div className="timer-records">
          {timerRecords.map((record) => (
            <div key={record.id} className="timer-record-item">
              <div className="record-id">{record.id}</div>
              <div className="record-time">
                날짜: {selectedDate.toLocaleDateString()} 시간: {record.time}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default CalendarPage;
