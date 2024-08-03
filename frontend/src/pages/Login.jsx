import React from 'react'
import LoginForm from '../components/LoginForm'

const Login = () => {
  return (
   <div className='text-white h-[100vh] flex justify-center items-center bg-cover' style={{"backgroundImage" : `url(https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?cs=srgb&dl=pexels-souvenirpixels-417074.jpg&fm=jpg)`}}>
    <LoginForm/>
   </div>
  )
}

export default Login
