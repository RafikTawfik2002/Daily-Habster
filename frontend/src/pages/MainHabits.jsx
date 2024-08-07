import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import HabitDataService from "../../services/habits.js";
import HabitPageTitle from "../components/HabitPageTitle.jsx";
import HabitsDisplay from "../components/HabitsDisplay.jsx";

const MainHabits = (props) => {
  const user = props.user;

  useEffect(() => {
    props.setLogged(true);
    props.setUser(user);
  }, []);

  //   const [habits, setHabits] = useState([])

  return (
    <>
    <HabitPageTitle user={user}/>
    {/* <HabitsDisplay user={user}/> */}
    </>
  );
};

export default MainHabits;
