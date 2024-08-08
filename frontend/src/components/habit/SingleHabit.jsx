import React, { useState } from 'react'
import { RiDeleteBin6Line } from "react-icons/ri";



const SingleHabit = (props) => {
  const deleteHabit = props.deleteHabit

    const initData = props.habit
    const initHabit = {
        _id: initData._id,
        desc: initData.desc,
        createdAt: initData.createdAt,
        endDate: initData.endDate,
        archived: initData.archived,
        success: initData.success,
        discrete: initData.discrete
    }
    const [habit, setHabit] = useState(initData)


  return (
    <div className='flex flex-col justify-between  rounded-md items-center border-red-200 border-2 text-center bg-slate-400 bg-opacity-30 blur-30 my-2 p-2'>
    <div className='text-4xl'>
      <RiDeleteBin6Line className='cursor-pointer inline' onClick={deleteHabit} />
      <span className="text-3xl">{habit.desc}</span><br />
    </div>
    <div>
      
      <span className=' text-sm'>
      The index is {props.key}<br />
      {habit._id}<br />

      {/* {habit.createdAt}<br />
      {habit.endDate}<br />
      {habit.archived ? 'T ' : 'F '}
      {habit.success ? 'T ' : 'F '}
      {habit.discrete ? 'T ' : 'F '} */}
      </span>
    </div>
    </div>
  )
}

export default SingleHabit
