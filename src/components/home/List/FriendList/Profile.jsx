import React, { useContext } from 'react'
import SignOut from '../../../auth/SignOut'
import Avatar from '../../components/Avatar';
import { auth } from '../../../../config/firebase';
import Loading from '../../../Loading';
import { userContext } from '../../../Home';

const ProfileInfo = () => {
  const {user} = useContext(userContext);
  return (
    <div className='w-full flex items-center justify-between py-6'>
        <span className='flex items-center gap-3 font-bold'>
        {user.photoURL?<img src={user.photoURL} alt="UserImage" className='w-16 rounded-full'/>:<Avatar name={user?.displayName}/>}
          <span className='hidden sm:hidden md:block lg:block'>
            {user.displayName}
          </span>
        </span>
        <SignOut/>
    </div>
  )
}

export default ProfileInfo