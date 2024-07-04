import React, { useContext, useEffect, useState } from 'react'
import SignOut from '../../auth/SignOut'
import { auth } from '../../../config/firebase';
import Loading from '../../Loading';
import { userContext } from '../../Home';
import Avatar from '../components/Avatar';

const ProfileInfo = () => {
  const user = useContext(userContext);
  return (
    <div className='w-full flex items-center justify-between py-6'>
        <span className='flex items-center gap-3 font-bold'>
        {user.photoURL?<img src={user.photoURL} alt="UserImage" className='w-16 rounded-full'/>:<Avatar name={user.displayName}/>}
          {user.displayName}

        </span>
        <SignOut/>
    </div>
  )
}

export default ProfileInfo