import React from "react";
import { Link } from "react-router-dom";
import { BiUser } from "react-icons/bi"
import {AiOutlineUnlock } from "react-icons/ai"
import { MdMenuBook } from "react-icons/md";
import HabitDataService from "../../../services/users.js"
import { useState, useEffect } from "react";
import { IoEyeOffOutline } from "react-icons/io5";
import { FiEye } from "react-icons/fi";
import Spinner from "../Spinner.jsx";


const Login = (props) => {

  const toRegister = () => {
    props.set('register') // switch to register page
  }
  const initialUserState = {
    username: "",
    password: "",
  };

  // useEffect(()=>{
  //   if(localStorage.getItem('user')){
  //     props.filled(JSON.parse(localStorage.getItem('user')));
  //   }
  // },[])
  
  const [loading, setLoading] = useState(false)

  const [user, setUser] = useState(initialUserState);
  const [message, setMessage] = useState("") 

  const [passHidden, setPassHidden] = useState(true)


  const validate = async () => {
    if(!user.username || !user.password){
      setMessage("Please fill all fields")
      return;
    }

    try{
      // check if user exists
      // const isUser = await HabitDataService.getByUsername(user.username); 
      setLoading(true)
      const isAuthentic = await HabitDataService.authenticate({username: user.username, password: user.password});
      console.log("LOGIN DATA IS")
      console.log(isAuthentic.data)
      localStorage.setItem('user', JSON.stringify(isAuthentic.data))
        
      await props.filled(isAuthentic.data);
    }
    catch(e){
      setMessage("Wrong username or password")
      setTimeout(() => setLoading(false), 200)
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
    { loading ? <Spinner /> : <div>
      <div className="bg-slate-800 border border-slate-400 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative">
      <div className="text-2xl text-gray-300 shadow-2xl rounded-lg bg-opacity-10 text-center mb-4 p-2"> <MdMenuBook className="inline -translate-y-1"/> Daily Habster</div>
        <h1 className="text-4xl text-white font-bold text-center rounded-lg mb-6 p-2">Login</h1>
        {message && <div className="text-center mb-3 "><span className="px-2 py-1 rounded-lg bg-opacity-60 bg-gray-200 text-sm text-red-700">{message}</span></div>}




        <div className="flex flex-col items-start relative">

        <label className='py-0.5 text-xs'>Username </label>
          <input type="text" 
                    id="username"
                    required
                    autoComplete="on"
                    value={user.username}
                    onChange={handleInputChange}
                    name="username" 
          className=" block w-72 py-0.5 px-0 text-sm  bg-transparent border-0 border-b-2 border-gray-300 focus:border-gray-300 focus:ring-0 " placeholder="Enter your username"
          />
          <BiUser className="absolute top-6 right-1"/>
          
        </div>

        <div className="w-full mt-5 mb-5 flex flex-col items-start relative">

        <label className='py-0.5 text-xs '>Password </label>
        <input type={passHidden ? "password" : "text"}
                    id="password"
                    required
                    autoComplete="on"
                    value={user.password}
                    onChange={handleInputChange}
                    name="password" 
          className=" block w-72 py-0.5 px-0 text-sm  bg-transparent border-0 border-b-2 border-gray-300 focus:border-gray-300 focus:ring-0 " placeholder="Enter your passowrd"
          />
         {passHidden ? <IoEyeOffOutline className="cursor-pointer absolute top-6 right-1" onClick={() => setPassHidden(false)}/> : <FiEye className=" cursor-pointer absolute top-6 right-1" onClick={() => setPassHidden(true)}/>}
          
        </div>




        <button className="w-full mb-4 text-[18px] mt-6 rounded-full bg-white text-emerald-800 hover:bg-emerald-600 hover:text-white py-2 transition-colors duration-150" onClick={()=>validate()}>Login</button>

        <div className="text-center text-sm">
          <span className="m-4">Don't have an account? <Link className="text-yellow-200" onClick={() => toRegister()}>Sign up</Link></span>
        </div>
        <div className="mt-2 text-center text-sm">
          <span className="m-4 "> Forgot <Link className="text-yellow-200" to="/ForgotPage">useranme / password</Link> ?</span>
        </div>


      </div>
    </div>}
    </div>

  )
}

export default Login
