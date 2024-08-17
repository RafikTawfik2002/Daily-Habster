

class DateTools {
    DateToInput(date){
        if(Number(date)){return date}
        const newDate = new Date(date);
        const month = newDate.getMonth() + 1;
        const day = newDate.getDate();
        //console.log("Day is: " + day);
        return newDate.getFullYear() + "-" + (month <= 9 ? "0" : "") + month + "-" + (day <= 9 ? "0" : "") + day; 
    }

    DateToDuration(start, end){
        const startDate = new Date(start);
        const startFlat = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
        const endDate = new Date(end);
        const endFlat = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());

        const timeDifference = endFlat.getTime() - startFlat.getTime();

        return timeDifference / (1000 * 60 * 60 * 24) + 1;
    }

    DurationToDate(start, duration){
        const startDate = new Date(start);
        const startFlat = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
        startFlat.setDate(startFlat.getDate() + duration );

        return startDate;
    }
}

export default new DateTools();
