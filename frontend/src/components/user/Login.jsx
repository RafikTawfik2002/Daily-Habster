import React from "react";
import { Link } from "react-router-dom";
import { BiUser } from "react-icons/bi"
import {AiOutlineUnlock } from "react-icons/ai"
import { MdMenuBook } from "react-icons/md";
import HabitDataService from "../../../services/users.js"
import { useState } from "react";


const Login = (props) => {

  const toRegister = () => {
    props.set('register') // switch to register page
  }
  const initialUserState = {
    username: "",
    password: "",
  };
  

  const [user, setUser] = useState(initialUserState);
  const [message, setMessage] = useState("") 


  const validate = async () => {
    if(!user.username || !user.password){
      setMessage("Please fill all fields")
      return;
    }

    try{
      // check if user exists
      const isUser = await HabitDataService.getByUsername(user.username); 

      // chech if user exists abd password is matching
      if(isUser.data.length == 0 || isUser.data[0].passWord != user.password){
        setMessage("Wrong username or password"); return;}
        
      await props.filled(user.username);
    }
    catch(e){
      setMessage("could not connect to server")
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
        <h1 className="text-4xl text-white font-bold text-center rounded-lg mb-6 p-2">Login</h1>
        <span className="text-sm text-red-700">{message}</span>


        <div className="relative my-4">
          <input type="text" 
                    id="username"
                    required
                    autoComplete="off"
                    value={user.username}
                    onChange={handleInputChange}
                    name="username" 
          className="block w-72 py-2.3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus-text-white focus:border-blue-600 peer" placeholder=""
          />
          <label htmlFor=""
          className="absolute text-sm text-white duration-150 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6" 
          >Username</label>
          <BiUser className="absolute top-4 right-4"/>
        </div>

        <div className="relative my-4">
          <input type="password" 
                    id="password"
                    required
                    autoComplete="off"
                    value={user.password}
                    onChange={handleInputChange}
                    name="password" 
          className="block w-72 py-2.3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus-text-white focus:border-blue-600 peer" placeholder=""
          />
          <label htmlFor=""
          className="absolute text-sm text-white duration-150 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6" 
          >Your Password</label>
          <AiOutlineUnlock className="absolute top-4 right-4"/>
        </div>


        <button className="w-full mb-4 text-[18px] mt-6 rounded-full bg-white text-emerald-800 hover:bg-emerald-600 hover:text-white py-2 transition-colors duration-150" onClick={()=>validate()}>Login</button>

        <div className="text-center text-sm">
          <span className="m-4">Don't have an account? <Link className="text-blue-500" onClick={() => toRegister()}>Sign up</Link></span>
        </div>
        <div className="mt-2 text-center text-sm">
          <span className="m-4 "> Forgot <Link className="text-blue-500" onClick={() => toRegister()}>useranme / password</Link> ?</span>
        </div>


      </div>
    </div>
    </div>

  )
}

export default Login
