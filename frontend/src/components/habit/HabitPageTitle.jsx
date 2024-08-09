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

    <div className="text-white  lg:w-3/3 w-5/5 ">
      <div className=" w-2/3 mx-auto rounded-xl rounded-t-none bg-black border border-slate-400 border-x-0 border-t-0 p-2 pt-0 shadow-lg backdrop-filter backdrop-blur-lg bg-opacity-60 ">

        <div className="w-full shadow-2xl bg-slate-600 rounded-xl rounded-t-none text-gray-300 flex justify-between items-center">

          <div className="pl-5 flex flex-col p-2">
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

          <div className="pr-2 flex flex-row text-5xl lg:text-6xl text-right">

          { (!addState && user) && <Link  onClick={addingState} className="h-5/6 my-auto bg-black bg-opacity-30 border-2 border-slate-600 hover:bg-slate-400 rounded-lg mr-2 shadow-2xl">
          <GoPlus className="my-auto p-3 "/></Link>}

            <Link  className="h-5/6 my-auto bg-black bg-opacity-30 border-2 border-slate-600 hover:bg-slate-400 rounded-lg mr-2 shadow-2xl" to="/Login">
            <RiLogoutBoxRLine className="my-auto p-3 "/></Link>




          </div>

        </div>



      </div>
    </div>
  );
};

export default HabitPageTitle;
