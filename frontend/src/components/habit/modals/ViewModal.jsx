import React from 'react'
import { useEffect, useState } from 'react'
import DateTools from '../../../DateTools'

const ViewModal = (props) => {

    const habit = props.habit
    const exit = props.exit

    const [progress, setProgress] = useState(
      Math.min(1, DateTools.Percentage(habit.createdAt, habit.duration))
    );

    useEffect(() => {
      const interval = setInterval(() => {
        const newProgress = DateTools.Percentage(habit.createdAt, habit.duration);
  
        setProgress(Math.min(newProgress, 1));
  
        if (newProgress >= 1) {
          clearInterval(interval);}
      }, 1000); // Update every 100ms for smoother animation
  
      return () => clearInterval(interval);
    }, [progress]);
  return (
    <div
    className="z-50 bg-black bg-opacity-70 fixed top-0 bottom-0 left-0 right-0  flex flex-row justify-center items-center"
    onClick={exit}
  >
    <div
      onClick={(event) => event.stopPropagation()}
      className={`flex flex-col font-thin w-[80%] md:w-[65%] lg:w-[45%] text-gray-200 tracking-wider rounded-3xl border-blue-900  bg-blue-900  border-2 bg-opacity-60 blur-30 backdrop-filter backdrop-blur-xl`}
    >
      <div className="my-12 mb-8 text-center lg:text-2xl md:text-xl text-md font-bold"> Habit Details</div>
      

    <div className='flex flex-col lg:text-lg md:text-lg mx-14 text-md'>
        <div className='flex flex-row w-full justify-center items-center mb-8'>
        <div className='w-1/4 lg:text-left lg:ml-8'>Title: </div> 
        <div className='w-3/4 mt-2 p-3 bg-blue-950 border-gray-500 rounded-xl border-0.3'>{habit.desc}</div>

        </div>

        <div className='flex flex-row w-full justify-center items-center mb-8'>
        <div className='w-1/4 lg:text-left lg:ml-8'>Description: </div> 
        <div className='max-h-28 text-xs overflow-y-scroll w-3/4 mt-2 p-3 bg-blue-950 border-gray-500 rounded-xl border-0.3'><p>{habit.text || "No Description"}</p></div>

        </div>

        <hr></hr>

        <div className='flex flex-row w-full justify-center items-center mb-4 mt-8'>

        <div className='w-1/4 text-sm'>Started: </div> 
        <div className='w-3/4 px-3 text-sm mt-1 p-1 bg-blue-950 border-gray-500 rounded-xl border-0.3 lg:w-1/3'><i>{DateTools.exact(habit.createdAt).replace(/,/g,"")}</i></div>

        </div>

 
        <div className='flex flex-row w-full justify-center items-center mb-8'>

            <div className='w-1/4 text-sm'>Ends: </div> 
            <div className='w-3/4 px-3 text-sm mt-1 p-1 bg-blue-950 border-gray-500 rounded-xl border-0.3 lg:w-1/3'><i>{DateTools.exact(DateTools.exactDurationToDate(habit.createdAt, habit.duration)).replace(/,/g,"")}</i></div>

        </div>

        <hr></hr>

        <div className='flex flex-row w-full justify-center items-center mt-8 mb-4'>

        <div className='w-1/4 text-sm'>Current Day: </div> 
        <div className='w-3/4 px-3 text-sm mt-1 p-1 bg-blue-950 border-gray-500 rounded-xl border-0.3 lg:w-1/3'><i>Day {Math.min(DateTools.DayNumber(habit.createdAt)[0],habit.duration)} of {habit.duration}</i></div>

        </div>

        <div className='flex flex-row w-full justify-center items-center mb-11 '>

        <div className='w-1/4 text-sm'>Progress: </div> 

        <div className='w-3/4 text-sm mt-1 p-1  bg-blue-950 border-gray-500 rounded-xl border-0.3 lg:w-1/3 rounded-l-none'>
        <div className=' bg-green-600 bg-opacity-70 rounded-lg font-bold rounded-l-none'
        style={{width: `${progress * 100}%`}}
        > &nbsp;{Math.floor(progress * 100)}% </div>
        </div>

        </div>

        <div className='flex flex-row justify-center mb-11'>
        <button
                className="text-white py-2 rounded-xl border-gray-200 border duration-300 hover:bg-gray-400  bg-gray-500 w-[40%] my-3 mx-2"
                onClick={exit}
                >
                    Back To Main
                </button>

        </div>

    </div>



    </div>
    </div>
  )
}

export default ViewModal
