import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../../Home";
import MessageInput from "./MessageInput";
import { db } from "../../../config/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import Avatar from "../components/Avatar";
import Messages from "./Messages";
const Chatroom = ({ room }) => {
	const { selected } = useContext(userContext);
	const [chatID, setChatID] = useState(null);
	const [current, setCurrent] = useState(null);
	const getUserFromDB = async () => {
		const q = query(collection(db, "Users"), where("email", "==", selected));
		const querySnapshot = await getDocs(q);
		const data = querySnapshot.docs.map((doc) => doc.data());
		setCurrent(data[0]);
	};
	useEffect(() => {
		if (room) {
			setChatID(room.id);
		}
		getUserFromDB();
		return () => {
			setChatID(null);
		};
	}, [room, selected]);
	return (
		<div className="bg-zinc-200/20 dark:bg-zinc-900/20 border border-zinc-900/20 rounded-2xl overflow-x-hidden flex flex-col h-[96%] mt-2">
			<div className=" border-b border-black/20 bg-zinc-200/5 dark:bg-zinc-800/40 p-2 flex items-center justify-center gap-3 font-semibold">
				{current?.photoURL?<img src={current.photoURL} alt="ProfilePic"
				className="h-[40px] w-[40px] rounded-full border dark:border-cyan-100 border-indigo-800"
				/>:<Avatar name={current?.displayName} size="md"/>}
				<h1>{current?.displayName}</h1>
			</div>
			<Messages chat={room} />
			<MessageInput chatID={chatID} />
		</div>
	);
};

export default Chatroom;
