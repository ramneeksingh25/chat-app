import React from 'react'
import { IoCheckmark } from 'react-icons/io5'
import { RxCross2 } from 'react-icons/rx'

const Request = ({email}) => {
    const acceptFriend=()=>{
        console.log("Accept Friend Request"+email);
        
    }
    const rejectFriend=()=>{
        console.log("Reject Friend Request"+email);
    }
    const iconStyle=(color)=>`rounded-full p-2 text-[170%] text-${color}-600 hover:text-white hover:bg-${color}-600`
  return (
    <div className='flex items-center gap-2'>
        <IoCheckmark className={`${iconStyle("green")} hover:bg-green-600`} onClick={acceptFriend}/>
        <RxCross2 className={`${iconStyle("red")} `} onClick={rejectFriend}/>
    </div>
  )
}

export default Request