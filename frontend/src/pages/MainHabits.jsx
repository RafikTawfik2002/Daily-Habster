import React, { useState, useEffect } from "react";
import HabitPageTitle from "../components/habit/HabitPageTitle.jsx";
import HabitsDisplay from "../components/habit/HabitsDisplay.jsx";
import AddHabit from "../components/habit/AddHabit.jsx";

const MainHabits = (props) => {
  const user = props.user;
  const [addState, setAddState] = useState(false)

  useEffect(() => {
    props.setLogged(true);
    props.setUser(user);
  }, []);

  //   const [habits, setHabits] = useState([])

  return (
    <>
    <HabitPageTitle user={user} addState={addState} setAddState={setAddState}/>
    {(addState) ? (<AddHabit setAddState={setAddState} user={user}/>) : (<HabitsDisplay user={user}/>) }
    </>
  );
};

export default MainHabits;
