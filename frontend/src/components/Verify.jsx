import React from 'react'
import { useState } from 'react'
import UserDataServices from "../../services/users"

const Verify = (props) => {
    console.log("ENTERED VERIFY")
    console.log(props.user)
    const [focus, setFocus] = useState(false)

    const [code, setCode] = useState("")

    const sendCode = () => {
        // request the backend to send a code
        UserDataServices.sendmail({email: props.user.email})
        .then((response) => {
            alert("Sent successfully")
        })
        .catch((error) =>{
            console.log(error)
        })
    }
    const verify = () => {
        // sends code and waits for backend to verify it before 
        // refetching the user and telling the user if it failed
        UserDataServices.verify({email: props.user.email, code: code})
        .then((response) => {
            props.setUser(prev => ({...prev, verified: true}))

        })
        .catch( (error) => {
            console.log(error)
        })
    }

    const handleInput = (event) => {        
        const {value} = event.target
        if((""+value).length > 6){return}
        setCode(value)
    }
  return (
    <div className="relative overflow-hidden md:pt-28 lg:pt-32 pt-24 ">
    <div className="pt-9 w-[80%] md:w-[60%] lg:w-[45%]  mx-auto">
    {/* Profile Section */}
    <div className=" bg-slate-800 border text-gray-300 border-white rounded-md pl-5 pr-4 pt-5 shadow-lg backdrop-filter backdrop-blur-md bg-opacity-70 justify-center pb-9">

   

    <div className="text-2xl md:text-4xl lg:text-4xl text-center mb-2 mt-4">
          <i>Email Verification Required</i>
    </div>
    <div className='text-base text-center mb-10'>
        Enter the code that was sent to your email
    </div>

    <div className="flex flex-row mx-2 md:mx-2 lg:mx-12">
      {/* Username */}
      <div className="flex flex-col mr-4">
        <div className={` ${focus && "text-yellow-300"} px-3 py-2 mb-5 text-left`}>
            Code:
        </div>
      </div>
       {/* Email */}
       <div className="flex flex-col w-full">
       <input 
       onFocus={() => setFocus(true)}
       onBlur={() => setFocus(false)}
       value={code}
       onChange={handleInput}
       placeholder='Enter the 6 digits code'
       className="h-full mb-5 px-3 py-2 w-full border border-slate-400  bg-transparent ring-0 focus:ring-0 focus:border-yellow-300 hover:ring-0 border-t-0 border-x-0">
       
        </input>
      </div>

    </div>

      <div className="flex flex-col items-center mt-8 text-yellow-500">
       <button className=' rounded-xl px-2 py-1 hover:bg-gray-700 duration-300' onClick={() => verify()}>Submit</button>
       <div className=' text-white'>Didn't recieve code ? <button onClick={() => sendCode()} className='rounded-xl px-2 py-1 hover:bg-gray-700 duration-300 text-blue-500'> Resend </button></div>
      </div>
    
    
    </div>
</div>
</div>
  )
}

export default Verify
