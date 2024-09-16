import React, { useState } from "react";
import UserDataServices from "../../../services/users";
import { useNavigate } from "react-router-dom";
import Spinner from "../Spinner"


const DeleteAccount = (props) => {
  const navigate = useNavigate();

  const [deleted, setDeleted] = useState(false);
  const [loading, setLoading] = useState(true)

  

  const deleteAccount = () => {
    setDeleted(true);

   
    UserDataServices.deleteUser(props.userID)
    .then(response => {console.log(response); setLoading(false)})
    
    .catch(e => {
        console.log(e)
    })
  };

  const Active = () => {
    return (
      <>
        {" "}
        <div className="text-xl font-bold mb-5">
          Are you sure you want to permenatly delete your account ?
        </div>
        <div className="flex flex-row items-center justify-evenly w-full">
          <button
            className="py-2 rounded-xl border-red-500 duration-300 hover:bg-red-800 border bg-red-900 text-white w-[40%] mt-3 mx-2"
            onClick={() => {
              deleteAccount();
            }}
          >
            Delete my account
          </button>

          <button
            className="py-2 rounded-xl  border-gray-400 duration-300 hover:bg-gray-600 border bg-gray-700 text-white w-[40%] mt-3 mx-2"
            onClick={() => {
              props.setDeleteOpen(false);
            }}
          >
            Keep my account
          </button>
        </div>
      </>
    );
  };

  const After = () => {
    return (
      <>
        {loading ? <div className="scale-75 py-10"><Spinner /></div> : <><div className="text-xl font-bold mb-3">
          Your account is deleted
        </div>
        <div className="mb-3">
            Sad to see you go :-{`(`}
        </div>

        <button
            className="py-2 rounded-xl  border-gray-400 duration-300 hover:bg-green-600 hover:bg-opacity-80  border bg-green-700 bg-opacity-80 text-white w-[40%] mt-3 mx-2"
            onClick={() => {
              navigate("/login");
            }}
          >
            Go back to login page
            </button></>}
      </>
    );
  };
  return (
    <div
      className="z-50 bg-black bg-opacity-70 fixed top-0 bottom-0 left-0 right-0  flex flex-col justify-center items-center"
      onClick={() => {if(!deleted){props.setDeleteOpen(false)}}}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className={`flex flex-col items-center font-thin w-[80%] md:w-[65%] lg:w-[45%] bg-slate-400 border text-gray-300 border-slate-400 rounded-3xl pl-5 pr-4 pt-9 shadow-lg backdrop-filter backdrop-blur-md bg-opacity-30 justify-center pb-9`}
      >
        {deleted ? After() : Active()}
      </div>
      <div className="h-44"> </div>
    </div>
  );
};

export default DeleteAccount;
