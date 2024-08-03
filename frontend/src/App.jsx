import React from 'react'

import Login from './pages/Login'
import { Routes as Switch, Route, Link } from "react-router-dom"; 
import LoginForm from './components/LoginForm';

const App = () => {


  return (
    <>
    <Switch>
            <Route exact path='*' element={<Login/>} />
            <Route exact path='/' element={<Login/>} />
            <Route exact path='/login' element={<Login/>} />
            {/* <Route
              path="/restaurants/:id/review"
              render={(props) => (
                <AddReview {...props} user={user} />  //passing in props to the addreview components
              )}
            />
            <Route
              path="/restaurants/:id"                 // there is no path for restaurants, only restaurants followed by an id
              render={(props) => (
                <Restaurant {...props} user={user} />  //passing in props to the restaurantById components
              )}
            />
            <Route
              path="/login"
              render={(props) => (
                 <Login {...props} login={login}/>
              )}  
            /> */}
      </Switch>
      </>

  )
}

export default App
