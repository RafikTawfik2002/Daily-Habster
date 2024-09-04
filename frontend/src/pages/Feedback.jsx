import React from 'react'
import { Link } from 'react-router-dom'
import OthersPageTitle from '../components/OthersPageTitle'
import PassValidate from '../components/PassValidate'


const Feedback = () => {
  return (
    <>
    <OthersPageTitle />
    <div className="relative overflow-hidden md:pt-28 lg:pt-32 pt-24 ">
    <div className='text-center text-black '>
    Feedback<br/>
    <Link to="/Home">Cancel</Link>

   
    </div>
    </div>

    </>
  )
}

export default Feedback
