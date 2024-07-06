import React, {useContext, useEffect, useState } from "react";
import FriendList from "./FriendList/FriendList";
import ProfileInfo from "./FriendList/Profile";
import AddFriend from "./FriendList/AddFriend";
import RequestList from "./RequestsList";
import { userContext } from "../../Home";

const List = () => {
	const {userDB,userFriendsArray}=useContext(userContext);
	const menuStyle= "p-1 rounded-xl rounded-b-none  cursor-pointer text-center flex-1"
	const [friends,setFriends]=useState(null);
	const [requests,setRequests]=useState(null);
	const [viewFriends,setViewFriends] = useState(true);
	// console.log(userDB);
	useEffect(()=>{
		setRequests(userDB?.requests);
		setFriends(userFriendsArray);
	},[userFriendsArray])
	return (
		<div className="h-[98vh] p-1 sm:p-1 md:p-2 lg:p-3 shadow-xl rounded-xl bg-zinc-200/10 dark:bg-zinc-800/40 backdrop-blur-30
		text-[10px] sm:text-[10px] md:text-sm lg:text-xl
		">
			<ProfileInfo />
			<div className="flex justify-between items-center ">
				<span className={`${menuStyle} ${viewFriends?" font-semibold bg-zinc-200/10 dark:bg-zinc-800/40":"hover:bg-zinc-200/5 dark:hover:bg-zinv-800/20 hover:h-[200%]"} `} onClick={()=>{
					setViewFriends(true);
				}}>Your Friends</span>
				<span className={`${menuStyle} ${!viewFriends?" font-semibold bg-zinc-200/10 dark:bg-zinc-800/40 hover:bg-none":"hover:bg-zinc-200/5 dark:hover:bg-zinv-800/20 rounded-xl"}`} onClick={()=>{
					setViewFriends(false);
				}}>Friend Requests</span>
			</div>
			<div className={`bg-zinc-200/10 dark:bg-zinc-800/40 px-5 py-3 h-[80vh] rounded-xl rounded-t-none`}>
				{viewFriends?
				<div>
					<AddFriend />
					<FriendList friends={friends}/>
				</div>:
				<div>
					<RequestList requests={requests}/>
				</div>}
			</div>
		</div>
	);
};

export default List;
