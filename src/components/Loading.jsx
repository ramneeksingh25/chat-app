import React from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

const Loading = () => {
  return (
    <div  className="text-indigo-800 dark:text-indigo-300 animate-spin-slow">
      <AiOutlineLoading3Quarters/>
    </div>
  )
}

export default Loading