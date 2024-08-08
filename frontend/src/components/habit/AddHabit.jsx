import React, { useState } from 'react'
import Slider from '../Slider';
import { TbArrowBackUp } from "react-icons/tb";
import HabitDataServices from "../../../services/habits"

const AddHabit = (props) => {
    
    const initHabit = {
        desc: "",
        endDate: "",
        archived: "false",
        success: "false",
        discrete: "false",
        userID: props.user.userID
    }
    const [message, setMessage] = useState("")
    const [habit, setHabit] = useState(initHabit)

    const handleInputChange = event => {
        const { name, value } = event.target; //get name and value from the target
        setHabit(prevState => ({
            ...prevState,
            [name]: value
          }));
      };

    const discrete = (on) => {
        console.log("works on toggle")
        setHabit(prevState => ({
            ...prevState,
            discrete: on.toString()
          }))
    }

    const [duration, setDuration] = useState(false);

    const validate = () => {
        if(!habit.desc || !habit.endDate){
            setMessage("Please fill all fields")
            return;
        }
        const date = /^(19|20)\d\d-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;

        if(!duration && !date.test(habit.endDate)){
            setMessage("Invalid Date")
            return;
        }
        const num = /^[1-9]\d*$/;
        if(duration && !num.test(habit.endDate)){
            setMessage("Duration must be a number")
            return;
        }
        else{
            setMessage("")
        }
        if(duration){
            const d = new Date();
            d.setDate(d.getDate() + duration);
            console.log("d : " + d)
            setHabit(prevState => ({
                ...prevState,
                endDate: d
              }));
        }
        // entries validated now sending a post request
        console.log(habit)
        HabitDataServices.createHabit(habit)
            .then((response) => {
            console.log("did work " + response.data);
            props.setAddState(false);
            })
            .catch((error) => {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.error('Response data:', error.response.data);
                    console.error('Response status:', error.response.status);
                    console.error('Response headers:', error.response.headers);
                  } else if (error.request) {
                    // The request was made but no response was received
                    console.error('Request data:', error.request);
                  } else {
                    // Something happened in setting up the request that triggered an Error
                    console.error('Error message:', error.message);
                  }
          });

    }



    return (

    <div className=" pt-9 w-[45%]  mx-auto">
       
      <div className=" bg-slate-800 border text-gray-300 border-slate-400 rounded-md pl-4 pr-4 pt-2 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 justify-center pb-9">

            <TbArrowBackUp onClick={() => {props.setAddState(false)}} className="py-0  cursor-pointer text-3xl p-1 rounded-md  my-auto hover:bg-slate-300 hover:bg-opacity-30 "/>

        <h1 className="text-2xl text-gray-300  text-center rounded-lg mb-6 p-2  ">Start a new habit!</h1>
        <div className='flex justify-center '>
        <span className=" text-sm text-red-700 bg-white opacity-60 px-0.5 rounded-md">{message}</span>
        </div>


        <div className="w-5/6 mx-auto text-gray-300 focus-within:text-yellow-200 flex flex-col items-start">

        <label className='py-0.5'>Habit Description : </label>
          <input type="text" 
                    id="desc"
                    required
                    autoComplete="off"
                    value={habit.desc}
                    onChange={handleInputChange}
                    name="desc" 
          className=" w-full py-0.5 px-0 text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus-text-white focus:border-yellow-200 peer" placeholder="Enter Habit Description"
          />
          
        </div>

        <div className="w-5/6 pt-6 mx-auto text-gray-300 focus-within:text-yellow-200 flex flex-col items-start">

        <label className='py-0.5'>{ !duration ? "Habit End Date" : "Duration in days"} </label>
          <input type="text" 
                    id="endDate"
                    required
                    autoComplete="off"
                    value={habit.endDate}
                    onChange={handleInputChange}
                    name="endDate" 
          className=" w-full py-0.5 px-0 text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus-text-white focus:border-yellow-200 peer" placeholder="yyyy-mm-dd"
          />
          
        </div>
        
        <div className='flex justify-between items-center pt-9 text-gray-300 w-5/6  mx-auto'>
            <div>
            Track Days Only
            </div>
            <div>

            <Slider setter={discrete}/>
            </div>
        </div>

        <div className='flex justify-between items-center pt-5 text-gray-300 w-5/6 mx-auto '>
            <div>
            Duration instead of end date {duration}
            </div>
            <div>

            <Slider setter={setDuration}/>
            </div>
        </div>

        <div className='flex justify-center mt-3'>

        <button className="w-3/5 mb-4 text-[18px] mt-8 rounded-full bg-white text-emerald-800 hover:bg-emerald-600 hover:text-white p-2 transition-colors duration-150  mx-auto bg-opacity-60 shadow-lg " onClick={() => validate()}>Create Habit</button>
        </div>


      </div>
    </div>
  )
}

export default AddHabit
