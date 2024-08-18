import React, { useEffect, useState } from "react";
import HabitDataServices from "../../../services/habits";
import SingleHabit from "./SingleHabit";
import EditModal from "./EditModal";

const HabitsDisplay = (props) => {
  const user = props.user;

  const [habits, setHabits] = useState([]);
  const [edit, setEdit] = useState([false, null]);

  useEffect( () => {
    if(edit[0]){
      document.body.classList.add('overflow-hidden');
    }
    else{
      document.body.classList.remove('overflow-hidden');
    }
  }, [edit])
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
      
     <div className="text-white w-full mx-auto flex flex-col justify-center items-center">
        {habits.length > 0 ? (
          habits.map((item, index) => <SingleHabit habit={item} deleteHabit={() => deleteHabit(item._id)} setEdit={setEdit} key={item._id}/>)
        ) : (
          <div>{"No Habits to Display"}</div>
        )}
    </div>
    {edit[0] && <EditModal habit={edit[1]} setHabit={edit[2]} setEdit={() => setEdit([false, null, null])}/>}
    </>
  );
};

export default HabitsDisplay;
