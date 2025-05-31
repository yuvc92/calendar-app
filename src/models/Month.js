class Month {
    constructor(name, length) {
      this.name = name;
      this.days = getDaysArray(length);
      this.color = color;
    }
    getDaysArray(length){
        let days = [];
        for(let i = 1; i <= length; i++){
            days.push(new Day(i, "", ""));
        }
        return days;
    }
}