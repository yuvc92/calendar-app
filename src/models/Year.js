import monthsData from "../constants/monthsData";
import getHolidays from "../requests/getHolidays";

class Year {
    constructor(number, startDay) {
      this.number = number;
      this.months = getMonths();
      this.startDay = startDay;
    }
    getMonths(){
        let months = []
        for(const item of monthsData){
            months.push(new Month(item.short, days));
        }
        return months;
    }
    async addHolidays(){
        try{
            const holidays = await getHolidays(this.number, "IN");
            for(let holiday of holidays){
                // const type = holiday.type;
                // const name = holiday.name;
                const date = new Date(holiday.date);
                day = months[date.getMonth()].days[date.getDate()];
                day.desc = holiday.name;
                day.color = "#90EE90";
            }
        }
        catch{
            console.log("Some Error");
        }
    }

    changeWeeks(){
        let lastSeven = [];
        let curDay = this.startDay;
        let flag = false;
        for(let month of months){
            for(let day of month.days){
                lastSeven.push(day);
                if(lastSeven.length > 7)length.shift();
                if(day.color.length > 0){
                    for(let i = 1; i <= curDay && (lastSeven.length -1 - i  >= 0) ; i++){
                        const day = lastSeven[lastSeven.length - 1 - i ];
                        if(day.color.length === "#90EE90"){
                            flag = true;
                            break;
                        }
                    }
                }
                if(curDay === 6){
                    if(flag){
                        for(let day in lastSeven){
                            if(day.color.length === 0){
                                day.color = "#006400";
                            }
                        }
                    }
                }
                curDay = (curDay+1)%7;
            }
        }
    }
}