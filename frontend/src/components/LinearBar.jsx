import React from 'react'
import { useState, useEffect } from 'react'


const LinearBar = (props) => {
    const start = props.start
    const end = props.end
    // bars will indicate when a habit is done
    // and will chaneg the state to success
    // it will also track last updated to get
    // rid of habit if not followed up by user
    const setHabitState = props.setHabitState

    const startMilli = new Date(start).getTime();
    const maxMilli = new Date(end).getTime() - startMilli;
    const currMilli = new Date().getTime() - startMilli;

    const [progress, setProgress] = useState(currMilli / maxMilli)

    //const [progress, setProgress] = useState(1) 


    useEffect(() => {
        const start = Date.now();
        
        const interval = setInterval(() => {
          const newTime = (new Date().getTime() - startMilli) / maxMilli;
          const newProgress = Math.min(newTime, 1);
          setProgress(newProgress);
    
          if (newProgress >= 1) {

            clearInterval(interval);
          }
        }, 1000); // Update every 100ms for smoother animation
    
        return () => clearInterval(interval);
      }, [progress]);
  return (
    <div className='w-full h-6 bg-white opacity-70 rounded-lg border-blue-900 border-2 opacity-50'>
      <div className={`relative h-full bg-white rounded-lg`}>
      <div
        className={`text-black absolute top-0 left-0 h-full bg-green-600 rounded-md ${progress < 100 && 'rounded-r-none'}`}
        style={{ width: `${Math.max(progress*100, 1)}%` }}
      >{progress}</div>
    </div>
     
    </div>
  )
}

export default LinearBar
