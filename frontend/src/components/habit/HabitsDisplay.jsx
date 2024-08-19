import React, { useEffect, useState } from "react";
import HabitDataServices from "../../../services/habits";
import SingleHabit from "./SingleHabit";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";
import DateTools from "../../DateTools";

const HabitsDisplay = (props) => {
  const user = props.user;

  const [habits, setHabits] = useState([]);
  const [edit, setEdit] = useState([false, null, null]);
  const [del, setDel] = useState([false, null]);

  useEffect( () => {
    if(edit[0] || del[0]){
      document.body.classList.add('overflow-hidden');
    }
    else{
      document.body.classList.remove('overflow-hidden');
    }
  }, [edit, del])
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

  // comparator based on start date ascending

  const ComparStartUp = (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();

  // comparator based on start date descending

  const ComparStartDown = (a, b) => new Date(a.createdAt).getTime() - new Date(a.createdAt).getTime();

  // comparator based on end date ascending

  const ComparEndUp = (a, b) => DateTools.DurationToDate(b.createdAt, b.duration).getTime() - DateTools.DurationToDate(a.createdAt, a.duration).getTime();

  // comparator based on end date descending

  const ComparEndDown = (a, b) => DateTools.DurationToDate(a.createdAt, a.duration).getTime() - DateTools.DurationToDate(b.createdAt, b.duration).getTime();

    // comparator based on duration ascending

    const ComparDurationUp = (a, b) => a.duration - b.duration;

    // comparator based on duration descending
  
    const ComparDurationDown = (a, b) => b.duration - a.duration;

    // comparator based on duration ascending

    const ComparProgressUp = (a, b) => DateTools.Percentage(a.createdAt, a.duration) - DateTools.Percentage(b.createdAt, b.duration)

    // comparator based on duration descending
      
    const ComparProgressDown = (a, b) => DateTools.Percentage(b.createdAt, b.duration) - DateTools.Percentage(a.createdAt, a.duration)


  const comparators = [ComparStartUp, ComparStartDown, ComparEndUp, ComparEndDown, ComparDurationUp, ComparDurationDown, ComparProgressUp, ComparProgressDown]


  useEffect(() => {
    if(props.sortState[0] != "none"){
    const habitsCopy = [...habits]

    const comparVal = [0]
    if(props.sortState[0] == "end"){comparVal[0] = 2}
    else if(props.sortState[0] == "duration"){comparVal[0] = 4}
    else if(props.sortState[0] == "progress"){comparVal[0] = 6}
    if(props.sortState[1] == "down"){comparVal[0]+=1}

    habitsCopy.sort(comparators[comparVal[0]]);

    setHabits(habitsCopy)

  }}, [props.sortState])

  return (<>
      {/* <span className="bg-white mx-52">{props.sortState[0] + " " +props.sortState[1]}</span>  */}
      
     <div className="text-white w-full mx-auto flex flex-col justify-center items-center">
        {habits.length > 0 ? (
          habits.map((item, index ) => <SingleHabit index={index+1} habit={item} deleteHabit={() => deleteHabit(item._id)} setDel={setDel} setEdit={setEdit}  key={item._id}/>)
        ) : (
          <div>{"No Habits to Display"}</div>
        )}
    </div>
    {edit[0] && <EditModal habit={edit[1]} setHabit={edit[2]} setEdit={() => setEdit([false, null, null])}/>}
    {del[0] && <DeleteModal habit={del[1]} setDel={() => setDel([false, null, null])} deleteHabit={() => deleteHabit(del[1]._id)}/>}
    </>
  );
};

export default HabitsDisplay;
