import { useState, useEffect } from 'react'


const BlocksBar = (props) => {
    const start = props.start
    const end = props.end


    // bars will indicate when a habit is done
    // and will chaneg the state to success
    // it will also track last updated to get
    // rid of habit if not followed up by user
    const setHabitState = props.setHabitState

    const startMilli = new Date(start).getTime();
    const maxMilli = new Date(end).getTime() - startMilli;


    const days = Math.ceil((maxMilli) / (1000*60*60*24))

    const currDate = new Date()
    const startDate = new Date(start)

    const sameday = (
    currDate.getFullYear() == startDate.getFullYear()
    && currDate.getMonth() == startDate.getMonth()
    && currDate.getDate() == startDate.getDate() 
    )


    const zeroStartDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
    const initProgress = Math.ceil(( new Date().getTime() - zeroStartDate.getTime()) / (1000*60*60*24))



    const [progress, setProgress] = useState(sameday ? 0 : initProgress)


    //const [progress, setProgress] = useState(1) 


    // useEffect(() => {
    //     const start = Date.now();
        
    //     const interval = setInterval(() => {
    //       const newTime = (new Date().getTime() - startMilli) / maxMilli;
    //       const newProgress = Math.min(newTime, 1);
    //       setProgress(newProgress);
    
    //       if (newProgress >= 1) {

    //         clearInterval(interval);
    //       }
    //     }, 1000000); // Update every 100ms for smoother animation
    
    //     return () => clearInterval(interval);
    //   }, [progress]);

   const equalDivs = (days) => {
        const arr = []
        for(let i = 0; i < days; i++){
            arr[i] = 0;
        }
        let i = progress - 1
        return arr.map(() =>  
        <div className={` flex-1 h-full ${i-- > 0 ? "bg-green-600" : "bg-white"} rounded-lg border-blue-900 border-2 opacity-70`}>
          
        </div>
      )
    }
  return (
    <div className='w-full h-6 flex flex-row '>
        {equalDivs(days)}
    </div>

  )
}

export default BlocksBar
