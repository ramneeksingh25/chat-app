import React, {useContext, useEffect, useState } from "react";
import ProfileInfo from "./FriendList/Profile";
import AddFriend from "./FriendList/AddFriend";
import RequestList from "./RequestsList";
import FriendList from "./FriendList";

const List = () => {
	const menuStyle= "p-1 rounded-xl rounded-b-none  cursor-pointer text-center flex-1"
	const [viewFriends,setViewFriends] = useState(true);
	return (
		<div className="h-[98vh] p-1 sm:p-1 md:p-2 lg:p-3 shadow-xl rounded-xl bg-zinc-200/10 dark:bg-zinc-800/40 backdrop-blur-30
		text-[10px] sm:text-[10px] md:text-sm lg:text-xl transition-all duration-300
		">
			<ProfileInfo />
			<div className="flex justify-between items-center ">
				<span className={`${menuStyle} ${viewFriends?" font-semibold bg-gradient-to-t from-zinc-200/10 to-zinc-200/20 dark:from-zinc-800/40 dark:to-zinc-800/50 ":"hover:bg-zinc-200/5 dark:hover:bg-zinv-800/20 hover:h-[200%]"} `} onClick={()=>{
					setViewFriends(true);
				}}>Friends</span>
				<span className={`${menuStyle} ${!viewFriends?" font-semibold bg-gradient-to-t from-zinc-200/10 to-zinc-200/20 dark:from-zinc-800/40 dark:to-zinc-800/50":"hover:bg-zinc-200/5 dark:hover:bg-zinv-800/20 rounded-xl"}`} onClick={()=>{
					setViewFriends(false);
				}}>Requests</span>
			</div>
			<div className={`bg-zinc-200/10 dark:bg-zinc-800/40 px-5 py-3 h-[80vh] rounded-xl rounded-t-none`}>
				{viewFriends?
				<div>
					<AddFriend />
					<FriendList/>
				</div>:
				<div>
					<RequestList/>
				</div>}
			</div>
		</div>
	);
};

export default List;
