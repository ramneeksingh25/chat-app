import React, { useState } from 'react'
import { IoMdPersonAdd } from 'react-icons/io';
import NewFriendDialog from './NewFriendDialog';
const AddFriend = () => {
  const [dialogVisible,setDialogVisible]=useState(false);
  const addNew=()=>{
    setDialogVisible(true);
  }
  return (
    <>
    
    <div className='flex items-center justify-center rounded-full cursor-pointer group text-zinc-100 hover:text-zinc-300 bg-gradient-to-tl from-purple-700 to-indigo-700 group-hover:from-purple-900 group-hover:to-indigo-800 px-3 mt-3' onClick={addNew}>
        <h1 className='font-semibold group-hover:underline transition-all duration-200'>Add friend</h1>
        <IoMdPersonAdd className='flex items-center justify-center rounded-full cursor-pointer  transition-all duration-200 mx-3 my-1 text-3xl' />
          </div>
        {dialogVisible&&<div className='absolute top-0 left-0 text-6xl h-screen w-full z-50 text-white flex items-center justify-center'>
          <div className='absolute top-0 left-0 h-screen w-full z-0 bg-black/30' onClick={()=>{
            setDialogVisible(false);
          }}>
          </div>
          <div className='absolute z-10'> 
            <NewFriendDialog overlayF={setDialogVisible}/>
          </div>
        </div>}
    
    </>
  )
}

export default AddFriend