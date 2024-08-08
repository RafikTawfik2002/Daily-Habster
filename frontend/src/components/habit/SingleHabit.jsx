import React, { useState } from 'react'



const SingleHabit = (props) => {
    const initData = props.habit
    const initHabit = {
        desc: initData.desc,
        createdAt: initData.createdAt,
        endDate: initData.endDate,
        archived: initData.archived,
        success: initData.success,
        discrete: initData.discrete
    }
    const [habit, setHabit] = useState(initData)
    console.log(habit)

  return (
    <div>
      {habit.desc}<br />
      {habit.createdAt}<br />
      {habit.endDate}<br />
      {""+habit.archived+""}<br />
      {""+habit.success+""}<br />
      {""+habit.discrete+""}<br />
      <br />
    </div>
  )
}

export default SingleHabit
