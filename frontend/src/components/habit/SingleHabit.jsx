import React, { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import { IoIosColorPalette } from "react-icons/io";

const SingleHabit = (props) => {
  const deleteHabit = props.deleteHabit;
  const [editState, setEditState] = useState(false)
  const [color, setColor] = useState('blue-900')

  const initData = props.habit;
  const [habit, setHabit] = useState(initData);

  const dateRender = (date) => {
    console.log(date);
    const d = new Date(date);

    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const day = d.getDate();


    return (
      year +
      "-" +
      (month <= 9 ? "0" : "") +
      month +
      "-" +
      (day <= 9 ? "0" : "") +
      day
    );
  };

  return (
    <div className={`flex flex-row justify-between w-3/5 text-gray-200  rounded-3xl border-blue-900 rounded-tl-none rounded-bl-none bg-${color}  border-2 bg-opacity-60 blur-30 my-2 backdrop-filter backdrop-blur-xl`}>
      

       {/*  Main Display of Habit Data */}
      <div className="flex flex-col items-start">
          <div className={`px-3 py-2 rounded-lg rounded-t-none rounded-l-none text-xl lg:text-4xl  self-start`}>
            {habit.desc}
          </div>
      </div>

      {/*  Left Side of the habit display containing icons */}
      <div className="flex flex-row items-center m-4">

        <div 
        className="p-2 mx-1 cursor-pointer text-md lg:text-4xl my-auto bg-black bg-opacity-30 border-2 border-slate-600 hover:bg-slate-400 rounded-lg shadow-2xl"
        onClick={deleteHabit}
        >
      <RiDeleteBin6Line/>
        </div>

        <div 
        className="p-2 mx-1 cursor-pointer text-md lg:text-4xl my-auto bg-black bg-opacity-30 border-2 border-slate-600 hover:bg-slate-400 rounded-lg shadow-2xl"
        onClick={() => setEditState(true)}
        >
      <CiEdit/>
        </div>

      <div 
        className="p-2 mx-1 cursor-pointer text-md lg:text-4xl my-auto bg-black bg-opacity-30 border-2 border-slate-600 hover:bg-slate-400 rounded-lg shadow-2xl"
      >
      <IoIosColorPalette/>
        </div>
    
        
      {/* {""+editState} */}

      </div>
 
    </div>
  );
};

export default SingleHabit;

// <div className="text-4xl flex flex-row items-center pb-2">

// <div className="p-2">

// </div>

// <div className="ml-2 text-3xl shadow-inner shadow-blue-950 bg-opacity-7 rounded-md border-white border-0 bg-blue-900 p-3">{habit.desc}</div>
// <div className="text-sm">
//   <button onClick={() => setColor('bg-blue-700')}>blue</button><br />
//   <button onClick={() => setColor('bg-red-950')}>red</button><br />
//   <button onClick={() => setColor('bg-green-300')}>green</button><br />
//   <button onClick={() => setColor('bg-yellow-900')}>green</button><br />
// </div>

// </div>

// <div>
// <div className=" text-sm">
//   Start Date : {dateRender(habit.createdAt)}
//   <br />
//   End Date : {dateRender(habit.endDate)}
//   {/* Archived : {habit.archived ? 'T ' : 'F '}
// Success : {habit.success ? 'T ' : 'F '}<br /> */}
//   {/* Discrete : {habit.discrete ? "T " : "F "} */}
 
//   {/* Habit ID : {habit._id}<br /> */}
// </div>
// </div>

