import React, { useEffect, useState } from 'react'
import HabitDataServices from "../../services/habits"

const HabitsDisplay = (props) => {
    console.log("Habit Diplay Working")
    const user = props.user

    const [habits, setHabits] = useState([])

    useEffect(async () => {
        if(!user){console.log("no user");return}
        const data = await HabitDataServices.findByUserId(user.userID)
        console.log(data.data)
        setHabits(data.data)
    }, [])

  return (
    <div className='text-white flex justify-center items-center'>
        <div>
        Trying To Display Something
      {habits.length > 0 ? (habits.map((item) => <div>{item.desc}</div>)) : (<div>{"No Habits to Display"}</div>)}
      </div>
    </div>
  )
}

export default HabitsDisplay
