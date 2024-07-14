import React, { useEffect, useState } from "react";
import Loading from "../../Loading";
import { useSelector } from "react-redux";
import { child, get, ref } from "firebase/database";
import { realtimeDB } from "../../../config/firebase";

const Message = ({ obj,chat }) => {
	const [sender, setSender] = useState(false);
	const [message, setMessage] = useState(null);
	const User = useSelector((state) => state.user);
	const email = User?.email;
	const getMessage = async () => {
		const dbRef= ref(realtimeDB);
		// console.log(obj.id);
		get(child(dbRef, `chats/${chat}/${obj.id}`))
			.then((snapshot) => {
				if (snapshot.exists()) {
					// console.log(snapshot.val());
					setMessage(snapshot.val());
					setSender(message.sender === email);
				} else {
					console.log("No data available");
				}
			})
			.catch((error) => {
				console.error(error);
			});
	};
	useEffect(() => {
		if(obj) {
			getMessage();
		}
	}, [obj,sender,message]);
	return message ? (
		<div
			className={`w-full select-text my-[5px] flex ${
				sender ? "justify-end" : "justify-start"
			}`}>
			{sender ? (
				<div className="bg-white/55 dark:bg-zinc-500/55 px-2 py-1 rounded-full rounded-tr-none m-[1px] w-fit">
					{message.text}
				</div>
			) : (
				<div className="bg-indigo-500/55 dark:bg-indigo-800/55 text-white px-2 py-1 rounded-full rounded-tl-none m-[1px] w-fit">
					{message.text}
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
