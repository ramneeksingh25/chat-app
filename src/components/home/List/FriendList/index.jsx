import Friend from "../../components/Friend";
import AddFriend from "./AddFriend";
const FriendList = ({ f }) => {
	return (
		<>
			<div className="flex justify-center">
				<AddFriend />
			</div>
			<div className=" mt-5 h-[90%] overflow-y-scroll rounded-lg overflow-x-hidden">
				{f
					? f.map((friend, index) => {
							return (
								<Friend
									key={index}
									email={friend}
								/>
							);
					  })
					: "No Friends... Add Some"}
			</div>
		</>
	);
};
export default FriendList;
