import React from 'react'
import { MdRemoveRedEye } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import DateTools from "../../DateTools";


const SingleHabitDone = (props) => {
    const habit = props.habit

    const deleteHabit = props.deleteHabit;
    const setDel = props.setDel;  
  

    const startDel = () => {
        setDel([true, habit])
      }
  
    return (
      <div className={` flex flex-col font-thin justify-between w-11/12 lg:w-3/5 ${props.habit.duration == props.habit.lastLogin ? " bg-yellow-300 bg-opacity-60 text-black" : "text-gray-300"}  border-gray-800 border-2  bg-opacity-30   rounded-3xl rounded-tl-none rounded-bl-none   blur-30 my-2 backdrop-filter backdrop-blur-xl`}>
        
        <div className="flex flex-row w-full">
  
                    {/*  Main Display of Habit Data */}
                    <div className="flex flex-col w-full py-3 justify-center">
                        <div className={`px-3 mb-1 rounded-lg  text-base md:text-xl lg:text-4xl self-start leading-extra-tight font-normal`}>
                          <span className="font-thin"><i>{props.index + ") "}</i></span>{habit.desc}
                        </div>
  
                        <div className="flex flex-row items-center mt-2">
                                <div className="pl-3 flex flex-col ">
                                 
                                  <div className="text-xs hidden md:hidden lg:block lg:text-sm text-center">Started: &nbsp;&nbsp;&nbsp;&nbsp;</div>
                                  <div className="text-xs hidden md:hidden lg:block lg:text-sm text-center ">Ended: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div> 
  
                                  
                                  
  
                              </div>
                              <div className=" flex flex-row lg:flex-col  ">
                              <div className="self-center text-xs md:text-xs lg:text-sm"><i>{DateTools.dateRender(habit.createdAt)}</i></div>
                              <div className="self-center px-1 lg:hidden text-xs md:text-xs lg:text-sm"> ~ </div>
                                <div className="self-center text-xs md:text-xs lg:text-sm"><i>
                                  {DateTools.dateRender(DateTools.DurationToDate(habit.createdAt, habit.duration))}</i></div>
                              </div>
  
                          
  
                              
                        </div>
  
                        <div className="mt-1 pl-3 text-xs md:text-xs lg:text-sm">
                         <i>Duration: {" " + habit.duration} days</i>
                         
                        </div>
  
  
                      
       
                    </div>
  
                    
  
                    {/*  Left Side of the habit display containing icons */}
                    <div className="flex flex-col justify-between py-3">
                      <div className="flex flex-row pr-3">
  
                      <div 
                        className="duration-300 p-2 mr-1 cursor-pointer text-md lg:text-2xl my-auto bg-black bg-opacity-30 border-2 border-slate-600 hover:bg-gray-600 rounded-lg shadow-2xl"
                        onClick={() => {props.setView([true, habit])}}
                        >
                      <MdRemoveRedEye/>
                        </div>

                      <div 
                      className="duration-300 p-2 cursor-pointer text-md lg:text-2xl my-auto bg-black bg-opacity-30 border-2 border-slate-600 hover:bg-slate-600 rounded-lg shadow-2xl"
                      onClick={startDel}
                      >
                    <RiDeleteBin6Line/>
                      </div>
  
                    
  
                      </div>
  
                    
  
                    </div>
      
          
        </div>


            
      </div>
    );
}

export default SingleHabitDone
