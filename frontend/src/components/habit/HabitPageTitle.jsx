import React, { useEffect, useState } from "react";
import { MdMenuBook } from "react-icons/md";
import { BiUser } from "react-icons/bi";
import { Link } from "react-router-dom";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { GoPlus } from "react-icons/go";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";

import { FaChevronDown } from "react-icons/fa";


const HabitPageTitle = (props) => {

  const user = props.user;
  const addState = props.addState
  const setAddState = props.setAddState

  const addingState = () => {
    if(!user){return;}
    setAddState(!addState);
  }

  const [menu, setMenu] = useState(false)

  const [sortEnd, setSortEnd] = useState('up')
  const [sortStart, setSortStart] = useState('up')
  const [sortProgress, setSortProgress] = useState('up')
  const [sortDuration, setSortDuration] = useState('up')

  const [sort, setSort] = useState('none')

  const startSortSwitch = () => {
      if(sort != 'start'){setSort('start'); return;}

      setSortStart(sortStart == "up" ? "down" : "up")
  }

  const endSortSwitch = () => {
    if(sort != 'end'){setSort('end'); return;}

    setSortEnd(sortEnd == "up" ? "down" : "up")
}

const durationSortSwitch = () => {
  if(sort != 'duration'){setSort('duration'); return;}

  setSortDuration(sortDuration == "up" ? "down" : "up")
}

const progressSortDuration = () => {
  if(sort != 'progress'){setSort('progress'); return;}

  setSortProgress(sortProgress == "up" ? "down" : "up")
}

  useEffect( () => {
    if(sort != "none"){

      props.setSortState([sort, 
        (sort == "end" && sortEnd) || (sort == "start" && sortStart
        || (sort == "progress" && sortProgress) || (sort == "duration" && sortDuration)                    
      )])
    }
  }, [sort, sortStart, sortEnd, sortDuration, sortProgress])
  
  const closeMenu = () => {setMenu(false)}

  useEffect(() => {
    // Add event listener to the body when the dropdown is open
    if (menu) {
      document.body.addEventListener('click', closeMenu);
    }

    // Cleanup: Remove event listener from the body when the dropdown is closed
    else {
      document.body.removeEventListener('click', closeMenu);
    };
  }, [menu]);



  return (
    <>
    <div className="text-white font-thin  lg:w-3/3 w-5/5 "
    
    >
      <div className=" w-3/3 lg:w-2/3 mx-auto rounded-xl rounded-t-none bg-black border border-slate-400 border-x-0 border-t-0 p-2 pt-0 shadow-lg backdrop-filter backdrop-blur-lg bg-opacity-60 ">

        <div className="w-full shadow-2xl bg-slate-600 rounded-xl rounded-t-none text-gray-300 flex justify-center md:justify-between lg:justify-between items-center">

          <div className="lg:flex md:flex hidden pl-5 flex-col p-2">
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


          <div className="mr-2 relative text-base font-bold bg-black bg-opacity-30 hover:bg-slate-800 border-2 duration-300 border-slate-600  rounded-lg flex items-center px-1"
          onClick={(event) => {setMenu(!menu); event.stopPropagation()}}
          >
              <div className="relative cursor-pointer duration-300  px-3 py-3 rounded-lg">
                  {props.tab}   <IoIosArrowDown className="inline"/> 

                  {menu && <div className="mt-2 z-9999 absolute top-full left-1/2 -translate-x-1/2 bg-slate-800 bg-opacity-100 rounded-lg flex flex-col items-center">
                    <div className="px-9 w-full py-1 pt-2 hover:bg-slate-700 duration-300 text-center rounded-lg rounded-b-none"
                    onClick={() => props.setTab("Main")}
                    > Main </div>
                    <div className="px-9 w-full py-1 hover:bg-slate-700 duration-300 text-center"
                     onClick={() => props.setTab("Gold")}
                    > Gold </div>
                    <div className="px-9 w-full py-1 pb-2 hover:bg-slate-700 duration-300 text-center rounded-lg rounded-t-none"
                    onClick={() => props.setTab("Completed")}
                    > Completed </div>
                  
                  
                  </div>}
              </div>
             
          </div>



          

          
          

          

          { (!addState && user) && <Link  onClick={addingState} className="duration-300 h-5/6 my-auto bg-black bg-opacity-30 border-2 border-slate-600 hover:bg-slate-700 rounded-lg mr-2 shadow-2xl">
          <GoPlus className="my-auto p-3 "/></Link>}

            <Link  className="h-5/6 my-auto bg-black bg-opacity-30 border-2 duration-300 border-slate-600 hover:bg-gray-700 rounded-lg mr-2 shadow-2xl" to="/Login">
            <RiLogoutBoxRLine className="my-auto p-3"/></Link>




          </div>

        </div>



      </div>
            {!addState && <div className="flex flex-row justify-center">
          <div className="inline-flex flex-row justify-center text-black text-center mx-auto bg-opacity-80 bg-yellow-200 rounded-lg rounded-t-none">


          <div className="px-4 cursor-default"
          onClick={() => setSort("none")}
          >Sort By</div>

          <div className={`duration-300 px-4 pr-3 cursor-pointer ${sort == "duration" ? "bg-yellow-500" : "hover:bg-yellow-400"}  `}
          onClick={durationSortSwitch}
          >
            Duration {sortDuration == "up" ?<IoIosArrowUp className="pl-1 inline pb-1"/> : <IoIosArrowDown className="pl-1 inline pb-1"/>}
          </div>

        <div className={`duration-300 px-4 pr-3 cursor-pointer ${sort == "progress" ? "bg-yellow-500" : "hover:bg-yellow-400"}  `}
          onClick={progressSortDuration}
          >
            Progress {sortProgress == "up" ?<IoIosArrowUp className="pl-1 inline pb-1"/> : <IoIosArrowDown className="pl-1 inline pb-1"/>}
          </div>

        <div className={`duration-300 px-4 pr-3 cursor-pointer ${sort == "start" ? "bg-yellow-500" : "hover:bg-yellow-400"}  `}
          onClick={startSortSwitch}
          >
            Start Date {sortStart == "up" ?<IoIosArrowUp className="pl-1 inline pb-1"/> : <IoIosArrowDown className="pl-1 inline pb-1"/>}
          </div>

          <div className={`duration-300 px-4 pr-3 cursor-pointer ${sort == "end" ? "bg-yellow-500" : "hover:bg-yellow-400"} rounded-br-lg`}
          onClick={endSortSwitch}
          >
            End Date {sortEnd == "up" ? <IoIosArrowUp className="pl-1 inline pb-1"/> : <IoIosArrowDown className="pl-1 inline pb-1"/>}
          </div>

               </div>
            </div>}
    </div>
    </>
  );
};

export default HabitPageTitle;
