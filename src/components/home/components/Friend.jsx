import React, { useState } from 'react'
import {  MdArrowRight, MdBlock, MdCall, MdOutlineMoreHoriz, MdVideocam } from 'react-icons/md'
import Avatar from './Avatar';
import { IoPersonAddSharp } from 'react-icons/io5';
import { RxCross1, RxCross2 } from 'react-icons/rx';

const Friend = ({friend,add}) => {
  const name=friend?.displayName;
  const iconStyle='hover:bg-zinc-800 rounded-full cursor-pointer hover:text-zinc-200 dark:hover:text-zinc-200 transition-all duration-200 p-2 text-[170%]'
  const photo = friend?.photo;
  const [count,setCount]=useState(0);
  return (
    <div className='mb-1 flex items-center justify-between border border-zinc-600 bg-zinc-300/80 hover:bg-zinc-400 text-zinc-900 dark:bg-zinc-700/80 dark:hover:bg-zinc-800 duration-300 p-3 transition-all dark:text-white cursor-pointer rounded-lg'>
        {/* <img src= alt='Ramneek' className='w-12 h-12 rounded-full'/> */}
        <div className='flex items-center gap-2 mr-2'>
            <Avatar name={name||"Ramneek Singh"}/>
            <h1 className='hidden sm:hidden md:block lg:block'>{name||"Name"}</h1>
        </div>
        <div>

        </div>
        <div className='flex items-center text-2xl gap-4'>
          
        {!add?
        <div className='hidden sm:hidden md:block lg:flex items-center justify-center gap-3'>
            <MdCall className={iconStyle}/>
            <MdVideocam className={iconStyle}/>
        </div>
        :<>
          <IoPersonAddSharp className={iconStyle}/>
        </>}
        {
          count===0?
          <MdOutlineMoreHoriz className={iconStyle} onClick={()=>{setCount(1)}}/>:
          <div className='flex items-center gap-1 transition-all duration-1000 '><MdBlock className={iconStyle} onClick={()=>{
            //block user
          }} />
            <RxCross2 className={iconStyle+" text-red-500 hover:text-white hover:bg-red-500"} onClick={()=>{
              setCount(0);
            }}/>
          </div>
        }
        </div>

    </div>
  )
}

export default Friend