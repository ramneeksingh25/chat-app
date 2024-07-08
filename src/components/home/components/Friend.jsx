import React, { useContext, useEffect, useState } from "react";
import { MdBlock, MdCall, MdDelete, MdOutlineMoreHoriz } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import {
	IoChatbox,
	IoPersonAddSharp,
} from "react-icons/io5";
import Avatar from "./Avatar";
import { userContext } from "../../Home";
import {
	arrayUnion,
	collection,
	doc,
	getDocs,
	query,
	updateDoc,
	where,
} from "firebase/firestore";
import { db } from "../../../config/firebase";
import Loading from "../../Loading";
import Request from "../List/RequestsList/Request";

const Friend = ({ email, friend, add, request }) => {
	const { user,selected, setUserChat } = useContext(userContext);
	const [current, setCurrent] = useState({});
	const name = friend?.displayName || current?.displayName;
	const iconStyle =
		"hover:bg-indigo-800 rounded-full cursor-pointer hover:text-zinc-200 dark:hover:text-zinc-200 transition-all duration-200 p-2 text-[170%]";
	const [count, setCount] = useState(0);
	const getUserFromDB = async () => {
		if (typeof email == "string") {
			const q = query(collection(db, "Users"), where("email", "==", email));
			const querySnapshot = await getDocs(q);
			const data = querySnapshot.docs.map((doc) => doc.data());
			setCurrent(data[0]);
		}
	};
	const addFriend = async () => {
		if (!friend) return;
		console.log("adding friend request to user " + friend.id);
		const userRef = doc(db, "Users", user.uid);
		const friendRef = doc(db, "Users", friend.id);
		await updateDoc(userRef, {
			sentReq: arrayUnion(friend.email),
		});
		await updateDoc(friendRef, {
			requests: arrayUnion(user.email),
		});

		setCount(count + 1);
		console.log("Friend request sent to " + friend.id);
	};
	useEffect(() => {
		if (request) {
			email = request;
		}
	}, [request]);
	useEffect(() => {
		getUserFromDB();
	}, [name]);
	return (
		<div
			className={`mb-1 flex items-center justify-between bg-zinc-200/5 hover:bg-indigo-200/40 font-medium dark:bg-zinc-800/20 dark:hover:bg-zinc-700/80 duration-300 p-3 transition-all cursor-pointer rounded-lg ${
				selected==email && "bg-indigo-500/40 dark:bg-zinc-800 hover:bg-indigo-300/60 hover:dark:bg-zinc-900"
			}`}
			>
			<div className="flex items-center gap-2 sm:gap-1 lg:gap-3 mr-0 sm:mr-0 md:mr-0 lg:mr-2 flex-1 "
			onClick={() => {
				if (email){
					if (selected === email) {
						setUserChat(null);
					} else {
						setUserChat(email);
					}
				}
			}}
			
			>
				<Avatar name={name} />
				<h1 className={` ${add?"sm:block md:block":"hidden sm:hidden md:hidden"} lg:block text-[80%] text-nowrap break-keep`}>
					{name || (
						<>
							<Loading />
						</>
					)}
				</h1>
			</div>
			<div className="flex items-center text-2xl flex-none">
				{request ? (
					<>
						<Request reqEmail={request} />
					</>
				) : (
					<>
						{!add ? (
							<div className="hidden sm:hidden md:block lg:flex items-center justify-center">
								{/* <MdCall className={iconStyle} /> */}
							</div>
						) : (
							<>
								<IoPersonAddSharp
									className={iconStyle}
									onClick={addFriend}
								/>
							</>
						)}
						{count === 0 ? (
							<MdOutlineMoreHoriz
								className={iconStyle + " mr-2"}
								onClick={() => {
									setCount(1);
								}}
							/>
						) : (
							<div className="flex items-center gap-1 transition-all duration-1000 ">
								<MdBlock
									className={iconStyle}
									onClick={() => {
										console.log("Block User");
									}}
								/>
								<MdDelete className={iconStyle}
								onClick={()=>{
									    console.log("Delete User");
								}}/>
								<RxCross2
									className={
										iconStyle +
										" text-red-500 hover:text-white hover:bg-red-500 "
									}
									onClick={() => {
										setCount(0);
									}}
								/>
							</div>
						)}
					</>
				)}
			</div>
		</div>
	);
};

export default Friend;
