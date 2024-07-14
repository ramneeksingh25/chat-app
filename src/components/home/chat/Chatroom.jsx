import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../../Home";
import MessageInput from "./MessageInput";
import { db, realtimeDB } from "../../../config/firebase";
import { collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import Avatar from "../components/Avatar";
import Messages from "./Messages";
import { BiMenu } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { ref, remove } from "firebase/database";
const Chatroom = ({ room }) => {
	const { selected } = useContext(userContext);
	const [chatID, setChatID] = useState(null);
	const [current, setCurrent] = useState(null);
	const [menu, setMenu] = useState(false);

	const getUserFromDB = async () => {
		const q = query(collection(db, "Users"), where("email", "==", selected));
		const querySnapshot = await getDocs(q);
		const data = querySnapshot.docs.map((doc) => doc.data());
		setCurrent(data[0]);
	};
	const handleMenu = () => {
		setMenu(!menu);
	};
	const handleDelete = async () => {
		if (!room) return;
        const chatRef = doc(db, "Chats", room.id);
        await deleteDoc(chatRef);
        window.location.reload();
		remove(ref(realtimeDB,"chats/"+room.id));
	}
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
			<div className="relative border-b border-black/20 bg-zinc-200/5 dark:bg-zinc-800/40 p-2 flex items-center justify-center gap-3 font-semibold">
				{current?.photoURL ? (
					<img
						src={current.photoURL}
						alt="ProfilePic"
						className="h-[40px] w-[40px] rounded-full border dark:border-cyan-100 border-indigo-800"
					/>
				) : (
					<Avatar
						name={current?.displayName}
						size="md"
					/>
				)}
				<h1>{current?.displayName}</h1>
				<div className="absolute right-4">
					<BiMenu
						className=" p-1 text-2xl rounded-full hover:bg-zinc-900 cursor-pointer"
						onClick={handleMenu}
					/>
					{menu && (
						<>
							<div className="absolute top-0 right-0 py-3 px-4 bg-black/40 z-50 text-white text-nowrap flex items-center justify-start">
									Delete Chat? <MdDelete className="text-red-600 hover:bg-red-600 hover:text-white m-3 p-1 text-3xl rounded-full" onClick={handleDelete}/>
							</div>
							<div
								className="fixed top-0 left-0 z-10 w-full h-screen"
								onClick={handleMenu}></div>
						</>
					)}
				</div>
			</div>
			<Messages chat={room} />
			<MessageInput chatID={chatID} />
		</div>
	);
};

export default Chatroom;
