
async function getHolidays(year, country) {
    try {
      const response = await fetch(`https://api.11holidays.com/v1/holidays?country=${country}&year=${year}`);
      const data = await response.json();
    //   console.log("ApiResponse", data);
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

export default getHolidays;