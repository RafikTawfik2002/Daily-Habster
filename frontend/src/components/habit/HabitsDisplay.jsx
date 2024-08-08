import React, { useEffect, useState } from "react";
import HabitDataServices from "../../../services/habits";
import SingleHabit from "./SingleHabit";

const HabitsDisplay = (props) => {
  const user = props.user;

  const [habits, setHabits] = useState([]);

  const find = (user) => {
    HabitDataServices.findByUserId(user.userID)
      .then((response) => {
        setHabits(response.data);
      })
      .catch((e) => {
      });
  };

  const deleteHabit = (id) => {
    //console.log("removing habit with id " + id + " and index " + index)
    HabitDataServices.deleteHabit(id)
    .then(response => {
      setHabits(prevState => {
        return prevState.filter(habit => habit._id !== id);
    });
    })
    .catch((e) => {
    });
  }

  useEffect(() => {if(user && user.userID){find(user)}}, [])

  return (<>
      
     <div className="text-white flex justify-center items-center">
      <div>
        Trying To Display Something
        {habits.length > 0 ? (
          habits.map((item, index) => <SingleHabit habit={item} deleteHabit={() => deleteHabit(item._id)} key={item._id}/>)
        ) : (
          <div>{"No Habits to Display"}</div>
        )}
      </div> 
    </div>
    </>
  );
};

export default HabitsDisplay;
