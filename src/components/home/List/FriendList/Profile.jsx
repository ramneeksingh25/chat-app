import SignOut from '../../../auth/SignOut'
import Avatar from '../../components/Avatar';
import { useSelector } from 'react-redux';
const ProfileInfo = () => {
  const user = useSelector((state)=>{
		return state.user;
	})
  return (
    <div className='w-full flex items-center justify-between py-4'>
        <span className='flex items-center  gap-3 font-bold'>
        {user.photoURL?<img src={user.photoURL} alt="UserImage" className='w-[6vh] h-[6vh] border border-white/40 hover:border-white/80 rounded-full'/>:<Avatar name={user?.displayName}/>}
          <span className='hidden sm:hidden md:block lg:block'>
            {user.displayName}
          </span>
        </span>
        <SignOut/>
    </div>
  )
}

export default ProfileInfo