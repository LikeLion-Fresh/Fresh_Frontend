/* src/calendar/calendarpage.js */
import React, {useEffect, useState} from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Layout from "../Layout";
import "./calendarpage.css";
import dayjs from "dayjs";
import axios from "axios";

function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [timerRecords, setTimerRecords] = useState([]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const createRow = (id, checkIn, checkOut, breaks) => {
    const diffSec = dayjs(checkOut).diff(dayjs(checkIn), "second");
    const totalSec = diffSec - breaks; // 총 초에서 breaks 초를 뺌
    const hours = Math.floor(totalSec / 3600);
    const minutes = Math.floor((totalSec % 3600) / 60);
    return {id, time: `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`};
  };

  const resetTimeRecord = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/timerecords/date`, {
        params: {
          date: dayjs(selectedDate).format("YYYY-MM-DD")
        }
      })
      .then(res => {
        const arr = [];
        res.data.map(item => {
          arr.push(createRow(item.id, item.startedAt, item.endedAt, item.breakTimes));
        });
        setTimerRecords(arr);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    resetTimeRecord();
  }, [selectedDate]);

  useEffect(() => {
    // setTimerRecords([{ id: 1, time: "00:00" }, { id: 2, time: "00:00" }, { id: 3, time: "00:00" }]);
    resetTimeRecord();
  }, []);

  return (
    <Layout>
      <div className="calendar-page">
        <div className="calendar-container">
          <Calendar
            onChange={handleDateChange}
            value={selectedDate}
            formatDay={(locale, date) => dayjs(date).format("DD")}
          />
        </div>
        <div className="timer-records">
          {timerRecords.length === 0 ? (
              <div className="timer-record-item">측정 데이터가 없습니다.</div>
          ) : (
              timerRecords.map((record, index) => (
                  <div key={record.index} className="timer-record-item">
                    <div className="record-id">{index + 1}</div>
                    <div className="record-time">
                      날짜: {selectedDate.toLocaleDateString()} 시간: {record.time}
                    </div>
                  </div>
              ))
          )}
        </div>
      </div>
    </Layout>
  );
}

export default CalendarPage;
