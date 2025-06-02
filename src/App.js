import React, { useState, useEffect } from "react";
import Calendar from "./components/Calendar";
import Year from "./models/Year"

const App = () => {
  const [sampleYear, setSampleYear] = useState(null);

  useEffect(() => {
  const generateData = async () => {
    let yearData = await generateYear(2025);
    setSampleYear(yearData);
  };
  generateData();
}, []);
  const generateYear = async (year) => {
    const yearData = new Year(2025, 3);
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
  
  return  sampleYear ? <Calendar year={sampleYear} />: <></>;
};

export default App;
