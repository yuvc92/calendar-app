import React, { useState, useEffect } from "react";
import Calendar from "./components/Calendar";
import Year from "./models/Year"

const App = () => {
  const [sampleYear, setSampleYear] = useState(null);

  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const handlePrevYear = () => setSelectedYear((y) => y - 1);
  const handleNextYear = () => setSelectedYear((y) => y + 1);
  const handleYearSelect = (e) => setSelectedYear(Number(e.target.value));

  useEffect(() => {
    const generateData = async () => {
      console.log(`selectedYear`, selectedYear);
      let yearData = await generateYear(selectedYear);
      setSampleYear(yearData);
    };
    generateData(selectedYear);
  }, [selectedYear]);
  const generateYear = async (year) => {
    // const date = new Date(year, monthIndex, 1);
    const startDay = (new Date(year, 0, 1)).getDay();
    const yearData = new Year(year, startDay-1);
    await yearData.addHolidays();
    return {
      name: year.toString(),
      months: yearData.months.map((month, monthIndex) => {
        const date = new Date(year, monthIndex, 1);
        const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
        const startDay = date.getDay();

        const days = [];

        // Add empty padding for days before 1st of the month
        for (let i = 0; i < startDay; i++) {
          days.push({ number: "", desc: "", color: "" });
        }

        // Add real days
        const name = month.name;
        for (let day = 1; day <= daysInMonth; day++) {
          // console.log("month:", name, month.days[day-1] );
          days.push({
            number: day,
            desc: month.days[day-1].desc,
            color: month.days[day-1].color
          });
        }
        
        return { name , days };
      })
    };
  };

  const yearRange = Array.from({ length: 4 }, (_, i) => 2023 + i);
  
  return  sampleYear ? 
  <div>
    <div className="year-controls" style={{ display: "flex", alignItems: "center", gap: "12px", justifyContent: "center", margin: "10px 0" }}>
        <button onClick={handlePrevYear}>⏮ Previous Year</button>

        <select value={selectedYear} onChange={handleYearSelect}>
          {yearRange.map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>

        <button onClick={handleNextYear}>Next Year ⏭</button>
      </div>

      <Calendar year={sampleYear} />
    </div>
  : 
  <></>;
};

export default App;
