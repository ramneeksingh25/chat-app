import React, { useContext, useEffect, useState } from 'react'
import Friend from '../../components/Friend'
import { userContext } from '../../../Home'
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../../../config/firebase';

const FriendList = () => {
  const {selected,setSelected,user}=useContext(userContext);
  const q= query(collection(db, "Users"),where("email","==", user.email));
  const [friendArray,setFriendArray]=useState([]);
  const getFriends= async ()=>{
    const querySnapshot = await getDocs(q);
    const data=querySnapshot.docs.map(doc=>doc.data());
    // console.log(data[0].friends);
    setFriendArray(data[0].friends);
  }
  useEffect(()=>{
    getFriends();
    setSelected(null);
  },[])
  return (
    <div className=' mt-5 max-h-[80%] overflow-y-scroll rounded-lg overflow-x-hidden'>
        {/* {JSON.stringify(friendArray)} */}
        {friendArray?friendArray.map((friend,index)=>{
            // console.log(friend);
            console.log(friend);
          return<Friend key={index} email={friend}/>}):"No Friends... Add Some"}
        {/* {new Array(16).fill('').map((_, index) => <Friend key={index} isSelected={selected}/>)} */}
    </div>
  )
}

export default FriendList