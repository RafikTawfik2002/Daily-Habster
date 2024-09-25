import React, { useState } from 'react'
import SingleHabitDone from '../SingleHabitDone'
import SingleHabitQueued from '../SingleHabitQueued'

const CompleteModal = (props) => {
    const queued = props.queued
    const setQueued = props.setQueued
    console.log("QUEUED ARRAY")
    console.log(queued)
  return (
    <div
    className="z-50 bg-black bg-opacity-0 fixed top-0 bottom-0 left-0 right-0  flex flex-row justify-center items-center"
    onClick={() => {}}
  >
    <div
      onClick={(event) => event.stopPropagation()}
      className={`flex flex-col font-thin w-[80%] md:w-[65%] lg:w-[45%] text-gray-200 tracking-wider rounded-3xl border-blue-900  bg-yellow-300  border-2 bg-opacity-60 blur-30 backdrop-filter backdrop-blur-xl`}
    >
         <div className="my-12 mb-8 text-center lg:text-2xl md:text-xl text-md font-bold"> Habit Details</div>
        <div className='flex flex-col justify-center items-center'>
            {queued.map((item, index) => <SingleHabitQueued habit={item} index={index}/>)}
        </div>
     
      </div>
      </div>
  )
}

export default CompleteModal
