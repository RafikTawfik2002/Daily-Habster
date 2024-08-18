import React from 'react'
import DateTools from '../../DateTools'

const DeleteModal = (props) => {
    const exit = props.setDel
    const habit = props.habit
    const remove = () => {
        props.deleteHabit()
        exit()
    }
  return (
    <div
    className="z-50 bg-black bg-opacity-70 fixed top-0 bottom-0 left-0 right-0  flex flex-row justify-center items-center"
    onClick={exit}
  >
    <div
      onClick={(event) => event.stopPropagation()}
      className={`flex flex-col font-thin w-[80%] md:w-[65%] lg:w-[45%] text-gray-200 tracking-wider rounded-3xl border-blue-900  bg-blue-900  border-2 bg-opacity-60 blur-30 backdrop-filter backdrop-blur-xl`}
    >
         <div className="my-12 mb-8 text-center lg:text-2xl md:text-xl text-md font-bold"> Delete Habit</div>

         <div className="flex flex-col  lg:text-lg md:text-lg mx-14 text-md">

                
                <div className=''>Habit: </div> 
                <div className='mt-2 p-3 bg-blue-950 border-gray-500 rounded-xl border-0.3'>{habit.desc}</div>

                <div className='mt-4 text-sm'>Started: </div> 
                <div className='text-center text-sm mt-1 p-1 bg-blue-950 border-gray-500 rounded-xl border-0.3 w-1/2 lg:w-1/3'><i>{DateTools.dateRender(habit.createdAt)}</i></div>
                
                <div className='text-sm mt-2'>Ends: </div> 
                <div className='text-center text-sm mt-1 p-1 bg-blue-950 border-gray-500 rounded-xl border-0.3 w-1/2 lg:w-1/3'><i>{DateTools.dateRender(DateTools.DurationToDate(habit.createdAt, habit.duration))}</i></div>
               

                <div className="mt-10 mb-4 text-center lg:text-2xl md:text-xl text-md"> Are you sure you want to delete this habit ?</div>



            <div className="flex flex-row mb-5 items-center justify-evenly">
                
                <button
                className="py-2 rounded-xl border-red-500 duration-300 hover:bg-red-800 border bg-red-900 text-white w-[40%] my-3 mx-2"
                onClick={remove}
                >
                    Delete Habit
                </button>

                <button
                className="py-2 rounded-xl  border-gray-400 duration-300 hover:bg-gray-600 border bg-gray-700 text-white w-[40%] my-3 mx-2"
                onClick={exit}
                >
                    Cancel
                </button>
            </div>
                
                


         </div>
    </div>
    </div>
  )
}

export default DeleteModal
