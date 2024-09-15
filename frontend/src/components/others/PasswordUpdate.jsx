import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TbArrowBackUp } from "react-icons/tb";

import { IoEyeOffOutline } from "react-icons/io5";
import { FiEye } from "react-icons/fi";
import PassValidate from "../PassValidate";

import UserDataServices from "../../../services/users"

const PasswordUpdate = (props) => {

  const id = props.user.userID

  const initUser = {
    oldPassword: "",
    password: "",
    confirmPass: "",
  };
  const [user, setUser] = useState(initUser);

  const navigate = useNavigate();

  const [isFocusedEmail, setIsFocusedEmail] = useState(false);
  const [isFocusedName, setIsFocusedName] = useState(false);
  const [isFocusedExtra, setIsFocusedExtra] = useState(false);

  const [field1, setField1] = useState(true);
  const [field2, setField2] = useState(true);
  const [field3, setField3] = useState(true);

  const [message, setMessage] = useState("")

  const [newPassValid, setNewPassValid] = useState(false)
  const [enter, setEnter] = useState(false)

  const hangleChange = (event) => {
    const { name, value } = event.target; //get name and value from the target
    if(name == "password"){setEnter(true)}
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const [success, setSuccess] = useState(false)
  const updatePassword = () => {
      if(!user.oldPassword || !user.password || !user.confirmPass){
        setMessage("Please fill all fields")
        return}
      if(user.password != user.confirmPass){
          alert(user.password + " " + user.confirmPass)
          setMessage("New and Confirm passwords don't match")
          return}
      if(!newPassValid){
        setMessage("Password does not meet the requirements")
        return
      }
      const body = {
        password: user.password,
        oldPassword: user.oldPassword
      }
     UserDataServices.updatePassword(id, body)
     .then(() => {setSuccess(true); setMessage("")})
     .catch(() => {setMessage("Old password is incorrect")})
  }

  const Active = () => {
    return (<>
     <div className="text-xl md:text-2xl lg:text-2xl text-center mb-10 mt-2">
          Update Password
        </div>
        <div className='flex justify-center '>
        <span className=" text-sm text-red-700 bg-white opacity-60 px-0.5 rounded-md">{message}</span>
        </div>
        

        <div className="flex flex-row mx-2 md:mx-2 lg:mx-2 ">
          {/* labels
        <div className="flex flex-col ">
          
          <div className={`px-3 py-2 mb-5 text-left whitespace-nowrap ${isFocusedExtra && "text-yellow-200"}`}>
              New Password:
          </div>
          <div className={`px-3 py-2 text-left  ${isFocusedEmail && "text-yellow-200"}`}>
              Confirm Password:
          </div>
        </div> */}
          {/* fields */}
          <div className="flex flex-col w-full justify-center md:text-xs text-xs lg:text-sm ">
            <form autoComplete="off" key="unique-key">
            <div className="relative mb-5 flex items-center w-full">
              <label
                className={`pr-3 text-left w-1/4  ${
                  isFocusedName && "text-yellow-200"
                }`}
              >
                Old Password:
              </label>
              <input
                type={field1 ? "password" : "text"}
                onFocus={() => setIsFocusedName(true)}
                onBlur={() => setIsFocusedName(false)}
                id=""
                name="oldPassword"
                value={user.oldPassword}
                onChange={hangleChange}
                autoComplete="off"
                className="w-3/4 px-3 border border-slate-400 bg-transparent  bg-opacity-30 border-t-0 border-x-0 ring-0 focus:ring-0 focus:border-yellow-200"
              ></input>
                {field1 ? <IoEyeOffOutline className="cursor-pointer absolute top-4 right-3 text-xl" onClick={() => setField1(prev => !prev)}/> 
                : <FiEye className="cursor-pointer absolute top-4 right-3 text-xl" onClick={() => setField1(prev => !prev)}/>}
            </div>

            <div className="relative mb-5 flex items-center w-full">
            <label className={` pr-3 text-left w-1/4 ${isFocusedExtra && "text-yellow-200"}`}>
              New Password:
          </label>
              <input
                type={field2 ? "password" : "text"}
                onFocus={() => setIsFocusedExtra(true)}
                onBlur={() => setIsFocusedExtra(false)}
                id="password"
                name="password"
                value={user.password}
                onChange={hangleChange}
                autoComplete="off"
                className="w-3/4 px-3 border border-slate-400 bg-transparent  bg-opacity-30 border-t-0 border-x-0 ring-0 focus:ring-0 focus:border-yellow-200"
              ></input>
               {field2 ? <IoEyeOffOutline className="cursor-pointer absolute top-4 right-3 text-xl" onClick={() => setField2(prev => !prev)}/> 
                : <FiEye className="cursor-pointer absolute top-4 right-3 text-xl" onClick={() => setField2(prev => !prev)}/>}
            </div>

            <div className="relative flex items-center w-full">
            <label className={`pr-3 text-left w-1/4 ${isFocusedEmail && "text-yellow-200"}`}>
              Confirm Password:
          </label>
              <input
                type={field3 ? "password" : "text"}
                onFocus={() => setIsFocusedEmail(true)}
                onBlur={() => setIsFocusedEmail(false)}
                id="confirmPass"
                name="confirmPass"
                value={user.confirmPass}
                onChange={hangleChange}
                autoComplete="off"
                className="w-3/4 px-3 border border-slate-400 bg-transparent bg-opacity-30 border-t-0 border-x-0 ring-0 focus:ring-0 focus:border-yellow-200"
              ></input>
               {field3 ? <IoEyeOffOutline className="cursor-pointer absolute top-4 right-3 text-xl" onClick={() => setField3(prev => !prev)}/> 
                : <FiEye className="cursor-pointer absolute top-4 right-3 text-xl" onClick={() => setField3(prev => !prev)}/>}
            </div>
            </form>

            <div className="mt-10 flex flex-col">
          <div className="text-center mb-2 text-sm">New Password must contain </div> 
          <div className="flex justify-center"><PassValidate password={user.password} setValid={setNewPassValid} valid={newPassValid} /></div>
        </div>
            
          </div>
        </div>

        <div className="flex flex-col items-center mt-8 text-yellow-500">
          <button
            className="mb-2  hover:bg-opacity-70 hover:bg-gray-500 duration-300 p-1 px-2 rounded-xl text-green-500"
            onClick={() => updatePassword()}
          >
            Save Changes
          </button>
          <button
            className="mb-2  hover:bg-opacity-70 hover:bg-gray-500 duration-300 p-1 px-2 rounded-xl"
            onClick={() => props.setState(0)}
          >
            Cancel
          </button>
        </div></>)
  }

  const Success = () => {
    return (<>
    <div className="text-xl md:text-2xl lg:text-2xl text-center mb-10 mt-2">
          Password Updated Successfully 
        </div>
        <div className="flex flex-col items-center mt-8 text-yellow-500">
          <button
            className="mb-2  hover:bg-opacity-70 hover:bg-gray-500 duration-300 p-1 px-2 rounded-xl text-green-500"
            onClick={() => props.setState(0)}
          >
            Go Back to Profile Info
          </button>
          </div>
      
    </>)
  }

  return (
    <div className="pt-9 w-[80%] md:w-[65%] lg:w-[45%]  mx-auto">
      {/* Profile Section */}
      <div className="bg-slate-800 border text-gray-300 border-slate-400 rounded-3xl pl-5 pr-4 pt-5 shadow-lg backdrop-filter backdrop-blur-md bg-opacity-30 justify-center pb-5">
        <TbArrowBackUp
          onClick={() => navigate("/Home")}
          className="py-0  cursor-pointer text-xl md:text-3xl lg:text-3xl rounded-md  inline"
        >
          {" "}
        </TbArrowBackUp>

        {success ? Success() : Active()}
      </div>
    </div>
  );
};

export default PasswordUpdate;
