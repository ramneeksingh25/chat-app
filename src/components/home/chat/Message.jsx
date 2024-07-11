import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../../config/firebase";
import Loading from "../../Loading";
import { useSelector } from "react-redux";

const Message = ({ MID }) => {
	const [sender, setSender] = useState(false);
	const [message, setMessage] = useState(null);
	const User = useSelector((state) => state.user);
	const getMessage = async () => {
		const messageRef = doc(db, "Messages", MID);
		const messageSnap = await getDoc(messageRef);
		if (messageSnap.exists()) {
			setMessage(messageSnap.data());
			setSender(messageSnap.data().sender === User.email);
		} else {
			console.log("Message error");
		}
	};
	useEffect(() => {
		getMessage();
	}, []);
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
