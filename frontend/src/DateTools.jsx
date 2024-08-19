
import { DateTime } from 'luxon'
class DateTools {

    DateToInput(date){
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
        startFlat.setDate(startFlat.getDate() + duration - 1 );
        //console.log("Date after duration is: " + startFlat);
        return startFlat;
    }

    dateRender = (date) => {
        const d = new Date(date);
    
        const year = d.getFullYear();
        const month = d.getMonth();
        const day = d.getDate();
    
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];
        return (
          [day + " ", monthNames[month], " "+year]
        );
      };


      localToUTC = (date, timeZone) => {
        console.log(new Date(date)  +" " + timeZone)
        const utcDate = DateTime.fromISO(date, { zone: timeZone }).toUTC();
        return utcDate

      }

      Percentage(start, duration){
        const startDate = new Date(start);
        const endDate = this.DurationToDate(start, duration);
        

        const totalMilli = (endDate.getTime() - startDate.getTime());
        const currMilli = (new Date().getTime() - startDate.getTime());

        return currMilli / totalMilli;


      }

      exact(d){
        const date = new Date(d)
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const dayTime = hours > 12 ? "PM" : "AM";
        const newHours = hours > 12 ? hours - 12 : hours

        
        return this.dateRender(date) + "  " + newHours + ":" + minutes + " " + dayTime;
      }

      exactDurationToDate(s, duration){
        const start = new Date(s)
        start.setDate(start.getDate() + duration - 1 );
        //console.log("Date after duration is: " + startFlat);
        return start;
    }
}

export default new DateTools();
