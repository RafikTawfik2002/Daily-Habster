import React from "react";

import MainHabits from "./pages/MainHabits";
import WelcomePage from "./pages/WelcomePage";
import User from "./pages/User";
import { Routes as Switch, Route, Link } from "react-router-dom";
import { useState } from "react";

import Register from "./components/Register";

const App = () => {
  const [logged, setLogged] = useState()
  const [user, setUser] = useState()
  return (

    <div
      className="h-[100vh] bg-cover"
      style={{ 
        backgroundImage: `url(https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?cs=srgb&dl=pexels-souvenirpixels-417074.jpg&fm=jpg)`,
      }}
    >
      {/* Navbar */}


      {/* Routing to different pages */}
      <Switch>
            {/* <Route exact path='/' element={logged ? <MainHabits user={user} setUser={setUser} setLogged={setLogged}/> : <User setUser={setUser} setLogged={setLogged}/>} /> */}
            <Route exact path='/' element={<WelcomePage />} />
            <Route exact path='/Login' element={<User setUser={setUser} setLogged={setLogged}/>} />
            <Route exact path='/Home' element={<MainHabits user={user} setUser={setUser} setLogged={setLogged}/>} />
      </Switch>
    </div>
  );
};

export default App;
