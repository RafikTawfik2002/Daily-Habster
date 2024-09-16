import React, { useState, useEffect } from 'react'
import { TbArrowBackUp } from 'react-icons/tb'
import { useNavigate } from 'react-router-dom'
import { FaCheck } from "react-icons/fa6";
import DeleteAccount from './DeleteAccount';

const ProfileDisplay = (props) => {
    const user = props.user
    const [deleteOpen, setDeleteOpen] = useState(false)
    const navigate = useNavigate()

    // disable scrolling when modal is open
    useEffect( () => {
      if(deleteOpen){
        document.body.classList.add('overflow-hidden');
      }
      else{
        document.body.classList.remove('overflow-hidden');
      }
    }, [deleteOpen])

    
  return (
    <div className="pt-9 w-[80%] md:w-[60%] lg:w-[45%]  mx-auto">
    {/* Profile Section */}
    <div className="bg-slate-800 border text-gray-300 border-slate-400 rounded-3xl pl-5 pr-4 pt-5 shadow-lg backdrop-filter backdrop-blur-md bg-opacity-30 justify-center pb-7">

    <TbArrowBackUp onClick={() => navigate("/Home")} className="py-0  cursor-pointer text-xl md:text-3xl lg:text-3xl rounded-md "> </TbArrowBackUp>

    <div className="text-2xl md:text-4xl lg:text-4xl text-center mb-4 mt-2">
          Profile Information
    </div>
    <div className='h-7 flex justify-center items-center mb-2'>
    <span className=" text-sm text-red-700 bg-white opacity-60 px-0.5 rounded-md"></span>
    </div>

    <div className="flex flex-row mx-2 md:mx-2 lg:mx-12">
      {/* Username */}
      <div className="flex flex-col mr-4">
        <div className="px-3 py-2 mb-5 text-left">
            Username:
        </div>
        <div className="px-3 py-2 text-left">
            Email:
        </div>
      </div>
       {/* Email */}
       <div className="flex flex-col w-full">
       <div className="h-full mb-5 px-3 py-2 w-full border border-slate-400 bg-slate-900 bg-opacity-30 rounded-2xl">
       {props.user.userName}
        </div>
        <div className="flex justify-between h-full px-3 py-2 w-full border border-slate-400 bg-slate-900 bg-opacity-30 rounded-2xl">
            {props.user.email} <div className='inline text-right text-yellow-200' > <i>{props.user.verified ? <>verified <FaCheck className='inline'/></> : "not verified"}</i> </div>
        </div>
      </div>
 
    </div>

      <div className="flex flex-col items-center mt-8 text-yellow-500">
       <button className='mb-2 hover:bg-opacity-70 hover:bg-gray-500 duration-300 p-1 px-2 rounded-xl' onClick={() => props.setState(1)}>Edit Login</button>
       <div className='flex w-full justify-center relative'>
        <button className=' hover:bg-opacity-70 hover:bg-gray-500 duration-300 p-1 px-2 rounded-xl' onClick={() => props.setState(2)}>Change Password</button>
        <button className=' text-red-600 hover:bg-opacity-70 hover:bg-red-600 hover:text-gray-200 duration-300 p-0.5 px-1 rounded-xl absolute -right-2 top-7' onClick={() => {setDeleteOpen(true)}}>Delete Account</button> </div>
      </div>
    
    
    </div>

    {deleteOpen && <DeleteAccount userID={user.userID} setDeleteOpen={setDeleteOpen} />}
</div>
  )
}

export default ProfileDisplay
