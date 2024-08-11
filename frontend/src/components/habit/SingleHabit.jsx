import React, { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import { IoIosColorPalette } from "react-icons/io";
import { FcExpand } from "react-icons/fc";

const SingleHabit = (props) => {
  const deleteHabit = props.deleteHabit;
  const [editState, setEditState] = useState(false)
  const [color, setColor] = useState('blue-900')

  const initData = props.habit;
  const [habit, setHabit] = useState(initData);

  const dateRender = (date) => {
    const d = new Date(date);

    const year = d.getFullYear();
    const month = d.getMonth();
    const day = d.getDate();

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    return (
      [day + " ", monthNames[month], " "+year]
    );
  };

  return (
    <div className={` flex flex-row font-thin justify-between w-3/5 text-gray-200  rounded-3xl border-blue-900 rounded-tl-none rounded-bl-none bg-${color}  border-2 bg-opacity-60 blur-30 my-2 backdrop-filter backdrop-blur-xl`}>
      

       {/*  Main Display of Habit Data */}
      <div className="flex flex-col w-full py-3 justify-center">
          <div className={`px-3 mb-1 rounded-lg  text-base md:text-xl lg:text-4xl self-start leading-extra-tight`}>
            {habit.desc}
          </div>

          <div className="flex flex-row items-center">
                  <div className="pl-3 flex flex-col ">
                    <div className="text-xs hidden md:hidden lg:block lg:text-sm text-center">Started: &nbsp;</div>
                    <div className="text-xs hidden md:hidden lg:block lg:text-sm text-center ">Ends: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div> 
                    
                </div>
                <div className=" flex flex-col ">
                <div className="self-center text-xs md:text-xs lg:text-sm"><i>{dateRender(habit.createdAt)}</i></div>
                  <div className="self-center text-xs md:text-xs lg:text-sm"><i>{dateRender(habit.endDate)}</i></div>
                </div>
          </div>
      </div>

      

      {/*  Left Side of the habit display containing icons */}
      <div className="flex flex-col justify-center">
        <div className="flex flex-row  m-3 mb-1">

          

          <div 
          className="p-2 mx-1 cursor-pointer text-md lg:text-2xl my-auto bg-black bg-opacity-30 border-2 border-slate-600 hover:bg-slate-400 rounded-lg shadow-2xl"
          onClick={() => setEditState(true)}
          >
        <CiEdit/>
          </div>

          <div 
          className="p-2 mx-1 cursor-pointer text-md lg:text-2xl my-auto bg-black bg-opacity-30 border-2 border-slate-600 hover:bg-slate-400 rounded-lg shadow-2xl"
          onClick={deleteHabit}
          >
        <RiDeleteBin6Line/>
          </div>

        </div>


        <div className="flex flex-row justify-center  m-3 mt-1">

          <div 
          className="p-2 mx-1 cursor-pointer text-md lg:text-2xl my-auto bg-black bg-opacity-30 border-2 border-slate-600 hover:bg-slate-400 rounded-lg shadow-2xl"
          
          >
        <FcExpand/>
          </div>

          <div 
          className="p-2 mx-1 cursor-pointer text-md lg:text-2xl my-auto bg-black bg-opacity-30 border-2 border-slate-600 hover:bg-slate-400 rounded-lg shadow-2xl"
          
          >
        <IoIosColorPalette/>
          </div>
        </div>

       

      </div>
    
        
      {/* {""+editState} */}
     

 
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

