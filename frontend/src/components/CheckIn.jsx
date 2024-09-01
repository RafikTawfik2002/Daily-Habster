import React, { useState, useEffect, useRef } from 'react'
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

    const checkedInRef = useRef(CheckedIn);

    useEffect(() => {
      checkedInRef.current = CheckedIn;
    }, [CheckedIn]);

    useEffect(() => {
      if(time == "00:00:00"){
        props.setCheckIn(checkedInRef.current)
        setCheckedIn(false)
      }
    }, [time])
 

    useEffect(() => {
        // Set up the timer to update every second
        const intervalId = setInterval(() => {
          const currentTime = DateTools.RemainToTime(1-DateTools.DayNumber(habit.createdAt)[1])
            

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
              console.log("updated setChecked in to : " + (DateTools.DayNumber(habit.createdAt)[0] == newLogin))
            })
            .catch((error) => {
              console.log(error);
            });

      }


  return (
    <>
    <button 
    onClick={() => incrementLastLogin()}
    className={`w-full  mt-2 flex flex-col items-center px-2 mr-3 py-1  whitespace-nowrap  rounded-lg bg-black bg-opacity-10 duration-300 md:text-sm text-sm lg:text-md
        ${CheckedIn ? "cursor-default" : "  border-slate-300 bg-opacity-30 border hover:bg-slate-600 hover:border-white cursor-pointer"}
        `}>
        { habit.lastLogin < habit.duration ? 
            (<>
        <div className=''>
           <i>{CheckedIn ? "Come back in" : "Check in within"} </i> 
        </div>
        <div className=''>
          {time}
        </div>

      
        </> ):
        (<div className='px-2 bg-gradient-to-tl from-yellow-600 to-yellow-500 bg-opacity-30 h-full rounded-lg text-black'><i>Gold Status Achieved</i></div>)
        }
    </button>
    </>
  )
}

export default CheckIn
