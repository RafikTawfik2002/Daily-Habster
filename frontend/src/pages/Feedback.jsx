
import { useNavigate } from 'react-router-dom';
import OthersPageTitle from "../components/OthersPageTitle";
import React, { useEffect, useState } from "react";

import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { MdOutlineCheckBox } from "react-icons/md";

import { TbArrowBackUp } from "react-icons/tb";

import HabitServices from "../../services/habits"

const Feedback = (props) => {
  const user = props.user


    const [review, setReview] = useState("")
    const [anonymous, setAnonymous] = useState(false)
    const [success, setSuccess] = useState(false)

    const navigate = useNavigate()

    const handleInputChange = event => {
        const { value } = event.target; //get name and value from the target
        setReview(value);
    }

    useEffect(() => {
        if(!user){
          navigate("/")
        }
  
      }, [])

      const submitReview = () => {
        if(success){return}
        if(!review){return}
        const body = {
            review: review
        }
        if(!anonymous){
            body.userID = user.userID
        }
        HabitServices.addReview(body)
        .then((response) => {setSuccess(true); console.log("REVIEW POSTED SUCCESSFULLY")})
        .catch((error) => console.log(error))
      }
    const active = () => {
        return (<> <div className="text-xl md:text-2xl lg:text-2xl text-center mb-4 mt-2">
            Leave a review
          </div>
  
          <div className="text-sm md:text-md lg:text-md text-center mb-10 mt-2">
            Thank you for using my habit tracker Daily Habster. Your feedback on the tool and its usefulness is truly appreciated and can also be submitted anonymously  
          </div>
          <div className='flex justify-center mb-5'>
          <textarea 
          name="review"
          value={review}
          onChange={handleInputChange}
          placeholder='Enter Your Feedback'
          className='w-[80%] h-40 rounded-xl bg-opacity-20 bg-black' >
              
          </textarea>
          </div>
  
          <div className={`flex justify-center items-center text-lg md:text-xl lg:text-2xl ${anonymous && "text-green-500"}`}>
              <div>Anonymous{!anonymous && "?"} </div>
              <div className='ml-3 cursor-pointer' onClick={() => setAnonymous(prev => !prev)}>{!anonymous ? <MdCheckBoxOutlineBlank /> : <MdOutlineCheckBox />}</div>
          </div>
  
          <div className="flex flex-col items-center mt-8 text-yellow-500">
            <button
              className="mb-2 hover:font-bold text-green-500 rounded-lg bg-opacity-30 bg-slate-500 px-3 py-1"
              onClick={() => {submitReview()}}
            >
              Submit
            </button>
            </div> </>)
    }

    const succesState = () => {
        return (<>
            <div className="text-xl md:text-2xl lg:text-2xl text-center mb-10 mt-2">
                  Review Submitted Successfully 
                </div>
                <div className="flex flex-col items-center mt-8 text-yellow-500">
                <button
                    className="mb-2 hover:font-bold text-slate-300 rounded-lg bg-opacity-30 bg-slate-500 px-3 py-1"
                    onClick={() => {setReview(""); setSuccess(false)}}
                  >
                    Leave another review
                  </button>
                  <button
                    className="mb-2 hover:font-bold text-green-500 rounded-lg bg-opacity-30 bg-slate-500 px-3 py-1"
                    onClick={() => navigate("/Home")}
                  >
                    Go Back to Homepage
                  </button>
                  </div>
              
            </>)
    }
  return (
    <>
      <OthersPageTitle />
      <div className="relative overflow-hidden md:pt-28 lg:pt-32 pt-24 ">
        {user && <div className="pt-9 w-[80%] md:w-[65%] lg:w-[45%]  mx-auto">
          {/* Profile Section */}
          <div className="bg-slate-800 border text-gray-300 border-slate-400 rounded-3xl pl-5 pr-4 pt-5 shadow-lg backdrop-filter backdrop-blur-md bg-opacity-30 justify-center pb-9">
            <TbArrowBackUp
              onClick={() => navigate("/Home")}
              className="py-0  cursor-pointer text-xl md:text-3xl lg:text-3xl rounded-md  inline"
            >
              {" "}
            </TbArrowBackUp>
            {success ?  succesState(): active()}
           

          </div>
        </div>}
      </div>
    </>
  );
};

export default Feedback;
