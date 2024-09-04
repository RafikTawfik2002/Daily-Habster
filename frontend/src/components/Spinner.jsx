import React from 'react'

const Spinner = () => {
  return (
    <div className="animate-spin  relative rounded-full w-16 h-16 border-yellow-300 border-[5px] bg-opacity-25">
    <div className='absolute -top-[5px] left-1/2 -translate-x-1/2 w-2 h-[5px]  rounded-l-none rounded-r-none bg-blue-800'>
        
    </div>
  </div>
  )
}

export default Spinner
