import React from 'react'
import {  MdCall, MdOutlineMoreHoriz, MdVideocam } from 'react-icons/md'
import Avatar from './Avatar';

const Friend = () => {
  return (
    <div className='mb-1 flex items-center justify-between border border-zinc-600 bg-zinc-300/80 hover:bg-zinc-400 text-zinc-900 dark:bg-zinc-700/80 dark:hover:bg-zinc-800 duration-300 p-3 transition-all dark:text-white cursor-pointer'>
        {/* <img src= alt='Ramneek' className='w-12 h-12 rounded-full'/> */}
        <div className='flex items-center gap-2'>
            <Avatar name="Ramneek Singh"/>
            <h1>Ramneek Singh</h1>
        </div>
        <div className='flex items-center text-2xl gap-4'>
            <MdCall className='cursor-pointer  hover:text-zinc-600 dark:hover:text-zinc-400'/>
            <MdVideocam className='cursor-pointer hover:text-zinc-600 dark:hover:text-zinc-400'/>
            <MdOutlineMoreHoriz className='cursor-pointer hover:text-zinc-600 dark:hover:text-zinc-400'/>
        </div>

    </div>
  )
}

export default Friend