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
    <div className="fixed inset-x-0 top-0 pt-0 z-50 mb-32">
      <HabitPageTitle user={user} addState={addState} setAddState={setAddState}/>
    </div>
    <div className="relative overflow-hidden pt-32">
    {(addState) ? (<AddHabit setAddState={setAddState} user={user}/>) : (<HabitsDisplay user={user}/>) }
    </div>
    </>
  );
};

export default MainHabits;
