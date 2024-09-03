import React, { useEffect, useState } from "react";
import { MdMenuBook } from "react-icons/md";
import { BiUser } from "react-icons/bi";
import { Link } from "react-router-dom";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { GoPlus } from "react-icons/go";

import { IoIosArrowDown } from "react-icons/io";
import { IoMenu } from "react-icons/io5";

import { VscFeedback } from "react-icons/vsc";
import { GrStatusInfo } from "react-icons/gr";
import { TbArrowBackUp } from "react-icons/tb";

const OthersPageTitle = () => {

    const [settings, setSettings] = useState(false);

    const closeSetting = () => setSettings(false);
    useEffect(() => {
      // Add event listener to the body when the dropdown is open
      if (settings) {
        document.body.addEventListener("click", closeSetting);
      }
  
      // Cleanup: Remove event listener from the body when the dropdown is closed
      else {
        document.body.removeEventListener("click", closeSetting);
      }
    }, [settings]);

  return (
    <div className="fixed inset-x-0 top-0 pt-0 z-50 mb-32">
    <div className="text-white font-thin  w-full ">
    <div className=" w-full lg:w-2/3 mx-auto rounded-xl rounded-t-none bg-slate-700 border border-slate-400 border-x-0 border-t-0 p-2 pt-0 shadow-lg ">
      <div className="w-full shadow-2xl bg-slate-600 rounded-xl rounded-t-none text-gray-300 flex justify-between items-center">
        <div className="flex pl-5 flex-col p-2">
          <div className=" text-xl md:text-2xl lg:text-4xl">
            {" "}
            <MdMenuBook className="inline -translate-y-1" /> Habit Tracker
          </div>
        </div>

        <div className="pr-2 flex flex-row text-5xl lg:text-6xl py-2">
          


          {/* Menu for secondary tools */}
          <div
            onClick={(event) => {
              setSettings((prev) => !prev);
              event.stopPropagation();
            }}
            className={` cursor-pointer relative h-5/6   ${
              settings
                ? "bg-slate-800 rounded-b-none"
                : "bg-black bg-opacity-30"
            } border-2 duration-300 border-slate-600  rounded-lg mr-2 shadow-2xl hover:bg-slate-800`}
          >
            <IoMenu className="my-auto p-3" />
            {settings && (
              <div className="border border-white w-48 text-xs font-bold z-50 absolute top-full left-1/2 -translate-x-1/2 bg-slate-800 bg-opacity-100 rounded-lg flex flex-col items-center">

                <button className=" text-left px-9 w-full py-1 hover:bg-slate-700 duration-300 mx-1 mt-2">

                  <Link to="/Profile"> <BiUser className="inline pb-1  mr-2 text-lg"/>Profile </Link>
                  
                </button>

                <button className="text-left px-9 w-full py-1 hover:bg-slate-700 duration-300 mx-1">
                  {" "}
                  <Link to="/Login"> <GrStatusInfo className="inline pb-1  mr-2 text-lg"/> <span className="text-xs">  About Us </span></Link>
                  
                </button>

                <button className="mb-2 text-left px-9 w-full py-1 hover:bg-slate-700 duration-300 mx-1">
                  <Link to="/Login"> <VscFeedback className="inline pb-1  mr-2 text-lg"/> <span className="text-xs">  Leave a review </span></Link>
                </button>

                <button
                  className="border border-slate-900 border-b-0 border-x-0  text-left px-9 w-full py-2 hover:bg-slate-700 duration-300  mx-1 rounded-lg rounded-t-none"
                
                >
                  <Link to="/Login " className=""> <RiLogoutBoxRLine className="inline pb-1  mr-2 text-lg"/>Logout </Link>
                 
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
   
  </div>
  </div>
  )
}

export default OthersPageTitle
