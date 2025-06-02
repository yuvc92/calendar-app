import React, { useState } from "react";
import "./Calendar.css";

const Calendar = ({ year }) => {
  const [view, setView] = useState("yearly");

  const handleChange = (e) => {
    setView(e.target.value);
  };

  const getVisibleMonths = () => {
    if (view === "yearly") {
      return year.months;
    }
    if (view.startsWith("monthly-")) {
      const monthName = view.replace("monthly-", "");
      return year.months.filter((m) => m.name === monthName);
    }
    if (view.startsWith("quarterly-")) {
      const quarterIndex = parseInt(view.split("-")[1], 10);
      return year.months.slice(quarterIndex * 3, quarterIndex * 3 + 3);
    }
    return [];
  };

  const visibleMonths = getVisibleMonths();

  return (
    <div className="calendar-container">
      <select className="calendar-select" value={view} onChange={handleChange}>
        <option value="yearly">📅 Yearly View</option>
        <optgroup label="🗓 Monthly View">
          {year.months.map((m, i) => (
            <option key={i} value={`monthly-${m.name}`}>
              {m.name}
            </option>
          ))}
        </optgroup>
        <optgroup label="📊 Quarterly View">
          <option value="quarterly-0">Q1 (Jan - Mar)</option>
          <option value="quarterly-1">Q2 (Apr - Jun)</option>
          <option value="quarterly-2">Q3 (Jul - Sep)</option>
          <option value="quarterly-3">Q4 (Oct - Dec)</option>
        </optgroup>
      </select>

      <div
        className="month-grid"
        style={{
          gridTemplateColumns:
            view === "yearly"
              ? "repeat(4, 2fr)"
              : view.startsWith("quarterly-")
              ? "repeat(3, 1fr)"
              : "repeat(1, 1fr)",
        }}
      >
        {visibleMonths.map((month, idx) => (
          <div key={idx} className="month-card">
            <h2 className="month-title">{month.name}</h2>
            <div className="days-grid">
              {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                <div key={i} className="weekday">
                  {d}
                </div>
              ))}
              {month.days.map((day, index) => (
                <div
                  key={index}
                  className="day"
                  style={{ backgroundColor: day.color || "transparent" }}
                  title={day.desc}
                >
                  <div>{day.number}</div>
                  {view.startsWith("monthly-") && day.desc && (
                    <div className="desc">{day.desc}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
