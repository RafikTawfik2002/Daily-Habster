import React from "react";
import { MdMenuBook } from "react-icons/md";
import { BiUser } from "react-icons/bi";
import { Link } from "react-router-dom";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { GoPlus } from "react-icons/go";


const HabitPageTitle = (props) => {

  const user = props.user;
  const addState = props.addState
  const setAddState = props.setAddState

  const addingState = () => {
    if(!user){return;}
    setAddState(!addState);
  }

  console.log(user);
  return (
    <div className="text-white pt-9 lg:w-1/2 w-3/5   mx-auto">
      <div className=" bg-slate-800 border border-slate-400 rounded-md pl-4 pr-4 pt-2 pb-2 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 ">

        <div className="w-full shadow-2xl text-gray-300 flex justify-between items-center">

          <div className="flex flex-col p-2">
            <div className=" text-lg lg:text-4xl">
              {" "}
              <MdMenuBook className="inline -translate-y-1" /> Habit Tracker
            </div>
            <div className="text-sm lg:text-xl">
              {" "}
              <BiUser className="inline -translate-y-0.5" />{" "}
              {user ? user.userName : "Log in to see habits"}
            </div>
          </div>

          <div className="flex flex-row text-5xl lg:text-6xl text-right">

          { !addState && <Link  onClick={addingState} className="h-5/6 my-auto bg-slate-600 bg-opacity-30 border-2 border-slate-600 hover:bg-slate-400 rounded-lg mr-2 shadow-2xl">
          <GoPlus className="my-auto p-3 "/></Link>}

            <Link  className="h-5/6 my-auto bg-slate-600 bg-opacity-30 border-2 border-slate-600 hover:bg-slate-400 rounded-lg mr-2 shadow-2xl" to="/Login">
            <RiLogoutBoxRLine className="my-auto p-3 "/></Link>




          </div>

        </div>



      </div>
    </div>
  );
};

export default HabitPageTitle;
