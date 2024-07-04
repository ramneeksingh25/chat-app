import React, { useContext, useState } from 'react'
import {  MdArrowRight, MdBlock, MdCall, MdOutlineMoreHoriz, MdVideocam } from 'react-icons/md'
import Avatar from './Avatar';
import { IoPersonAddSharp } from 'react-icons/io5';
import { RxCross1, RxCross2 } from 'react-icons/rx';
import { userContext } from '../../Home';
import { arrayUnion, collection, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { db } from '../../../config/firebase';

const Friend = ({friend,add,isSelected}) => {
  const {user,setSelected} = useContext(userContext);
  const name=friend?.displayName;
  const iconStyle='hover:bg-indigo-800 rounded-full cursor-pointer hover:text-zinc-200 dark:hover:text-zinc-200 transition-all duration-200 p-2 text-[170%]'
  const [count,setCount]=useState(0);
  const addFriend=async ()=>{
    if (!friend) return;
    console.log("adding friend request to user " + friend.id);

    //add friend to database
    const userRef = doc(db, "Users", user.uid);
    const friendRef = doc(db, "Users", friend.id);

    // update user friend list
    await updateDoc(userRef, {
      friends: arrayUnion(friend.id),
    });
    // update friend friend list
    await updateDoc(friendRef, {
      requests: arrayUnion(user.uid),
    });

    setCount(count+1);
    console.log("Friend request sent to " + friend.id);
    // const user = doc(db, "Users", friend.id);
    // console.log(user.id);
    // updateDoc(user,)
    
  }
  return (
    <div className={`mb-1 flex items-center justify-between bg-zinc-200/5 hover:bg-indigo-200/40 font-medium dark:bg-zinc-800/20 dark:hover:bg-zinc-800 duration-300 p-3 transition-all cursor-pointer rounded-lg ${isSelected && " bg-zinc-900"}`}
    onClick={()=>{
      console.log(friend);
      setSelected(friend);
    }}
    >
        {/* <img src= alt='Ramneek' className='w-12 h-12 rounded-full'/> */}
        <div className='flex items-center gap-2 mr-0 sm:mr-0 md:mr-0 lg:mr-2'>
            <Avatar name={name||"John Doe"}/>
            <h1 className='hidden sm:hidden md:hidden lg:block'>{name||"John Doe"}</h1>
        </div>
        <div className='flex items-center text-2xl'>
        {!add?
        <div className='hidden sm:hidden md:block lg:flex items-center justify-center'>
            <MdCall className={iconStyle}/>
            <MdVideocam className={iconStyle}/>
        </div>
        :<>
          <IoPersonAddSharp className={iconStyle} onClick={addFriend}/>
        </>}
        {
          count===0?
          <MdOutlineMoreHoriz className={iconStyle+" mr-2"} onClick={()=>{setCount(1)}}/>:
          <div className='flex items-center gap-1 transition-all duration-1000 '><MdBlock className={iconStyle} onClick={()=>{
            //block user
          }} />
            <RxCross2 className={iconStyle+" text-red-500 hover:text-white hover:bg-red-500 "} onClick={()=>{
              setCount(0);
            }}/>
          </div>
        }
        </div>
    </div>
  )
}

export default Friend