import React, { useEffect, useState } from 'react'

const Slider = (props) => {
    const setter = props.setter 
    const [on, setOn] = useState(false);
    const toggle = () => {
        if(on){
            setOn(false)
            setter(false)
        }
        else{
            setOn(true)
            setter(true)
        }
    }
    useEffect(() => {
        setter(false)
    },[])
  return (

    // Silde Container
    <div  
    onClick={toggle}

    className={`flex transition-colors duration:500  w-14 h-8  border border-slate-400
    rounded-full shadow-lg p-0.5 backdrop-filter bg-opacity-60 cursor-pointer
    ${on ? ' bg-blue-500' : ' bg-slate-400'}`}>
        {/* Slide Class */}
      <div className={`transition-transform duration:500 bg-white opacity-30 border border-slate-400 rounded-full w-[50%] h-full
        ${on ? 'translate-x-full' : 'translate-x-0'}
        `}>

     </div>
    </div>
  )
}

export default Slider
