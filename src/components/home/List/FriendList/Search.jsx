import React, { useState } from 'react'
import { BiSearch } from 'react-icons/bi'
import Loading from '../../../Loading';
import { useSelector } from 'react-redux';

const Search = () => {
  const [search,setSearch]=useState("");
  const [barVisible,setBarVisible]=useState(false);
  const [loading,setLoading]=useState(false)
  const User = useSelector((state)=> state.user)
  const userFriendsArray=User.friends.map(friend=>({name:friend.split('@')[0]}))
  const searchFriend=async()=>{
    setBarVisible(!barVisible)
    if(search){
      setBarVisible(!barVisible)
      setLoading(true)
      const filteredFriends=userFriendsArray.filter(friend=>friend.name.toLowerCase().includes(search.toLowerCase()))
      console.log(filteredFriends);
    }
  }
  return <div className={`transition-all duration-500 flex items-center justify-center ${barVisible&&" bg-zinc-200"} justify-center p-2 rounded-full text-black`}>
      <input type="text" placeholder='Search...' className={`border-none caret-pink-500 outline-none rounded-full transition-all duration-500 placeholder:text-indigo-800 focus:border-none px-3 mx-1 ${barVisible?"w-full bg-zinc-200":"w-0 p-0 m-0 opacity-0"}`} onChange={(e)=>{setSearch(e.target.value)}}/>
      {loading?
      <div className='text-black'>
        <Loading/>
      </div>:
      <BiSearch className={`cursor-pointer hover:bg-zinc-200 hover:text-indigo-900 transition-all duration-300 p-2 text-4xl rounded-full dark:text-indigo-200 text-indigo-800 ${barVisible&&"dark:text-indigo-800"}`} onClick={searchFriend}/>}
 </div>
}

export default Search