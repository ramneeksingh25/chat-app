import React, { useState } from "react";
import ProfileInfo from "./FriendList/Profile";
import RequestList from "./RequestsList";
import FriendList from "./FriendList";
import { useSelector } from "react-redux";
const List = () => {
	const User = useSelector((state) => state.user);
	const friendsList = User.friends;
	const requestList = User.requests;
	const [viewFriends, setViewFriends] = useState(1);
	const menuStyle = (n) =>
		`p-1 rounded-xl rounded-b-none cursor-pointer text-center transition-color duration-100 flex-1 ${
			viewFriends == n
				? " font-semibold bg-zinc-200/20 dark:bg-zinc-900/20 border-t border-x border-zinc-900/20 "
				: "hover:bg-zinc-200/5 dark:hover:bg-zinc-800/20 hover:h-[200%] border-b border-zinc-900/20"
		}`;
	
	return (
		<div
			className="h-[98vh] p-1 sm:p-1 md:p-2 lg:p-3 shadow-xl rounded-xl bg-zinc-200/10 dark:bg-zinc-800/40 backdrop-blur-30 text-[10px] sm:text-[10px] md:text-sm lg:text-xl transition-all duration-300"
		>
			<ProfileInfo />
			<div className="flex justify-between items-center ">
				<span
					className={menuStyle(1)}
					onClick={() => {
						setViewFriends(1);
					}}>
					Friends
				</span>
				<span
					className={menuStyle(2)}
					onClick={() => {
						setViewFriends(2);
					}}>
					Requests
				</span>
			</div>
			<div
				className={`bg-zinc-200/20 dark:bg-zinc-900/20 border-x border-zinc-900/10 px-5 py-3 h-[83%] rounded-xl rounded-t-none overflow-y-scroll`}>
				{viewFriends == 1 && (
						<FriendList f={friendsList} />
				)}
				{viewFriends == 2 && (
						<RequestList r={requestList} />
				)}
			</div>
		</div>
	);
};

export default List;
