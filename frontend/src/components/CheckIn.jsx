import React, { useState, useEffect } from 'react'
import DateTools from '../DateTools'
import HabitsDataServices from "../../services/habits"

const CheckIn = (props) => {
    const habit = props.habit
    // setParen used to update habit given habit id and new habit
    const setParen = props.setParen

    const [time, setTime] = useState(DateTools.RemainToTime(1-DateTools.DayNumber(habit.createdAt)[1]))

    // console.log("Day Number: " +DateTools.DayNumber(habit.createdAt)[0])
    // console.log("Last Login Day Number: " +habit.lastLogin + "\n\n")
    const [CheckedIn, setCheckedIn] = useState(DateTools.DayNumber(habit.createdAt)[0] == habit.lastLogin)

    useEffect(() => {
        // Set up the timer to update every second
        const intervalId = setInterval(() => {
          const currentTime = DateTools.RemainToTime(1-DateTools.DayNumber(habit.createdAt)[1])
          if(currentTime == "00:00:00"){
            clearInterval(intervalId); }
            

          setTime(currentTime)
        }, 1000);
    
        // Cleanup the interval on component unmount
        return () => clearInterval(intervalId);
      }, []);

      const incrementLastLogin = () => {
        console.log("CLICKED")
        if(CheckedIn){return}
        console.log("Incrementing lastlogin")
        const newLogin = habit.lastLogin + 1
        const updatedHabit = {
            ...habit,
            archived: "" + habit.archived,
            success: "" + habit.success,
            discrete: "" + habit.discrete,
            duration: "" + habit.duration,
            lastLogin: "" + (habit.lastLogin +1)
          };
          console.log("updated habit is : ");
          console.log(updatedHabit);
          HabitsDataServices.updateHabit(habit._id, updatedHabit)
            .then((response) => {
              console.log("updated to archived true successfullyy");
              props.setHabit({
                ...habit,
                archived: habit.archived,
                success: habit.success,
                discrete: habit.discrete,
                lastLogin: newLogin
              });
              props.setParen(habit._id, {
                ...habit,
                archived: habit.archived,
                success: habit.success,
                discrete: habit.discrete,
                lastLogin: newLogin
              })
              setCheckedIn(DateTools.DayNumber(habit.createdAt)[0] == newLogin)
            })
            .catch((error) => {
              console.log(error);
            });

      }


  return (

    <button 
    onClick={() => incrementLastLogin()}
    className={`w-full block mr-3  rounded-lg bg-black bg-opacity-10 duration-300 
        ${CheckedIn ? "cursor-default" : "  border-slate-300 bg-opacity-30 border hover:bg-slate-600 hover:border-white cursor-pointer"}
        `}>
        { habit.lastLogin < habit.duration ? 
            (<>
        <div>
           <i>{CheckedIn ? "Come back in" : "Click me in"} </i>
        </div>

        <div>
            {time}
        </div>
        </> ):
        (<div className='bg-yellow-300 bg-opacity-30 h-full rounded-lg'><i>Gold Status Achieved</i></div>)
        }
    </button>
  )
}

export default CheckIn
