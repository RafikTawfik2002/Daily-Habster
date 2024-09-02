import React from "react";
import { MdMenuBook } from "react-icons/md";
import { Link } from "react-router-dom";

const WelcomePage = () => {
  return (
    <div className="text-white h-[100vh] flex justify-center items-center bg-cover">
      <div>
        <div className="bg-slate-800 border border-slate-400 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative">
          <div className="text-4xl text-gray-300 shadow-2xl rounded-lg bg-opacity-10 text-center mb-4 p-2">
            {" "}
            <MdMenuBook className="inline -translate-y-1" /> Daily Habster
          </div>
          <Link to={'/Login'} state= {{s:"log"}}><div className="text-2xl text-white shadow-2xl rounded-lg bg-opacity-0 text-center mb-4 
          p-2 transition-colors duration-100 hover:bg-white hover:bg-opacity-30 border-opacity-70 border-gray-950 border-t-2">
            {" "}
            Login
          </div></Link>
         <Link to={'/Login'} state= {{s:"register"}}> <div className="text-2xl text-white shadow-2xl rounded-lg bg-opacity-0 text-center mb-4 
          p-2 transition-colors duration-100 hover:bg-white hover:bg-opacity-30 border-opacity-70 border-gray-950 border-t-2">
            {" "}
            Sign Up
          </div></Link>
        
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
