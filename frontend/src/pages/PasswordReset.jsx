import React, {useState, useEffect} from 'react'
import { IoEyeOffOutline } from 'react-icons/io5'
import { FiEye } from 'react-icons/fi'
import { MdMenuBook } from 'react-icons/md'
import PassValidate from '../components/PassValidate'
import Spinner from '../components/Spinner'
import { useParams } from 'react-router-dom'
import UserDataServices from "../../services/users"

const PasswordReset = () => {
    const [field2, setField2] = useState(true)
    const [field3, setField3] = useState(true)
    const [isFocusedExtra, setIsFocusedExtra] = useState(false)
    const [isFocused, setIsFocused] = useState(false)

    const [password, setPassword] = useState("")
    const [confirm, setConfirm] = useState("")

    const [valid, setValid] = useState(false)

    const [message, setMessage] = useState("")

    const [loading, setLoading] = useState(true)

    const [validToken, setValidToken] = useState(false)

    const [success, setSuccess] = useState(false)
    const [done, setDone] = useState(false)

    const { token } = useParams()
    console.log(token)

    useEffect(() => {
        console.log("Entered log")
        UserDataServices.checkToken({token: token})
        .then(response => {
            console.log(response)
            console.log(response.data.found)
            console.log("Setting valid to: " + response.data.found)
            setLoading(false)
            setValidToken(response.data.found)
        })
        .catch(e => {
            console.log(e)
            setLoading(false)
            setValidToken(false)
        })
        console.log("Done log")
    }, [])

    const handleInput = (event) => {
        const {name, value} = event.target
        if(name == "password"){setPassword(value)}
        else{setConfirm(value)}
    }

    const resetPassword = () => {
        if(!password || !confirm){setMessage("Please fill all field"); return}
        if(password != confirm){setMessage("Passwords do not match"); return}
        if(!valid){setMessage("Password does not meet the requirements"); return}
        setLoading(true)
        UserDataServices.resetPassword({token: token, password: password})
        .then(response => {
            console.log(response)
            setLoading(false)
            setSuccess(true)
            setDone(true)
        })
        .catch(e => {
            console.log(e)
            setLoading(false)
            setSuccess(false)
            setDone(true)
        })
       
    }  
  return (<>
    
    <div className=" h-[100vh] flex justify-center items-center bg-cover text-gray-300 w-full">
    <div>
      <div className="w-[480px] bg-slate-800 border border-slate-400 rounded-md p-8 px-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative ">
      <div className="text-2xl text-gray-300 shadow-2xl rounded-lg bg-opacity-10 text-center mb-4 p-2"> <MdMenuBook className="inline -translate-y-1"/> Daily Habster</div>
      <h1 className="text-4xl text-white font-bold text-center rounded-lg mb-6 p-2">Reset Password</h1>
      {loading ? <div className='flex justify-center mt-10 mb-16'><Spinner /> </div> : 
      <>{done ? <div> {success ? <div className='flex justify-center mb-10'><span className='text-center'>Your password was successfully reset, you can now login using your new password</span></div>: <div className='flex justify-center mb-10'><span className='text-center'>Link might be expired, please request a new link</span></div>} </div> :

      <>{validToken ? <>

<div className='flex justify-center h-5 '>
  {message && <span className=" text-sm h-5 text-red-700 bg-white opacity-60 px-0.5 rounded-md mb-7">{message}</span>}
  </div>
  
  <div className="relative mb-5 mt-6 flex flex-col justify-center items-center w-full">
      <label className={` pr-3 text-sm text-left w-full ${isFocusedExtra && "text-yellow-200"}`}>
        New Password:
    </label>
        <input
          type={field2 ? "password" : "text"}
          onFocus={() => {setIsFocusedExtra(true)}}
          onBlur={() => {setIsFocusedExtra(false)}}
          id="password"
          name="password"
          onChange={handleInput}
          value={password}
          autoComplete="off"
          className="w-full py-1 px-3 pl-1 border border-slate-400 bg-transparent  bg-opacity-30 border-t-0 border-x-0 ring-0 focus:ring-0 focus:border-yellow-200"
        ></input>
         {field2 ? <IoEyeOffOutline className="cursor-pointer absolute top-6 right-3 text-xl" onClick={() => setField2(prev => !prev)}/> 
          : <FiEye className="cursor-pointer absolute top-6 right-3 text-xl" onClick={() => setField2(prev => !prev)}/>}
      </div>
      <div className="relative mb-5 flex flex-col items-center justify-center w-full">
      <label className={` pr-3 text-left w-full text-sm ${isFocused && "text-yellow-200"}`}>
        Confirm Password:
    </label>
        <input
          type={field3 ? "password" : "text"}
          onFocus={() => {setIsFocused(true)}}
          onBlur={() => {setIsFocused(false)}}
          id="password"
          name="confirm"
          value={confirm}
          onChange={handleInput}
          autoComplete="off"
          className="w-full py-1 px-3 pl-1 border border-slate-400 bg-transparent  bg-opacity-30 border-t-0 border-x-0 ring-0 focus:ring-0 focus:border-yellow-200"
        ></input>
         {field3 ? <IoEyeOffOutline className="cursor-pointer absolute top-6 right-3 text-xl" onClick={() => setField3(prev => !prev)}/> 
          : <FiEye className="cursor-pointer absolute top-6 right-3 text-xl" onClick={() => setField3(prev => !prev)}/>}
      </div>
      <div className='flex justify-center my-5 mt-10'>
      <button onClick={resetPassword} className="px-3 py-2 text-md bg-opacity-55 self-center bg-slate-700  border border-white text-gray-300 hover:bg-slate-400  rounded-2xl hover:bg-opacity-55 duration-300">
      Reset my password
    </button>
    </div>
      <div className='flex justify-center mt-10'>
          <PassValidate password={password} setValid={setValid} valid={valid}/>
      </div></> : <div className='flex justify-center mb-10'><span className='text-center'>Link could not be verified, please request a new link or try refreshing the page</span></div>}</>
        }</>
      }
        </div>
    </div>
    </div>
    </>
  )
}

export default PasswordReset
