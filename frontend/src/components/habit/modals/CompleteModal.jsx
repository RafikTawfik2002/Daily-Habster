import React, { useState, useEffect } from 'react'
import SingleHabitDone from '../SingleHabitDone'
import SingleHabitQueued from '../SingleHabitQueued'
import HabitDataServices from "../../../../services/habits"

const CompleteModal = (props) => {
    const queued = props.queued
    const setQueued = props.setQueued

    const habits = props.habits
    const setHabits = props.setHabits

    useEffect(() => {
        queued.forEach(habit => {
            const updatedHabit = {
                ...habit,
                archived: "" + true,
                success: "" + habit.success,
                discrete: "" + habit.discrete,
                duration: "" + habit.duration,
                lastLogin: "" + habit.lastLogin 
              };
              HabitDataServices.updateHabit(habit._id, updatedHabit)
              .then((response) => {
                console.log("updated to archived true successfullyy");
              })
              .catch((error) => {
                console.log(error);
              });
        });
        
    },[])

    const emptyQueue = () => {
        setHabits(habits.concat(queued.map(habit => {return {...habit, archived:true}})))
        setQueued([])
    }
  return (
    <div
    className="z-50 bg-black bg-opacity-40 fixed top-0 bottom-0 left-0 right-0  flex flex-row justify-center items-center"
    onClick={() => {}}
  >
    <div
      onClick={(event) => event.stopPropagation()}
      className={`flex flex-col font-thin w-[80%] md:w-[65%] lg:w-[45%] text-gray-200 tracking-wider rounded-3xl border-blue-900  bg-yellow-300  border-2 bg-opacity-60 blur-30 backdrop-filter backdrop-blur-xl`}
    >
         <div className="mt-12 text-center lg:text-2xl md:text-xl text-md font-bold"> Congrats on completing the following habits!</div>
         <div className="mb-8 text-center lg:text-md md:text-md text-xs"> you will be able to see finished habit in the Completed tab</div>

         <div className='overflow-scroll max-h-96  bg-opacity-40'>
            
        <div className='flex flex-col justify-center items-center'>
            {queued.map((item, index) => <SingleHabitQueued habit={item} index={index}/>)}
        </div>
       
        </div>
        <div className="flex flex-row mb-5 items-center justify-evenly">
                
        <button
                className="py-2 rounded-xl border-blue-900 duration-300 hover:bg-gray-600 hover:border-white border bg-gray-500 text-white w-[40%] my-3 mx-2"
                onClick={() => {emptyQueue()}}
                >
                    OK
                </button>
        </div>
     
      </div>
      </div>
  )
}

export default CompleteModal
