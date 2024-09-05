
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import OthersPageTitle from "../components/OthersPageTitle";
import React, { useEffect, useState } from "react";
import { TbArrowBackUp } from "react-icons/tb";
import { MdMail } from "react-icons/md";
import { HiOutlineMail } from "react-icons/hi";

import { SiGithub } from "react-icons/si";


const AboutUs = (props) => {
  const navigate = useNavigate()
  const user = props.user
  useEffect(() => {
    if(!user){
      navigate("/Home")
    }

  }, [])

  return (
    <>
    <OthersPageTitle />
    <div className="relative overflow-hidden md:pt-28 lg:pt-32 pt-24 ">
        <div className="pt-9 w-[80%] md:w-[65%] lg:w-[45%]  mx-auto">
          {/* Profile Section */}
          <div className="bg-slate-800 border text-gray-300 border-slate-400 rounded-3xl pl-5 pr-4 pt-5 shadow-lg backdrop-filter backdrop-blur-md bg-opacity-30 justify-center pb-7">
            <TbArrowBackUp
              onClick={() => navigate("/Home")}
              className="py-0  cursor-pointer text-xl md:text-3xl lg:text-3xl rounded-md  inline"
            >
              {" "}
            </TbArrowBackUp>
           
            <div className="text-xl md:text-2xl lg:text-2xl text-center mb-5 mt-2">
                  About the app and the developper 
                </div>

                <div className='rounded-xl p-4 bg-slate-800 bg-opacity-50 border border-gray-600'>
                <div className="text-sm md:text-md lg:text-md text-left mb-4 mt-2">
            Thank you for using my habit tracker Daily Habster. This app started as a small tool I made for myself after deciding to expanded into the tool you are using right now.
            </div>
            <div className="text-sm md:text-md lg:text-md text-left mb-4 mt-2">
            I am a software developper and I'm always looking for exciting work and projects to work on and to collaborate with other developpers. 
            </div>
            <div className="text-sm md:text-md lg:text-md text-left mb-5 mt-2">
            Please feel free to reach out to me if you are interested in working together.
          </div>
          </div>


          <div className="p-4 flex flex-col items-center rounded-sm mb-0">
          <Link className='w-80' to="https://github.com/RafikTawfik2002" target="_blank" rel="noopener noreferrer">
            <div className=' border border-gray-500 bg-black hover:bg-gray-600 duration-300 bg-opacity-50  rounded-xl hover:border-white mb-5'>
              
              <div className='   duration-300  h-full rounded-xl px-3 py-2 pr-6'>
              <SiGithub className='inline rounded-md text-6xl p-1  mr-2 ' />
                /RafikTawfik2002</div>
            </div>
            </Link>

          <a className="w-80"href={`mailto:rafikaymanramzy@gmail.com`}>
            <div className='flex-1 border border-gray-500 bg-opacity-50  bg-black hover:bg-gray-600 duration-300 rounded-xl hover:border-white'>
              
              <div className='  duration-300  h-full rounded-xl px-3 py-2 pr-6'>
              <HiOutlineMail className='inline rounded-md text-6xl p-1  mr-2 ' />
                rafikaymanramzy@gmail.com</div>
            </div>
            </a>
            
          

            
          </div>
                
                
                
               
           

          </div>
        </div>
      </div>
    
    </>
  )
}

export default AboutUs
