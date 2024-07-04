import React from 'react'
import Friend from '../components/Friend'

const FriendList = () => {
  return (
    <div className=' max-h-[70vh] overflow-y-scroll rounded-lg overflow-x-hidden border border-cyan-400'>
        {new Array(16).fill('').map((_, index) => <Friend key={index}/>)}
    </div>
  )
}

export default FriendList