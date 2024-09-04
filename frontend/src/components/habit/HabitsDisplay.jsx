import React, { useEffect, useState } from "react";
import HabitDataServices from "../../../services/habits";
import SingleHabitTab from "./SingleHabitTab";
import EditModal from "./modals/EditModal";
import DeleteModal from "./modals/DeleteModal";
import DateTools from "../../DateTools";
import ViewModal from "./modals/ViewModal";
import Spinner from "../Spinner";


const HabitsDisplay = (props) => {
  const user = props.user;

  const [habits, setHabits] = useState([]);
  const [edit, setEdit] = useState([false, null, null]);
  const [del, setDel] = useState([false, null]);

  const [view, setView] = useState([false, null])

  useEffect( () => {
    if(edit[0] || del[0] || view[0]){
      document.body.classList.add('overflow-hidden');
    }
    else{
      document.body.classList.remove('overflow-hidden');
    }
  }, [edit, del, view])
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

  const ComparStartUp = (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  const ComparStartDown = (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
  const ComparEndUp = (a, b) => DateTools.DurationToDate(b.createdAt, b.duration).getTime() - DateTools.DurationToDate(a.createdAt, a.duration).getTime();
  const ComparEndDown = (a, b) => DateTools.DurationToDate(a.createdAt, a.duration).getTime() - DateTools.DurationToDate(b.createdAt, b.duration).getTime();
  const ComparDurationUp = (a, b) => a.duration - b.duration;
  const ComparDurationDown = (a, b) => b.duration - a.duration;
  const ComparProgressUp = (a, b) => DateTools.Percentage(a.createdAt, a.duration) - DateTools.Percentage(b.createdAt, b.duration)
  const ComparProgressDown = (a, b) => DateTools.Percentage(b.createdAt, b.duration) - DateTools.Percentage(a.createdAt, a.duration)
  const comparators = [ComparStartUp, ComparStartDown, ComparEndUp, ComparEndDown, ComparDurationUp, ComparDurationDown, ComparProgressUp, ComparProgressDown]


  useEffect(() => {
    if(props.sortState[0] != "none"){
    const habitsCopy = [...habits]

    const comparVal = [0]
    if(props.sortState[0] == "end"){comparVal[0] = 2}
    else if(props.sortState[0] == "duration"){comparVal[0] = 4}
    else if(props.sortState[0] == "progress"){if(props.tab != "Main"){return}comparVal[0] = 6}
    if(props.sortState[1] == "down"){comparVal[0]+=1}

    habitsCopy.sort(comparators[comparVal[0]]);

    setHabits(habitsCopy)

  }}, [props.sortState])

  const filter = () =>{
    const copyHabits = [...habits]
    if(props.tab == "Main") return copyHabits.filter(a => (a.archived == false))
    if(props.tab == "Completed") return copyHabits.filter(a => (a.archived == true))
    if(props.tab == "Gold") return copyHabits.filter(a => (a.archived == true && a.duration == a.lastLogin))
    
    return habits
  }
  // used to update the habit in the array by replacing it
  // function used by child components 
  const updateHabits = (id, habit) => {
    console.log("new habit to log in")
    console.log(habit)
    setHabits(prevState => {
      return prevState.map(item => item._id == id ? habit : item);
    })

    
  }

  return (<>
      {/* <span className="bg-white mx-52">{props.tab}</span>  */}
      
     <div className="text-white w-full mx-auto flex flex-col justify-center items-center">
        {habits.length > 0 ? (
          filter().map((item, index ) =>
          <SingleHabitTab setParen={updateHabits} tab={props.tab} index={index+1} habit={item} deleteHabit={() => deleteHabit(item._id)} setDel={setDel} setEdit={setEdit}  key={item._id} setView={setView}/>
          
        )
        ) : (
          <>
          {(user != undefined) ? <div className="mt-12"><Spinner /></div> : <div>{"No Habits to Display"}</div>}
          </>
        )}
    </div>
    {edit[0] && <EditModal habit={edit[1]} setHabit={edit[2]} setEdit={() => setEdit([false, null, null])}/>}
    {del[0] && <DeleteModal habit={del[1]} setDel={() => setDel([false, null, null])} deleteHabit={() => deleteHabit(del[1]._id)}/>}
    {view[0] && <ViewModal habit={view[1]} exit={() => setView([false, null])}/>}

    </>
  );
};

export default HabitsDisplay;
