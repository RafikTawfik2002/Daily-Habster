import React from 'react'
import { TbArrowBackUp } from 'react-icons/tb'
import { useNavigate } from 'react-router-dom'

const ProfileDisplay = (props) => {
    const user = props.user
    const navigate = useNavigate()
  return (
    <div className="pt-9 w-[80%] md:w-[60%] lg:w-[45%]  mx-auto">
    {/* Profile Section */}
    <div className="bg-slate-800 border text-gray-300 border-slate-400 rounded-3xl pl-5 pr-4 pt-5 shadow-lg backdrop-filter backdrop-blur-md bg-opacity-30 justify-center pb-9">

    <TbArrowBackUp onClick={() => navigate("/Home")} className="py-0  cursor-pointer text-xl md:text-3xl lg:text-3xl rounded-md "> </TbArrowBackUp>

    <div className="text-2xl md:text-4xl lg:text-4xl text-center mb-10 mt-2">
          Profile Information
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
        <div className="h-full px-3 py-2 w-full border border-slate-400 bg-slate-900 bg-opacity-30 rounded-2xl">
            {props.user.email}
        </div>
      </div>

    </div>

      <div className="flex flex-col items-center mt-8 text-yellow-500">
       <button className='mb-2 hover:font-bold' onClick={() => props.setState(1)}>Edit Login</button>
       <button className='hover:font-bold' onClick={() => props.setState(2)}>Change Password</button>
      </div>
    
    
    </div>
</div>
  )
}

export default ProfileDisplay
