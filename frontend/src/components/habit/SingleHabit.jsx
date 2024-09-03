import React, { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import LinearBar from "../LinearBar";
import { MdRemoveRedEye } from "react-icons/md";
import DateTools from "../../DateTools";
import CheckIn from "../CheckIn";

const SingleHabit = (props) => {
  
  const deleteHabit = props.deleteHabit;
  const setEdit = props.setEdit; 
  const setDel = props.setDel;   

  const initData = props.habit;
  const [habit, setHabit] = useState(initData);

  const startEdit = () => {
    console.log("starting edit with state: ")
    console.log(habit)
    console.log("--------------")
    setEdit([true, habit, setHabit])
  }

  const startDel = () => {
    setDel([true, habit])
  }

  const [checkIn, setCheckIn] = useState( DateTools.LoggedWithin24Hours(habit.createdAt, habit.lastLogin))


  return (
    <div className={` flex flex-col font-thin justify-between w-11/12 md:w-11/12 lg:w-3/5 text-gray-300  rounded-3xl border-blue-900 rounded-tl-none rounded-bl-none bg-blue-900  border-2 bg-opacity-80 blur-30 my-2 backdrop-filter backdrop-blur-xl`}>
      
      <div className="flex flex-row w-full ">

                  {/*  Main Display of Habit Data */}
                  <div className="flex flex-col w-full py-3">
                      <div className={`px-3 mb-2 rounded-lg  text-xl md:text-xl lg:text-3xl self-start leading-extra-tight font-normal`}>
                        <span className="font-thin">{props.index + ") "}</span>{habit.desc} 
                      </div>

                      <div className="flex flex-row items-center pl-3">

                      <div className="ml-6 lg:ml-10 flex flex-row  ">
                      <div className="self-center text-xs md:text-xs "><i>{DateTools.dateRender(habit.createdAt)}</i></div>
                      <div className="self-center px-1  text-xs md:text-xs "> ~ </div>
                        <div className="self-center text-xs md:text-xs "><i>
                          {DateTools.dateRender(DateTools.DurationToDate(habit.createdAt, habit.duration))}</i></div>
                      </div>




</div>

                      {habit.text && <div className={`ml-6 lg:ml-10 w-5/6 lg:w-3/3 px-3 mt-1 rounded-lg  text-base md:text-xl lg:text-sm self-start font-normal`}>
                        <span className="font-thin"><span className="text-sm"><i>Description</i></span> <br/><i>{habit.text}</i></span>
                      </div>}





                    
     
                  </div>

                  

                  {/*  Left Side of the habit display containing icons */}
                  <div className="flex flex-col py-3">
                    <div className="flex flex-row pr-3 justify-end">



                    <div 
                      className="duration-300 p-2 mr-1 cursor-pointer text-md lg:text-2xl my-auto bg-black bg-opacity-30 border-2 border-slate-600 hover:bg-gray-600 rounded-lg shadow-2xl"
                      onClick={() => {props.setView([true, habit])}}
                      >
                    <MdRemoveRedEye/>
                      </div>

                      <div 
                      className="duration-300 p-2 mr-1 cursor-pointer text-md lg:text-2xl my-auto bg-black bg-opacity-30 border-2 border-slate-600 hover:bg-slate-600 rounded-lg shadow-2xl"
                      onClick={startEdit}
                      >
                    <CiEdit/>
                      </div>
                      <div 
                      className="duration-300 p-2 cursor-pointer text-md lg:text-2xl my-auto bg-black bg-opacity-30 border-2 border-slate-600 hover:bg-slate-600 rounded-lg shadow-2xl"
                      onClick={startDel}
                      >
                    <RiDeleteBin6Line/>
                      </div>

                    </div>



                    <div className=" w-full mr-1 flex">
                    { checkIn && <CheckIn setCheckIn={setCheckIn} setHabit={setHabit} habit={habit} setParen={props.setParen}/>}
                    </div>

                  </div>
                  
    
        
      </div>

      <div className="p-3 pt-0 w-full">
                        <LinearBar setParen={props.setParen} setHabit={setHabit} habit={habit} start={habit.createdAt} duration={habit.duration} />
      </div>


          
    </div>
  );
};

export default SingleHabit;



