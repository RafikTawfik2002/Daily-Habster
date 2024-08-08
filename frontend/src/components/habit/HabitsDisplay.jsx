import React, { useEffect, useState } from "react";
import HabitDataServices from "../../../services/habits";
import SingleHabit from "./SingleHabit";

const HabitsDisplay = (props) => {
  console.log("Habit Diplay Working");
  const user = props.user;

  const [habits, setHabits] = useState([]);

  //console.log("user is " + user.userID);

  const find = (user) => {
    HabitDataServices.findByUserId(user.userID)
      .then((response) => {
        console.log("did work " + response.data);
        setHabits(response.data);
      })
      .catch((e) => {
        console.log("didn't work " + e);
      });
  };

  useEffect(() => {if(user && user.userID){find(user)}}, [])

  return (<>
      
     <div className="text-white flex justify-center items-center">
      <div>
        Trying To Display Something
        {habits.length > 0 ? (
          habits.map((item) => <SingleHabit habit={item} />)
        ) : (
          <div>{"No Habits to Display"}</div>
        )}
      </div> 
    </div>
    </>
  );
};

export default HabitsDisplay;
