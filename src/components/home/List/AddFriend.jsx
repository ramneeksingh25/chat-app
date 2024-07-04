import React, { useState } from 'react'
import NewFriend from './NewFriend';
const AddFriend = () => {
  const [isVisible,setVisible]=useState(false);
  const addNew=()=>{
    setVisible(true);
  }
  return (
    <div className='block sm:block md:flex lg:flex justify-between items-center'>
        <h1 className='font-black text-2xl md:text-3xl lg:text-3xl sm:text-2xl '>Friends</h1>
        <span className='hover:underline transition cursor-pointer duration-500' onClick={addNew}>
          Add Friend    
        </span>
        {isVisible&&<div className='absolute top-0 left-0 text-6xl h-screen w-full z-50 text-white flex items-center justify-center'>
          <div className='absolute top-0 left-0 h-screen w-full z-0 bg-black/30' onClick={()=>{
            setVisible(false);
          }}>
          </div>
          <div className='absolute z-10'> 
            <NewFriend/>
          </div>
        </div>}
    </div>
  )
}

export default AddFriend