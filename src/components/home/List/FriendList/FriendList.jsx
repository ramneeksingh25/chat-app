import React, {useEffect, useState } from 'react'
import Friend from '../../components/Friend'
const FriendList = ({friends}) => {
  const [friendArray,setFriendArray]=useState([]);
  
  useEffect(()=>{
    setFriendArray(friends)
    // console.log(friends);
  },[friends])

  return (
    <div className=' mt-5 max-h-[80%] overflow-y-scroll rounded-lg overflow-x-hidden'>
        {/* {JSON.stringify(friendArray)} */}
        {friendArray?friendArray.map((friend,index)=>{
            // console.log(friend);
          return<Friend key={index} email={friend}/>}):"No Friends... Add Some"}
        {/* {new Array(16).fill('').map((_, index) => <Friend key={index} isSelected={selected}/>)} */}
    </div>
  )
}

export default FriendList