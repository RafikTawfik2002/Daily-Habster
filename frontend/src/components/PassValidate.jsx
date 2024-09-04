import React, { useEffect } from 'react'
import { useState } from 'react'
import { RiCheckboxCircleLine } from "react-icons/ri";
import { TbXboxX } from "react-icons/tb";

const PassValidate = (props) => {
    const password = props.password
    



    const [upperCase, setUpperCase] = useState(/[A-Z]/.test(password)) 
    const [lowerCase, setLowerCase] = useState(/[a-z]/.test(password)) 
    const [number, setNumber] = useState(/\d/.test(password)) 
    const [specialChar, setSpecialChar] = useState(/[!@#$%^&*(),.?":{}|<>]/.test(password)) 
    const [minLen, setminLen] = useState(password.length >= 8) 

   useEffect(() => {
    const upper = /[A-Z]/.test(password)
    setUpperCase(upper)
    const lower = /[a-z]/.test(password)
    setLowerCase(lower)
    const num = /\d/.test(password)
    setNumber(num) 
    const spec = /[!@#$%^&*(),.?":{}|<>]/.test(password)
    setSpecialChar(spec) 
    const len = password.length >= 8
    setminLen(len) 
    if(upper && lower && num && spec && len){

        props.setValid(true)
    }
    else{

        props.setValid(false)
    }
   }, [password])

  return (
    <div className={`text-white text-xs md:text-sm lg:text-sm inline-flex rounded-3xl  backdrop-filter backdrop-blur-md bg-opacity-30 shadow-lg items-center border-2 ${props.valid ? "border-green-400": "border-red-600"}`}>
    <div className={`flex  text-center flex-col items-center py-4 px-2 justify-around rounded-l-2xl ${upperCase ? "bg-green-600" :"bg-red-800"}  border-r border-white  bg-opacity-50 h-full`}>
    Upper Case {upperCase ? <RiCheckboxCircleLine /> : <TbXboxX />}
    </div>
    <div className={` flex text-center flex-col items-center py-4 px-2 justify-around bg-green-600 border-r ${lowerCase ? "bg-green-600" :"bg-red-800"}  border-white  bg-opacity-50 h-full`}>
    Lower Case {lowerCase ? <RiCheckboxCircleLine /> : <TbXboxX />}
    </div>
    <div className={` flex text-center flex-col items-center py-4 px-2 justify-around bg-green-600 border-r ${number ? "bg-green-600" :"bg-red-800"}  border-white  bg-opacity-50 h-full`}>
    Number {number ? <RiCheckboxCircleLine /> : <TbXboxX />}
    </div>
    <div className={`  flex text-center flex-col items-center py-4 px-2 justify-around bg-green-600 border-r ${specialChar ? "bg-green-600" :"bg-red-800"}  border-white  bg-opacity-50 h-full`}>
    Special Character {specialChar ? <RiCheckboxCircleLine /> : <TbXboxX />}
    </div>
    <div className={` flex text-center flex-col items-center py-4 px-2 justify-around rounded-r-2xl bg-green-600 ${minLen ? "bg-green-600" :"bg-red-800"}   bg-opacity-50 h-full`}>
    minimum length 8 {minLen ? <RiCheckboxCircleLine /> : <TbXboxX />}
    </div>


    </div>
  )
}

export default PassValidate
