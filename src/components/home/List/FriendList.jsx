import React, { useContext } from 'react'
import Friend from '../components/Friend'
import { userContext } from '../../Home'

const FriendList = () => {
  const {selected,setSelected}=useContext(userContext);
  console.log(selected);
  return (
    <div className=' mt-5 max-h-[80%] overflow-y-scroll rounded-lg overflow-x-hidden'>
        {new Array(16).fill('').map((_, index) => <Friend key={index} isSelected={selected}/>)}
    </div>
  )
}

export default FriendList