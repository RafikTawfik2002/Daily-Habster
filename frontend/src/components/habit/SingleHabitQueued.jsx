import React, { useState, useEffect } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import LinearBar from "../LinearBar";
import { MdRemoveRedEye } from "react-icons/md";
import DateTools from "../../DateTools";
import CheckIn from "../CheckIn";

const SingleHabitQueued = (props) => {
  console.log("HABIT IN QUEUED");
  console.log(props.habit);
  const initData = props.habit;
  const [habit, setHabit] = useState(props.habit);
  // rounded-tl-none rounded-bl-none
  // rounded-3xl
  return (
    <div
      className={` 
    flex flex-col font-thin justify-between w-11/12 text-gray-300  
     border-blue-900  border-2 bg-blue-900 rounded-3xl   bg-opacity-80 blur-30 my-2

     `}
    >
      <div className="flex flex-row w-full ">
        {/*  Main Display of Habit Data */}
        <div className="flex flex-col w-full py-3">
          <div
            className={`px-3 mb-2 rounded-lg  text-xl md:text-xl lg:text-3xl self-start leading-extra-tight font-normal`}
          >
            {/* <span className="hidden font-thin md:inline lg:inline">
              {props.index + ") "}
            </span> */}
            {habit.desc}
          </div>

          <div className="flex flex-row items-center pl-3">
            <div className="ml-6 lg:ml-10 flex flex-row  ">
              <div className="self-center text-xs md:text-xs ">
                <i>{DateTools.dateRender(habit.createdAt)}</i>
              </div>
              <div className="self-center px-1  text-xs md:text-xs "> ~ </div>
              <div className="self-center text-xs md:text-xs ">
                <i>
                  {DateTools.dateRender(
                    DateTools.DurationToDate(habit.createdAt, habit.duration)
                  )}
                </i>
              </div>
            </div>
          </div>

          {habit.text && (
            <div
              className={`ml-6 lg:ml-10 w-5/6 lg:w-3/3 px-3 mt-1 rounded-lg  text-base md:text-xl lg:text-sm self-start font-normal`}
            >
              <span className="font-thin">
                <span className="block text-sm leading-tight">
                  <i>{habit.text}</i>
                </span>
              </span>
            </div>
          )}
        </div>
      

        {habit.lastLogin == habit.duration && <div className=""><div>Gold Status Achieved {habit.duration}</div></div>}
      </div>
        
    </div>
  );
};

export default SingleHabitQueued;
