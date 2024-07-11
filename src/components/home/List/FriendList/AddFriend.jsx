import React, { useState } from 'react'
import NewFriend from './NewFriend';
import { IoMdPersonAdd } from 'react-icons/io';
const AddFriend = () => {
  const [dialogVisible,setDialogVisible]=useState(false);
  const addNew=()=>{
    setDialogVisible(true);
  }
  return (
    <div className='flex justify-center items-center rounded-full'>
        <IoMdPersonAdd className='flex items-center justify-center rounded-full cursor-pointer text-zinc-100 transition-all duration-200 p-2 m-2 bg-gradient-to-tl from-purple-700 to-indigo-700 hover:from-purple-900 hover:to-indigo-800 hover:text-zinc-400 text-[35px]' onClick={addNew}/>
        {dialogVisible&&<div className='absolute top-0 left-0 text-6xl h-screen w-full z-50 text-white flex items-center justify-center'>
          <div className='absolute top-0 left-0 h-screen w-full z-0 bg-black/30' onClick={()=>{
            setDialogVisible(false);
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