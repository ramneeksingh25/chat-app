import React, { useContext } from "react";
import ProfileInfo from "./Profile";
import FriendList from "./FriendList";
import { userContext } from "../../Home";
import AddFriend from "./AddFriend";

const List = () => {
	const {user} = useContext(userContext);
	return (
		<div className="h-[98vh] p-3 shadow-xl rounded-xl bg-zinc-200/10 dark:bg-zinc-800/40 backdrop-blur-30">
			<ProfileInfo name={user.displayName} />
			<AddFriend />
			<FriendList />
		</div>
	);
};

export default List;
