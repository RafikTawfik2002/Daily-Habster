import React from 'react'
import DateTools from '../../DateTools'

const ViewModal = (props) => {

    const habit = props.habit
    const exit = props.exit
  return (
    <div
    className="z-50 bg-black bg-opacity-70 fixed top-0 bottom-0 left-0 right-0  flex flex-row justify-center items-center"
    onClick={exit}
  >
    <div
      onClick={(event) => event.stopPropagation()}
      className={`flex flex-col font-thin w-[80%] md:w-[65%] lg:w-[45%] text-gray-200 tracking-wider rounded-3xl border-blue-900  bg-blue-900  border-2 bg-opacity-60 blur-30 backdrop-filter backdrop-blur-xl`}
    >
      <div className="my-12 mb-8 text-center lg:text-2xl md:text-xl text-md font-bold"> Habit Details</div>
      

    <div className='flex flex-col lg:text-lg md:text-lg mx-14 text-md'>
        <div className='flex flex-row w-full justify-center items-center mb-8'>
        <div className='w-1/4'>Habit: </div> 
        <div className='w-3/4 mt-2 p-3 bg-blue-950 border-gray-500 rounded-xl border-0.3'>{habit.desc}</div>

        </div>

        <hr></hr>

        <div className='flex flex-row w-full justify-center items-center mb-4 mt-8'>

        <div className='w-1/4 text-sm'>Started: </div> 
        <div className='w-3/4 px-3 text-sm mt-1 p-1 bg-blue-950 border-gray-500 rounded-xl border-0.3 lg:w-1/3'><i>{DateTools.exact(habit.createdAt).replace(/,/g,"")}</i></div>

        </div>

 
        <div className='flex flex-row w-full justify-center items-center mb-8'>

            <div className='w-1/4 text-sm'>Ends: </div> 
            <div className='w-3/4 px-3 text-sm mt-1 p-1 bg-blue-950 border-gray-500 rounded-xl border-0.3 lg:w-1/3'><i>{DateTools.exact(DateTools.exactDurationToDate(habit.createdAt, habit.duration)).replace(/,/g,"")}</i></div>

        </div>

        <hr></hr>

        <div className='flex flex-row w-full justify-center items-center mt-8 mb-4'>

        <div className='w-1/4 text-sm'>Duration: </div> 
        <div className='w-3/4 px-3 text-sm mt-1 p-1 bg-blue-950 border-gray-500 rounded-xl border-0.3 lg:w-1/3'>{habit.duration} days</div>

        </div>

        <div className='flex flex-row w-full justify-center items-center mb-11 '>

        <div className='w-1/4 text-sm'>Progress: </div> 

        <div className='w-3/4 text-sm mt-1 p-1 bg-blue-950 border-gray-500 rounded-xl border-0.3 lg:w-1/3'>
        <div className=' bg-green-600 bg-opacity-70 rounded-lg font-bold'
        style={{width: `${((DateTools.Percentage(habit.createdAt, habit.duration)*100).toFixed(2))+"%"}`}}
        > &nbsp;{Math.round((DateTools.Percentage(habit.createdAt, habit.duration)*100).toFixed(2))}% </div>
        </div>

        </div>

        <div className='flex flex-row justify-center mb-11'>
        <button
                className="text-white py-2 rounded-xl border-gray-200 border duration-300 hover:bg-gray-400  bg-gray-500 w-[40%] my-3 mx-2"
                onClick={exit}
                >
                    Back To Main
                </button>

        </div>

    </div>



    </div>
    </div>
  )
}

export default ViewModal
