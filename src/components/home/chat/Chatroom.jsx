import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../../Home";
import Messages from "./Messages";
import Input from "./Input";
import { IoSend } from "react-icons/io5";
import { db, realtimeDB } from "../../../config/firebase";
import { child, get, onValue, ref, set, update } from "firebase/database";
import { v4 } from "uuid";
import { useSelector } from "react-redux";
import {
	addDoc,
	arrayUnion,
	collection,
	doc,
	updateDoc,
} from "firebase/firestore";
import MessagesNew from "./MessagesNew";
const Chatroom = ({ room }) => {
	const { selected } = useContext(userContext);
	const User = useSelector((state) => state.user);
	const [chatID, setChatID] = useState(null);
	const [message, setMessage] = useState("");
	const sendMessage = async () => {
		console.log("Sending Message: ", message);
		const messageID = v4();
		const time = new Date();
		const seconds = time.getTime();
		const newMessage = {
			id: messageID,
			sender: User.email,
			receiver: selected,
			text: message,
			sentAt: seconds,
			image: "",
			photoURL: User.photoURL,
		};
		update(ref(realtimeDB, "chats/"+chatID + "/" + messageID), newMessage);
		await updateDoc(doc(db, "Chats", chatID), {
			messages: arrayUnion(messageID),
			lastSent: seconds,
		});
	};
	useEffect(() => {
		if (room) {
			setChatID(room.id);
		}
	}, [room, selected]);
	return (
		<>
			<div className="">{selected}</div>
			<MessagesNew chat={room}/>
			<div className="flex items-center justify-center">
				<input
					type="text"
					className="bg-black text-white rounded-xl p-3"
					onChange={(e) => {
						setMessage(e.target.value);
					}}
				/>
				<div
					className="rounded-full bg-blue-300 h-10 w-10 flex items-center justify-center text-black"
					onClick={sendMessage}>
					<IoSend />
				</div>
			</div>
			{/* Message: {message}
			<div className="bg-white/5 p-2 h-[85vh] w-full rounded-xl flex flex-col items-end justify-end">
			<MessagesNew />
			<Input/>
			</div> */}
		</>
	);
};

export default Chatroom;
