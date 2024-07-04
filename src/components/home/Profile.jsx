import React from 'react'
import { auth } from '../../config/firebase'
import SignOut from '../auth/SignOut'
import { RxAvatar } from 'react-icons/rx'

const ProfileInfo = () => {
  return (
    <div className='w-full flex items-center justify-between py-6'>
        <div className='text-xl flex gap-3 items-center'>
            {auth.currentUser?.photoURL?<img src={auth.currentUser.photoURL} alt="Avatar" className='h-[20%] w-[20%] rounded-full'/>:<RxAvatar />}
            {auth.currentUser?.displayName}

        </div>

        <SignOut/>
    </div>
  )
}

export default ProfileInfo