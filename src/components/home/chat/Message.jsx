import React, { useEffect, useState } from "react";
import Loading from "../../Loading";
import { useSelector } from "react-redux";
import { child, get, ref } from "firebase/database";
import { realtimeDB } from "../../../config/firebase";
import Avatar from "../components/Avatar";

const Message = ({ obj, chat }) => {
	const [sender, setSender] = useState(false);
	const [message, setMessage] = useState(null);
	const User = useSelector((state) => state.user);
	const email = User?.email;
	const getMessage = async () => {
		const dbRef = ref(realtimeDB);
		get(child(dbRef, `chats/${chat}/${obj.id}`))
			.then((snapshot) => {
				if (snapshot.exists()) {
					setMessage(snapshot.val());
					setSender(snapshot.val().sender === email);
				} else {
					console.log("No data available");
				}
			})
			.catch((error) => {
				console.error(error);
			});
	};
	useEffect(() => {
		if (obj) {
			getMessage();
		}
	}, [obj, sender]);
	return message ? (
		<div
			className={`w-full select-text my-[5px] flex ${
				sender ? "justify-end" : "justify-start"
			}`}>
			{sender ? (
				<div className="flex items-center gap-1 group">
					<div className="hidden group-hover:block select-none">
						{new Date(message.sentAt).toLocaleTimeString().split(":")[0]}
						:
						{new Date(message.sentAt).toLocaleTimeString().split(":")[1]}
					</div>
					<div className="bg-white/55 dark:bg-zinc-500/55 hover:bg-white/80 dark:hover:bg-zinc-500/80 px-2 py-1 rounded-full m-[1px] w-fit">
						{message.text}
					</div>
					{message.photoURL ? (
						<img
							src={message.photoURL}
							alt=""
							className="h-[30px] w-[30px] rounded-full border border-indigo-800 dark:border-cyan-100"
						/>
					) : (
						<Avatar name={message.senderName || message.sender} size="sm" />
					)}
				</div>
			) : (
				<div className="flex items-center gap-1 group">
					{message.photoURL ? (
						<img
							src={message.photoURL}
							alt=""
							className="h-[30px] w-[30px] rounded-full border border-indigo-800 dark:border-cyan-100"
						/>
					) : (
						<Avatar name={message.senderName || message.sender} size="sm" />
					)}
					<div className="bg-indigo-700/95 dark:bg-indigo-600/55 hover:bg-indigo-600/95 hover:dark-indigo-600/80 text-white px-2 py-1 rounded-full m-[1px] w-fit">
						{message.text}
					</div>
					<div className="hidden group-hover:block select-none">
						{new Date(message.sentAt).toLocaleTimeString().split(":")[0]}
						:
						{new Date(message.sentAt).toLocaleTimeString().split(":")[1]}
					</div>
				</div>
			)}
		</div>
	) : (
		<>
			<div>
				<Loading />
			</div>
		</>
	);
};

export default Message;
