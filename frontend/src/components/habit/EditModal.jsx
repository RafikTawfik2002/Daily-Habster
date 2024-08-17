import React, { useEffect, useState } from "react";
import { TbArrowBackUp } from "react-icons/tb";
import HabitDataServices from "../../../services/habits"
import Slider from "../Slider";
import DateTools from "../../DateTools";


const EditModal = (props) => {

    const DateToInput = DateTools.DateToInput
    const DateToDuration = DateTools.DateToDuration
    const DurationToDate = DateTools.DurationToDate


  const [habit, setHabit] = useState(props.habit)

  useEffect(() => {setHabit(prevState => ({...prevState, endDate: DateToInput(habit.endDate)}))}, [])

  
  const [duration, setDuration] = useState(DateToDuration(habit.createdAt, habit.endDate))

  const [discrete, setDiscrete] = useState(habit.discrete)


  const handleInputChange = event => {
    const { name, value } = event.target; //get name and value from the target
    if(value[value.length - 1] == "\n"){return;}
    //console.log(value)
    setHabit(prevState => ({
        ...prevState,
        [name]: value
      }));
  };


  //console.log("the date is displaying correctly: " + DateToInput(habit.endDate))

  // updating habit

  HabitDataServices.updateHabit


  return (
    <div
      className="z-50 bg-black bg-opacity-70 fixed top-0 bottom-0 left-0 right-0  flex flex-row justify-center items-center"
      onClick={props.setEdit}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className={`flex flex-col font-thin w-[80%] md:w-[65%] lg:w-[45%] text-gray-200  rounded-3xl border-blue-900  bg-blue-900  border-2 bg-opacity-60 blur-30 backdrop-filter backdrop-blur-xl`}
      >

        <div className="my-12 mb-8 text-center lg:text-2xl md:text-xl text-md font-bold"> Edit Habit</div>

        <div className="flex flex-col mx-14 lg:text-lg md:text-lg text-md">

                <div>
                <label className="p-3 pt-0 pl-0">Habit Description:</label>
                <textarea 
                className="bg-blue-950 rounded-xl w-full mt-2 text-2xl"
                name="desc"
                value={habit.desc}
                onChange={handleInputChange}
                >
                    
                
                </textarea>
                </div>


                <div className="mt-3">
                <span className="text-xs">End date or duration can only be extended</span><br/><br/>
                <label className='p-3 pl-0'>{ "Habit End Date:" }  </label>
                <input type="date"
                    name='endDate'
                    value={habit.endDate}
                    onChange={handleInputChange}
                    className="block bg-blue-950 rounded-xl w-full mt-2" 
                    // placeholder={ !duration ? "yyyy-mm-dd" : "Enter number of days"}
                />
                </div>

                <div className="mt-3">
                <label className='p-3 pl-0'>{"Duration in days:"}  </label>
                <input type="text"
                    name='duration'
                    value={duration}
                    onChange={handleInputChange}
                    className="block bg-blue-950 rounded-xl w-full mt-2" 
                    // placeholder={ !duration ? "yyyy-mm-dd" : "Enter number of days"}
                />
                </div>




            <div className='flex justify-between items-center pt-9 text-gray-300 w-5/6  mx-auto'>
                <div>
                Track Days Only
                </div>
                <div>

                <Slider setter={setDiscrete} initial={habit.discrete}/>
                </div>
            </div>




            <div className="flex flex-row pt-5 mb-8 mt-8 items-center justify-evenly">
                <button
                className="py-2 rounded-xl border-green-500 duration-300 hover:bg-green-600 border bg-green-700 text-white w-[40%] my-3 mx-2"
                >
                    Save Changes
                </button>

                <button
                className="py-2 rounded-xl  border-gray-400 duration-300 hover:bg-gray-600 border bg-gray-700 text-white w-[40%] my-3 mx-2"
                onClick={props.setEdit}
                >
                    Cancel
                </button>
            </div>


            




           

        </div>
        
      </div>
    </div>
  );
};

export default EditModal;
