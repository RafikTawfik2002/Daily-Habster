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
    const dateRender = (date) => {
      console.log(date)
      const d = new Date(date);

      const year = d.getFullYear();
      const month = d.getMonth() + 1;
      const day = d.getDate();

      console.log(year);
      console.log(month);
      console.log(day)

      return year + "-" + ((month <= 9) ? '0' : '') + month + "-" + ((day <= 9) ? '0' : '') + day
    }
    


  return (
    <div className='flex flex-col w-3/5  rounded-md items-start border-blue-200 border-2 bg-blue-700 bg-opacity-30 blur-30 my-2 p-4 backdrop-filter backdrop-blur-xl'>

      <div className='text-4xl'>
        <RiDeleteBin6Line className='cursor-pointer inline' onClick={deleteHabit} />
        <span className="text-3xl">{habit.desc}</span><br />
      </div>
      <div>
        
      <span className=' text-sm'>
        

        Start Date : {dateRender(habit.createdAt)}<br />
        End Date : {dateRender(habit.endDate)}<br />
        {/* Archived : {habit.archived ? 'T ' : 'F '}<br />
        Success : {habit.success ? 'T ' : 'F '}<br /> */}
        Discrete : {habit.discrete ? 'T ' : 'F '}<br />
        {/* Habit ID : {habit._id}<br /> */}
        </span>
      </div>


    </div>
  )
}

export default SingleHabit
