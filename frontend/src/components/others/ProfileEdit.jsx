import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TbArrowBackUp } from 'react-icons/tb'
import UserDataServices from "../../../services/users"

const ProfileEdit = (props) => {
    const [user, setUser] = useState(props.user)
    const setUserParent = props.setUser

    const navigate = useNavigate()

    const [isFocusedEmail, setIsFocusedEmail] = useState(false)
    const [isFocusedName, setIsFocusedName] = useState(false)

    const [message, setMessage] = useState("")

    const hangleChange = event => {
        const { name, value } = event.target; //get name and value from the target
        setUser(prevState => ({
            ...prevState,
            [name]: value
          }));
    }

    const updateUser = () => {
      if(user.userName == props.user.userName){
        props.setState(0)
        return
      }
      UserDataServices.updateNameById(user.userID, {userName: user.userName})
      .then((response) => {
        setUserParent(prev => ({...prev, userName: user.userName}))
        console.log(response)
        props.setState(0)
      })
      .catch(e => {console.log(e);setMessage("username already exists")})
    }

    return (
      <div className="pt-9 w-[80%] md:w-[60%] lg:w-[45%]  mx-auto">
      {/* Profile Section */}
      <div className="bg-slate-800 border text-gray-300 border-slate-400 rounded-3xl pl-5 pr-4 pt-5 shadow-lg backdrop-filter backdrop-blur-md bg-opacity-30 justify-center pb-9">
  
      <TbArrowBackUp onClick={() => navigate("/Home")} className="py-0  cursor-pointer text-xl md:text-3xl lg:text-3xl rounded-md  inline"> </TbArrowBackUp>
  
      <div className="text-2xl md:text-4xl lg:text-4xl text-center mb-10 mt-2">
            Edit Information
      </div>
      <div className='flex justify-center '>
        <span className=" text-sm text-red-700 bg-white opacity-60 px-0.5 rounded-md">{message}</span>
        </div>
  
      <div className="flex flex-row mx-2 md:mx-2 lg:mx-12">
        {/* labels */}
        <div className="flex flex-col mr-4">
          <div className={`px-3 py-2 mb-5 text-left ${isFocusedName && "text-yellow-200"}`}>
              Username:
          </div>
          <div className={`px-3 py-2 text-left ${isFocusedEmail && "text-yellow-200"}`}>
              Email:
          </div>
        </div>
         {/* fields */}
         <div className="flex flex-col w-full">
         <input 
          onFocus={() => setIsFocusedName(true)}
          onBlur={() => setIsFocusedName(false)}
             id="userName"
             name="userName"
             value={user.userName}
             onChange={hangleChange}
         
         className="h-full mb-5 px-3 py-2 w-full border border-slate-400 bg-transparent  bg-opacity-30 border-t-0 border-x-0 ring-0 focus:ring-0 focus:border-yellow-200">
        
          </input>
          <input 
          onFocus={() => setIsFocusedEmail(true)}
          onBlur={() => setIsFocusedEmail(false)}
            id="email"
            name="email"
            value={user.email}
            onChange={hangleChange}
          
          className="peer/email h-full px-3 py-2 w-full border border-slate-400 bg-transparent bg-opacity-30 border-t-0 border-x-0 ring-0 focus:ring-0 focus:border-yellow-200">
             
          </input>
        </div>
  
      </div>
  
        <div className="flex flex-col items-center mt-8 text-yellow-500">
        <button className='mb-2 hover:font-bold text-green-500' onClick={() => updateUser()}>Save Changes</button>
         <button className='mb-2 hover:font-bold' onClick={() => props.setState(0)}>Cancel</button>
        
         
        </div>
      
      
      </div>
  </div>
    )
}

export default ProfileEdit
