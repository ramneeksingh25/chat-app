import { useEffect, useState } from 'react';
import { auth } from '../config/firebase'
import SignOut from './auth/SignOut';
import FriendList from './home/FriendList';
import ProfileInfo from './home/Profile';

const Home = () => {
  const [profileVisible,setProfileVisible]=useState(true)
  useEffect(()=>{
    const user = auth.currentUser;
    console.log(user);
  },[])
  
  return (
    <>
      <div className='bg-zinc-500 h-screen w-[100%] grid grid-cols-4 gap-3 p-2 text-sm sm:text-sm md:text-md lg:text-lg'>
        <div>
          <ProfileInfo/>
          <FriendList/>
        </div>
        <div className='col-span-3 sm:col-span-3 md:col-span-3 lg:col-span-2 bg-zinc-800 rounded-md text-white'>
          <div>Chats</div>
        </div>
        <div className={`sm:hidden md:hidden hidden ${profileVisible?"lg:block":"lg:hidden"} `}>
          <div>Profile</div>
        </div>  
      </div>
    </>
  )
}

export default Home