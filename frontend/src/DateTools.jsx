
import { DateTime } from 'luxon'
class DateTools {

    // formatting to YYYY/MM/DD
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

        // ensuring offsets are the same
        const startOffset = startFlat.getTimezoneOffset()
        const endOffset = endFlat.getTimezoneOffset()

        const timeDifference = endFlat.getTime() - startFlat.getTime() - (endOffset - startOffset)*60000;

        return timeDifference / (1000 * 60 * 60 * 24);
    }

    DurationToDate(start, duration){
        const startDate = new Date(start);
        const startFlat = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
        startFlat.setDate(startFlat.getDate() + duration  );
        //console.log("Date after duration is: " + startFlat);
        
        return startFlat;
    }

    DurationToDateExact(start, duration){
      const startDate = new Date(start);
      startDate.setDate(startDate.getDate() + duration  );
      return startDate;
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
       //console.log("percentage: " + start)
        const startDate = new Date(start);
        const endDate = this.DurationToDateExact(start, duration);
       //console.log(endDate)

        const totalMilli = (endDate.getTime() - startDate.getTime());
        const currMilli = (new Date().getTime() - startDate.getTime());

        return currMilli / totalMilli;


      }

      exact(d){
        const date = new Date(d)
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const newMinute = minutes < 10 ? "0"+minutes : minutes
        const dayTime = hours > 12 ? "PM" : "AM";
        const newHours = hours > 12 ? hours - 12 : hours

        
        return this.dateRender(date) + "  " + newHours + ":" + newMinute + " " + dayTime;
      }

      exactDurationToDate(s, duration){
        const start = new Date(s)
        start.setDate(start.getDate() + duration );
        //console.log("Date after duration is: " + startFlat);
        return start;
    }

    DaysPassed(progress, duration){
      const all =  progress * duration
      const whole = Math.floor(all)
      return [whole, all - whole]
    }

    // functions concerned with the check in feature

    DayNumber(start){
      const curr = new Date()
      const startDate = new Date(start)
      const all = (curr.getTime() - startDate.getTime()) / (1000*60*60*24) + 1
      const whole = Math.floor(all)
      return [whole, all - whole]
    }

    LoggedWithin24Hours(start, lastLogin){
      const daysPassed = this.DayNumber(start)[0]
      console.log("Days passed since habit started is: " + daysPassed)
      console.log("last login: " + lastLogin)
      return lastLogin >= (daysPassed - 1)
    }

    RemainToTime(remain){
      const remainHours = Math.floor(remain*24)
      const remainMinutes = Math.floor(remain*60*24 - remainHours*60)
      const remainSec = Math.floor(remain*60*60*24 - remainHours*60*60 - remainMinutes*60)

      const padHours = remainHours < 10 ? "0" : ""
      const padMinutes = remainMinutes < 10 ? "0" : ""
      const padSecondes = remainSec < 10 ? "0" : ""



      return padHours + remainHours +":" + padMinutes + remainMinutes+":"+ padSecondes + remainSec
    }
}

export default new DateTools();
