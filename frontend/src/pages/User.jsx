import React from "react";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Login from "../components/user/Login";
import Register from "../components/user/Register";
import HabitDataService from "../../services/users.js";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
const User = (props) => {
  const location = useLocation()
  const navigate = useNavigate();

  const initialState = location.state ? location.state.s : 'log' 
  const [logOrRegister, setLogOrRegister] = useState(initialState);


  useEffect(() => {
    props.setLogged(false);
    props.setUser({});
    localStorage.removeItem('user');
  }, []);
  // user information, once obtained we can transition to the habit page

  const fillLog = async (user) => {
    props.setLogged(true);
    props.setUser(user); 
    navigate("/Home")
  };

  const log =
    logOrRegister == "log" ? (
      <Login set={setLogOrRegister} filled={fillLog} />
    ) : (
      <Register set={setLogOrRegister} filled={fillLog} />
    );

  return <>{log}</>;
};

export default User;
