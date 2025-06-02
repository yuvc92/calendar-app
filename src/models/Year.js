import monthsData from "../constants/monthsData";
import getHolidays from "../requests/getHolidays";
import Month from "./Month";

class Year {
    constructor(number, startDay) {
      this.number = number;
      this.months = this.getMonths();
      this.startDay = startDay;
        // this.addHolidays();
    }
    getMonths(){
        let months = []
        for(const item of monthsData){
            months.push(new Month(item.short, item.days));
        }
        return months;
    }
    async addHolidays(){
        try{
            const holidays = await getHolidays(this.number, "IN");
            for(let holiday of holidays){
                const date = new Date(holiday.date);
                let day = this.months[date.getMonth()].days[date.getDate()-1];
                day.color = "#90EE90";
                day.desc = holiday.name;
            }
            this.changeWeeks();
        }
        catch{
            console.log("Some Error");
        }
    }

    changeWeeks(){
        let lastSeven = [];
        let curDay = this.startDay;
        let flag = false;
        for(let month of this.months){
            for(let day of month.days){
                lastSeven.push(day);
                if(lastSeven.length > 7)lastSeven.shift();
                if(day.color === "#90EE90"){
                    for(let i = 1; i <= curDay ; i++){
                        if(lastSeven.length - 1 - i < 0)break;
                        const day = lastSeven[lastSeven.length - 1 - i ];
                        if(day.color === "#90EE90"){
                            flag = true;
                            break;
                        }
                    }
                }
                if(curDay === 6){
                    if(flag){
                        for(let day of lastSeven){
                            if(day.color !== "#90EE90"){
                                day.color = "#006400";
                            }
                        }
                    }
                    flag = false;
                }
                curDay = (curDay+1)%7;
            }
        }
    }
}

export default Year;