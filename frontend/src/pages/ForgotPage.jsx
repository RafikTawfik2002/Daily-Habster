import React, {useState} from "react";
import { MdMenuBook } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaRegCircle } from "react-icons/fa";
import { FaRegCheckCircle } from "react-icons/fa";


const ForgotPage = () => {
    const [option, setOption] = useState(0)
    const [email, setEmail] = useState("")

    console.log(email)

    const handleInputChange = (event) =>{
    
        const {name, value} = event.target
        setEmail(value)
    }
  return (
    <div className=" h-[100vh] flex justify-center items-center bg-cover text-gray-300">
      <div>
        <div className="bg-slate-800 border border-slate-400 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative">
        <div className="text-2xl text-gray-300 shadow-2xl rounded-lg bg-opacity-10 text-center mb-4 p-2"> <MdMenuBook className="inline -translate-y-1"/> Daily Habster</div>
        <h1 className="text-4xl text-white font-bold text-center rounded-lg mb-6 p-2">Account Recovery</h1>

          <label className='py-0.5 text-base  '>Enter your email address </label>
        <input type="email"
                    id="text"
                    required
                    autoComplete="on"
                    onChange={handleInputChange}
                    value={email}

                    name="email" 
          className=" mt-0 mb-4 block w-full py-0.5 px-0 text-sm  bg-transparent border-0 border-b-2 border-gray-300 focus:border-gray-300 focus:ring-0 " placeholder="email"
          />

          <div className="mb-2 text-base ">Select one of the following options</div>

          <Link to={""} state={{ s: "register" }} onClick={() => setOption(1)}>
            <div
              className={`relative text-base bg-slate-600 border border-slate-300 bg-opacity-50 rounded-lg text-left mb-2
                p-2 py-0.5 transition-colors duration-100 hover:bg-white hover:bg-opacity-30  border-opacity-70
                ${option == 1 && "bg-green-400 hover:bg-opacity-50 hover:bg-green-400 text-white border-white"}
                `}
            >
                <div className="absolute top-1/2 -translate-y-1/2 right-3"> {option != 1 ? <FaRegCircle /> : <FaRegCheckCircle />}</div>
              {" "}
              Forgot Username
            </div>
          </Link>


          <Link to={""} state={{ s: "log" }} onClick={() => setOption(2)}>
            <div
              className={`relative text-base bg-slate-600 border border-slate-300 bg-opacity-50 rounded-lg text-left mb-4 
        p-2 py-0.5 transition-colors duration-100 hover:bg-white hover:bg-opacity-30  border-opacity-70
        ${option == 2 && "bg-green-400 hover:bg-opacity-50 hover:bg-green-400 text-white border-white"}
        `}
            >
                 <div className="absolute top-1/2 -translate-y-1/2 right-3"> {option != 2 ? <FaRegCircle /> : <FaRegCheckCircle />}</div>
              {" "}
              Forgot Password
            </div>
          </Link>
          
          
          <div className="flex justify-center">
          <button className="px-2 py-1 self-center text-green-500 hover:bg-slate-400  rounded-xl hover:bg-opacity-55 duration-300">
            Recover my account
          </button>
          </div>
          



          <div className="mt-2 text-center text-sm">
            <span className="m-4 ">
              {" "}
              Go back to{" "}
              <Link className="text-yellow-200" to="/Login" state={{ s: "log" }}>
                Login page
              </Link>{" "}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPage;
