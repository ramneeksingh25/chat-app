import React, { useContext, useEffect, useState } from "react";
import ProfileInfo from "./FriendList/Profile";
import RequestList from "./RequestsList";
import FriendList from "./FriendList";
import { useSelector } from "react-redux";
import { db } from "../../../config/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { userContext } from "../../Home";

const List = () => {
	const User = useSelector((state) => state.user);
	const friendsList = User.friends;
	const requestList = User.requests;
	const menuStyle =
		"p-1 rounded-xl rounded-b-none  cursor-pointer text-center flex-1";
	const [viewFriends, setViewFriends] = useState(1);
	return (
		<div
			className="h-[98vh] p-1 sm:p-1 md:p-2 lg:p-3 shadow-xl rounded-xl bg-zinc-200/10 dark:bg-zinc-800/40 backdrop-blur-30
		text-[10px] sm:text-[10px] md:text-sm lg:text-xl transition-all duration-300
		">
			<ProfileInfo />
			<div className="flex justify-between items-center ">
				<span
					className={`${menuStyle} ${
						viewFriends == 1
							? " font-semibold bg-gradient-to-t from-zinc-200/10 to-zinc-200/20 dark:from-zinc-800/40 dark:to-zinc-800/50 "
							: "hover:bg-zinc-200/5 dark:hover:bg-zinv-800/20 hover:h-[200%]"
					} `}
					onClick={() => {
						setViewFriends(1);
					}}>
					Friends
				</span>
				<span
					className={`${menuStyle} ${
						viewFriends == 2
							? " font-semibold bg-gradient-to-t from-zinc-200/10 to-zinc-200/20 dark:from-zinc-800/40 dark:to-zinc-800/50"
							: "hover:bg-zinc-200/5 dark:hover:bg-zinv-800/20 rounded-xl"
					}`}
					onClick={() => {
						setViewFriends(2);
					}}>
					Requests
				</span>
			</div>
			<div
				className={`bg-zinc-200/10 dark:bg-zinc-800/40 px-5 py-3 h-[80vh] rounded-xl rounded-t-none`}>
				{viewFriends == 1 && (
					<div>
						<FriendList f={friendsList} />
					</div>
				)}
				{viewFriends == 2 && (
					<div>
						<RequestList r={requestList} />
					</div>
				)}
			</div>
		</div>
	);
};

export default List;
