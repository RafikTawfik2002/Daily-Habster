import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { BiUser } from "react-icons/bi"
import {AiOutlineUnlock } from "react-icons/ai"
import { MdMenuBook } from "react-icons/md";
import { useState } from "react";
import HabitDataService from "../../../services/users.js"
import PassValidate from "../PassValidate.jsx";

import { IoEyeOffOutline } from "react-icons/io5";
import { FiEye } from "react-icons/fi";

const Register = (props) => {
  const [message, setMessage] = useState("") 

  const [validPass, setValidPass] = useState(false)

  const [pass, setPass]= useState(true)
  const [confPass, setConPass] = useState(true)

  const initialUserState = {
    email: "",
    username: "",
    password: "",
    confirmpassword: ""
  };
  
  const validateEmail = email => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

  const [user, setUser] = useState(initialUserState);

  useEffect(() =>{
    setUser(initialUserState)
  },[])

  const toLog = () => {
    props.set('log')
  }

  const validate = async () => {
    if(!user.email || !user.username || !user.password || !user.confirmpassword){
      setMessage("Please fill all fields")
      return
    }
    else if(!validateEmail(user.email)){
      setMessage("Email not valid")
      return
    }
    else if(user.password != user.confirmpassword){
      setMessage("Confirm password does not match password")
      return
    }
    else if(!validPass){
      setMessage("Password is not strong enough")
      return
    }

    const userArg = {
      userID : Math.floor(Math.random() * 10),
      userName : user.username,
      email: user.email,
      passWord: user.password
    }
    try{
      const newUser = await HabitDataService.createUser(userArg);

      props.filled(newUser.data);
    }
    catch(e){
      setMessage("username may be taken")
      console.log(e)
    }


  }


  const handleInputChange = event => {
    const { name, value } = event.target; //get name and value from the target
    setUser({ ...user, [name]: value });
  };


  return (
    <div
    className="text-white h-[100vh] flex justify-center items-center bg-cover"
     
  >
    <div>
      <div className="bg-slate-800 border border-slate-400 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative">
      <div className="text-2xl text-gray-300 shadow-2xl rounded-lg bg-opacity-10 text-center mb-4 p-2"> <MdMenuBook className="inline -translate-y-1"/> Habit Tracker</div>

        <h1 className="text-4xl text-white font-bold text-center mb-6">Sign Up</h1>
        {message && <div className="text-center mb-3 "><span className="px-2 py-1 rounded-lg bg-opacity-60 bg-gray-200 text-sm text-red-700">{message}</span></div>}


        <div className="relative my-4">
          <input type="text"
           id="username"
           required
           autoComplete="off"
           value={user.username}
           onChange={handleInputChange}
           name="username" 
          className="block w-full py-2.3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus-text-white focus:border-blue-600 peer" placeholder=""
          />
          <label htmlFor=""
          className="absolute text-sm text-white duration-150 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6" 
          >Username</label>
          <BiUser className="absolute top-4 right-4"/>
        </div>


        <div className="relative my-4">
          <input type="email" 
          id="email"
          required
          autoComplete="on"
          value={user.email}
          onChange={handleInputChange}
          name="email" 
          className="block w-full py-2.3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus-text-white focus:border-blue-600 peer" placeholder=""
          />
          <label htmlFor=""
          className="absolute text-sm text-white duration-150 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6" 
          >Email</label>
          <BiUser className="absolute top-4 right-4"/>
        </div>

        <div className="relative my-4">
          <input type={pass ? "password" : "text"}
          required
          value={user.password}
          onChange={handleInputChange}
          name="password" 
          autoComplete="off"
          className="block w-full py-2.3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus-text-white focus:border-blue-600 peer" placeholder=""
          />
          <label htmlFor=""
          className="absolute text-sm text-white duration-150 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6" 
          >New Password</label>
          <div className="absolute top-4 right-4 cursor-pointer" onClick={() => setPass(prev => !prev)}>{pass ? <IoEyeOffOutline /> : <FiEye /> }</div>
        </div>
        <div className="relative my-4">
          <input type={confPass ? "password" : "text"}
                    id="confirmpassword"
                    required
                    value={user.confirmpassword}
                    onChange={handleInputChange}
                    name="confirmpassword"
          className="block w-full py-2.3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus-text-white focus:border-blue-600 peer" placeholder=""
          />
          <label htmlFor=""
          className="absolute text-sm text-white duration-150 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6" 
          >Confirm New Password</label>
          <div className="absolute top-4 right-4 cursor-pointer" onClick={() => setConPass(prev => !prev)}>{confPass ? <IoEyeOffOutline /> : <FiEye /> }</div>
        </div>

        <div className="mt-10 flex flex-col">
          <div className="text-center mb-2 text-sm">New Password must contain </div> 
          <div className="flex justify-center"><PassValidate password={user.password} setValid={setValidPass} valid={validPass} /></div>
        </div>


        <button className="w-full mb-4 text-[18px] mt-6 rounded-full bg-white text-emerald-800 hover:bg-emerald-600 hover:text-white py-2 transition-colors duration-150" onClick={() => validate()}>Create Account</button>

        <div>
          <span className="m-4">Have an account? <Link className="text-blue-500" onClick={() => toLog()} replace="true">Login</Link></span>
        </div>

      </div>
    </div>
</div>
  )
}

export default Register
