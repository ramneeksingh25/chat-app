import React from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

const Loading = () => {
  return (
    <div className="text-indigo-800 dark:text-indigo-300 ">
      <AiOutlineLoading3Quarters className='animate-spin-slow'/>
    </div>
  )
}

export default Loading