import React, { useState } from 'react'
import { db } from '../../../config/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

const NewFriend = () => {
    const [errorMessage,setErrorMessage] =useState("Error");
    const [isSearching, setIsSearching] = useState(false);
    const [friendName, setFriendName] = useState("");
    const usersRef = collection(db, "Users");
    const findFriend = async ()=>{
        setIsSearching(true);
        try {
            setErrorMessage("");
            const friend= query(usersRef, where("displayName", "==", friendName));
            const data = await getDocs(friend);
            console.log(data);
            data.forEach((doc)=>{
                console.log(doc);
            })
            console.log(data);
        } catch (error) {
            console.log(error);
            setErrorMessage("Can't find friend");
        } finally {
            setIsSearching(false);
        }
    }
    const inputStyle =
		"p-2 w-full text-gray-600 bg-white outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300 border-slate-300";
  return (

    <div className='w-96 text-xl text-indigo-800 dark:text-indigo-300 select-none space-y-5 p-6 shadow-xl rounded-xl bg-zinc-200/30 dark:bg-zinc-800/80 backdrop-blur-30'>
        <h1 className='font-semibold'>Search for new friend</h1>
        <label className="text-md font-bold underline decoration-pink-500/70 hover:decoration-indigo-700/70 transition duration-500">Name</label>
        <input type="Name" className={inputStyle} onChange={(e)=>{
            setFriendName(e.target.value);
        }}/>
        <span className='text-red-500 font-light'>{errorMessage}</span>
        <button className={`w-full flex items-center justify-center gap-x-3 py-2.5 rounded-lg text-sm font-medium bg-gradient-to-r text-white  ${
						isSearching
							? "cursor-not-allowed from-slate-400/90 to-slate-500/70"
							: "from-indigo-600/80 to-blue-700/50 hover:from-blue-700/80 hover:to-indigo-700/80 hover:shadow-xl transition duration-300"
					}`}
            onClick={()=>{
                findFriend();
            }}            
        >Add Friend</button>
    </div>
  )
}

export default NewFriend