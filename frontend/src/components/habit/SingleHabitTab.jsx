import React from 'react'
import SingleHabit from './SingleHabit'
import SingleHabitDone from './SingleHabitDone'

const SingleHabitTab = (props) => {
  return (
    <>
    {props.tab == "Main" && props.habit.archived == false ?<SingleHabit {...props} /> : <SingleHabitDone {...props}/>}
    </>
  )
}

export default SingleHabitTab
