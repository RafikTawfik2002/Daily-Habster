import React, { useEffect, useState } from "react";
import { MdMenuBook } from "react-icons/md";
import { BiUser } from "react-icons/bi";
import { Link } from "react-router-dom";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { GoPlus } from "react-icons/go";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { IoMenu } from "react-icons/io5";
import { VscFeedback } from "react-icons/vsc";
import { GrStatusInfo } from "react-icons/gr";


const HabitPageTitle = (props) => {
  const user = props.user;
  const addState = props.addState;
  const setAddState = props.setAddState;

  const addingState = () => {
    if (!user) {
      return;
    }
    setAddState(!addState);
  };

  const [menu, setMenu] = useState(false);
  const [settings, setSettings] = useState(false);

  const [sortEnd, setSortEnd] = useState("up");
  const [sortStart, setSortStart] = useState("up");
  const [sortProgress, setSortProgress] = useState("up");
  const [sortDuration, setSortDuration] = useState("up");

  const [sort, setSort] = useState("none");

  const startSortSwitch = () => {
    if (sort != "start") {
      setSort("start");
      return;
    }

    setSortStart(sortStart == "up" ? "down" : "up");
  };

  const endSortSwitch = () => {
    if (sort != "end") {
      setSort("end");
      return;
    }

    setSortEnd(sortEnd == "up" ? "down" : "up");
  };

  const durationSortSwitch = () => {
    if (sort != "duration") {
      setSort("duration");
      return;
    }

    setSortDuration(sortDuration == "up" ? "down" : "up");
  };

  const progressSortDuration = () => {
    if (sort != "progress") {
      setSort("progress");
      return;
    }

    setSortProgress(sortProgress == "up" ? "down" : "up");
  };

  useEffect(() => {
    if (sort != "none") {
      props.setSortState([
        sort,
        (sort == "end" && sortEnd) ||
          (sort == "start" && sortStart) ||
          (sort == "progress" && sortProgress) ||
          (sort == "duration" && sortDuration),
      ]);
    }
  }, [sort, sortStart, sortEnd, sortDuration, sortProgress]);

  const closeMenu = () => {
    setMenu(false);
  };

  useEffect(() => {
    // Add event listener to the body when the dropdown is open
    if (menu || settings) {
      document.body.addEventListener("click", closeMenu);
    }

    // Cleanup: Remove event listener from the body when the dropdown is closed
    else {
      document.body.removeEventListener("click", closeMenu);
    }
  }, [menu]);

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

  useEffect(() => {
    if (!addState) {
      props.setTab("Main");
    }
  }, [addState]);



  return (
    <div className="text-white font-thin  w-full ">
      <div className=" w-full lg:w-2/3 mx-auto rounded-xl rounded-t-none bg-slate-700 border border-slate-400 border-x-0 border-t-0 p-2 pt-0 shadow-lg ">
        <div className="w-full shadow-2xl bg-slate-600 rounded-xl rounded-t-none text-gray-300 flex justify-between items-center">
          <Link to="/Home">
            <div className="flex pl-5 flex-col p-2">
              <div className=" text-lg lg:text-4xl">
                {" "}
                <MdMenuBook className="inline -translate-y-1" /> Daily Habster
              </div>
              <div className="text-sm lg:text-xl">
                {" "}
                <BiUser className="inline -translate-y-0.5" />{" "}
                {user ? user.userName : "Log in to see habits"}
              </div>
            </div>
          </Link>

          <div className="pr-2 flex flex-row text-5xl lg:text-6xl">



            {!addState && (
              <div
                className={`mr-2 text-base cursor-pointer font-bold border-2 ${
                  menu
                    ? "bg-slate-800 rounded-b-none"
                    : "bg-black bg-opacity-30"
                }  duration-300 border-slate-600  rounded-lg flex items-center px-1 hover:bg-slate-800`}
                onClick={(event) => {
                  setMenu(!menu);
                  event.stopPropagation();
                  setSettings(false);
                }}
              >
                <div className="relative duration-300 items-center  px-3 py-3 rounded-lg">
                  <button>
                    {" "}
                    {props.tab} <IoIosArrowDown className="inline" />{" "}
                  </button>

                  {menu && (
                    <div className="border border-white mt-1 z-50 absolute top-full left-1/2 -translate-x-1/2 bg-slate-800 bg-opacity-100 rounded-lg flex flex-col items-center">
                      <div
                        className="px-9 w-full py-1 pt-2 hover:bg-slate-700 duration-300 mx-1 rounded-lg rounded-b-none"
                        onClick={() => props.setTab("Main")}
                      >
                        {" "}
                        Main{" "}
                      </div>
                      <div
                        className="px-9 w-full py-1 hover:bg-slate-700 duration-300 mx-1"
                        onClick={() => props.setTab("Gold")}
                      >
                        {" "}
                        Gold{" "}
                      </div>
                      <div
                        className="px-9 w-full py-1 pb-2 hover:bg-slate-700 duration-300  mx-1 rounded-lg rounded-t-none"
                        onClick={() => props.setTab("Completed")}
                      >
                        {" "}
                        Completed{" "}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {!addState && user && (
              <Link
                onClick={addingState}
                className="duration-300 h-5/6 my-auto bg-black bg-opacity-30 border-2 border-slate-600 hover:bg-slate-800 rounded-lg mr-2 shadow-2xl"
              >
                <GoPlus className="my-auto p-3 " />
              </Link>
            )}

            {/* Menu for secondary tools */}
            <div
              onClick={(event) => {
                setSettings((prev) => !prev);
                event.stopPropagation();
                setMenu(false);
              }}
              className={` cursor-pointer relative h-5/6  ${
                settings
                  ? "bg-slate-800 rounded-b-none"
                  : "bg-black bg-opacity-30"
              } border-2 duration-300 border-slate-600  rounded-lg mr-2 shadow-2xl hover:bg-slate-800`}
            >
              <IoMenu className="my-auto p-3" />
              {settings && (
                <div className="border border-white w-48 text-xs font-bold z-50 absolute top-full left-1/2 -translate-x-1/2 bg-slate-800 bg-opacity-100 rounded-lg flex flex-col items-center">
                  <Link to="/Profile" className="w-full">
                    <button className=" text-left px-9 w-full py-1 hover:bg-slate-700 duration-300  mt-2">
                      <BiUser className="inline pb-1  mr-2 text-lg" />
                      Profile
                    </button>
                  </Link>

                  <Link to="/AboutUs" className="w-full">
                    <button className="text-left px-9 w-full py-1 hover:bg-slate-700 duration-300 ">
                      {" "}
                      <GrStatusInfo className="inline pb-1  mr-2 text-lg" />{" "}
                      <span className="text-xs"> About Us </span>
                    </button>
                  </Link>

                  <Link to="/Feedback" className="w-full">
                    <button className="mb-2 text-left px-9 w-full py-1 hover:bg-slate-700 duration-300">
                      <VscFeedback className="inline pb-1  mr-2 text-lg" />{" "}
                      <span className="text-xs"> Leave a review </span>
                    </button>
                  </Link>

                  <Link to="/Login" className="w-full">
                    <button className="border border-slate-900 border-b-0 border-x-0  text-left px-9 w-full py-2 hover:bg-slate-700 duration-300  rounded-lg rounded-t-none">
                      <RiLogoutBoxRLine className="inline pb-1  mr-2 text-lg" />
                      Logout
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {!addState && (
        <div className="flex flex-row justify-center">
          <div className="inline-flex flex-row justify-center text-black text-xs md:text-base lg:text-base text-center mx-auto bg-opacity-80 bg-yellow-200 rounded-lg rounded-t-none">
            <div
              className="px-4 cursor-default"
              onClick={() => setSort("none")}
            >
              Sort By
            </div>

            <div
              className={`duration-300 px-4 pr-3 cursor-pointer ${
                sort == "duration" ? "bg-yellow-500" : "hover:bg-yellow-400"
              }  `}
              onClick={durationSortSwitch}
            >
              Duration{" "}
              {sortDuration == "up" ? (
                <IoIosArrowUp className="pl-1 inline pb-1" />
              ) : (
                <IoIosArrowDown className="pl-1 inline pb-1" />
              )}
            </div>

            <div
              className={`duration-300 px-4 pr-3 cursor-pointer ${
                sort == "progress" ? "bg-yellow-500" : "hover:bg-yellow-400"
              }  `}
              onClick={progressSortDuration}
            >
              Progress{" "}
              {sortProgress == "up" ? (
                <IoIosArrowUp className="pl-1 inline pb-1" />
              ) : (
                <IoIosArrowDown className="pl-1 inline pb-1" />
              )}
            </div>

            <div
              className={`duration-300 px-4 pr-3 cursor-pointer ${
                sort == "start" ? "bg-yellow-500" : "hover:bg-yellow-400"
              }  `}
              onClick={startSortSwitch}
            >
              Start Date{" "}
              {sortStart == "up" ? (
                <IoIosArrowUp className="pl-1 inline pb-1" />
              ) : (
                <IoIosArrowDown className="pl-1 inline pb-1" />
              )}
            </div>

            <div
              className={`duration-300 px-4 pr-3 cursor-pointer ${
                sort == "end" ? "bg-yellow-500" : "hover:bg-yellow-400"
              } rounded-br-lg`}
              onClick={endSortSwitch}
            >
              End Date{" "}
              {sortEnd == "up" ? (
                <IoIosArrowUp className="pl-1 inline pb-1" />
              ) : (
                <IoIosArrowDown className="pl-1 inline pb-1" />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HabitPageTitle;
