import React, { useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import Friend from "../../components/Friend";
import { db } from "../../../../config/firebase";
import Input from "../../../auth/Input"
const NewFriendDialog = ({overlayF}) => {
	const [errorMessage, setErrorMessage] = useState("");
	const [isSearching, setIsSearching] = useState(false);
	const [friendEmail, setFriendEmail] = useState("");
	const [FriendsList, setFriendsList] = useState([]);
	const usersRef = collection(db, "Users");
	const findFriend = async () => {
		setIsSearching(true);
		try {
			setErrorMessage("");
			setFriendsList([]);
			const friend = query(usersRef, where("email", "==", friendEmail.toLowerCase()));
			const data = await getDocs(friend);
			console.log(data);
			if (data.empty) {
				setErrorMessage("Can't find friend");
				return;
			}
			const tempFriend = [];
			data.forEach((doc) => {
				tempFriend.push({ id: doc.id, ...doc.data() });
			});
			console.log(tempFriend);
			setFriendsList(tempFriend);
		} catch (error) {
			console.log(error);
			setErrorMessage("Can't find friend");
		} finally {
			setIsSearching(false);
		}
	};
	const inputStyle =
		"p-2 m-0 w-full text-gray-600 bg-white outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300 border-slate-300";
	return (
		<div
			className="w-96 text-xl text-indigo-800 dark:text-indigo-300 select-none space-y-2 p-6 shadow-xl rounded-xl bg-zinc-200/30 dark:bg-zinc-900/50 border border-indigo-300 hover:border-pink-300 transition-all duration-1000 backdrop-blur-30"
			onKeyDown={(e) => {
				if (e.key === "Enter") {
					findFriend();
				}
			}}>
			<h1 className="text-center mb-4 select-none font-medium underline hover:decoration-pink-300/70 decoration-indigo-700/70 transition duration-1000">Find Friends</h1>
			<div>
				<Input type="Email" onChange={setFriendEmail}/>
			</div>
			<span className="text-red-500 font-light">{errorMessage}</span>
			<button
				className={`w-full flex items-center justify-center gap-x-3 py-2.5 rounded-lg text-sm font-medium bg-gradient-to-r text-white  ${
					isSearching
						? "cursor-not-allowed from-slate-400/90 to-slate-500/70"
						: "from-indigo-600/80 to-blue-700/50 hover:from-blue-700/80 hover:to-indigo-700/80 hover:shadow-xl"
				}`}
				onClick={() => {
					findFriend();
				}}>
				Add Friend
			</button> 
			{FriendsList.map((friend, index) => {
				return (
					<Friend
						friend={friend}
						overlayF={overlayF}
						add={true}
						key={index}
					/>
				);
			})}
		</div>
	);
};

export default NewFriendDialog;
