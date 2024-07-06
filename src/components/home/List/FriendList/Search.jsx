import React from 'react'
import { BiSearch } from 'react-icons/bi'

const Search = () => {
  return (
    <div className='bg-pink flex items-center justify-between flex-1 bg-zinc-200 px-3 py-1 rounded-full text-zinc-600'>
        <input type="text" className='bg-zinc-200 focus:border-none' />
        <BiSearch className='cursor-pointer'/>

    </div>
  )
}

export default Search