import "./Day";
import Day from "./Day";
class Month {
    constructor(name, length) {
      this.name = name;
      this.days = this.getDaysArray(length);
    }
    getDaysArray(length){
        let days = [];
        for(let i = 1; i <= length; i++){
            
            days.push(new Day(i, "", ""));
        }
        return days;
    }
}

export default Month;