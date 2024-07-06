import React, { useContext, useEffect, useState } from "react";
import Friend from "../../components/Friend";
import { userContext } from "../../../Home";
const FriendList = () => {
	const [friends, setFriends] = useState(null);
	const { userFriendsArray } = useContext(userContext);
	useEffect(() => {
		setFriends(userFriendsArray);
	}, [userFriendsArray]);
	return (
		<div className=" mt-5 max-h-[80%] overflow-y-scroll rounded-lg overflow-x-hidden">
			{/* {JSON.stringify(friends)} */}
			{friends
				? friends?.map((friend, index) => {
						return (
							<Friend
								key={index}
								email={friend}
							/>
						);
				  })
				: "No Friends... Add Some"}
		</div>
	);
};
export default FriendList;
