import React from 'react'
import { BiSearch } from 'react-icons/bi'

const Search = () => {
  return (
    <div className='bg-pink hidden items-center justify-between w-fit bg-zinc-200 px-3 py-1 rounded-full text-zinc-600 sm:hidden lg:flex md:flex'>
        <input type="text" className='w-[20%] bg-zinc-200 focus:border-none' />
        <BiSearch className='cursor-pointer'/>
    </div>
  )
}

export default Search