import React from 'react'
import { useState, useEffect } from 'react'
import DateTools from '../DateTools'
import HabitsDataServices from "../../services/habits"


const LinearBar = (props) => {
    const start = props.start
    const duration = props.duration
    const habit = props.habit
    // bars will indicate when a habit is done
    // and will chaneg the state to success
    // it will also track last updated to get
    // rid of habit if not followed up by user
    const setHabitState = props.setHabitState


    const [progress, setProgress] = useState(Math.min(1, DateTools.Percentage(start, duration)));

    //const [progress, setProgress] = useState(1) 


    useEffect(() => {

        
        const interval = setInterval(() => {

          const newProgress = DateTools.Percentage(start, duration)

          setProgress(Math.min(newProgress, 1));
    
          if (newProgress >= 1) {
            
            clearInterval(interval);
            const updatedHabit = {...habit, archived: ""+true, success: ""+habit.success, discrete : ""+habit.discrete}
            console.log("updated habit is : ")
            console.log(updatedHabit)
            HabitsDataServices.updateHabit(habit._id, updatedHabit)
            .then((response) => {
              console.log("updated to archived true successfully")
              props.setHabit({...habit, archived: true, success: habit.success, discrete : habit.discrete})

            })
            .catch((error) => {
                console.log(error)
            });

          }
        }, 1000); // Update every 100ms for smoother animation
    
        return () => clearInterval(interval);
      }, [progress]);
  return (
    <div className='w-full h-6 bg-black rounded-lg border-blue-800 border-2'>
      <div className={`relative h-full bg-white bg-opacity-80 rounded-lg`}>
      <div
        className={`text-whit flex items-center pl-2 font-bold absolute top-0 left-0 h-full bg-gradient-to-r from-green-700 to-green-500 rounded-md ${progress < 1 && 'rounded-r-none'}`}
        style={{ width: `${Math.max(progress*100, 1)}%` }}
      >{progress*100}% </div>
    </div>
     
    </div>
  )
}

export default LinearBar
