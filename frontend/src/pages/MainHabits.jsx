import React from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const MainHabits = (props) => {
  //if(!props.signed){useNavigate('LogPage')}
  props.setLogged(true);
  const user =  props.user
  props.setUser(user)

  return (
    <div
      className="text-white h-[100vh] flex justify-center items-center bg-cover"
      style={{
        backgroundImage: `url(https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?cs=srgb&dl=pexels-souvenirpixels-417074.jpg&fm=jpg)`,
      }}
    >
      <h1>
        Main Habit Page <br /> {user.userName}
      </h1>
    </div>
  );
};

export default MainHabits;
