import React, { useContext, useEffect, useState } from "react";
import { MdBlock, MdDelete, MdOutlineMoreHoriz } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { IoPersonAddSharp } from "react-icons/io5";
import Avatar from "./Avatar";
import { userContext } from "../../Home";
import {
	arrayRemove,
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
import { useSelector } from "react-redux";

const Friend = ({ email, friend, add, request, overlayF }) => {
	const { id, selected, setUserChat } = useContext(userContext);
	const User = useSelector((state) => state.user);
	const [current, setCurrent] = useState({});
	const [photoURL, setPhotoURL] = useState("");
	const [showOptions, setShowOptions] = useState(false);

	const name = friend?.displayName || current?.displayName;
	const iconStyle =
		"hover:bg-indigo-800 rounded-full cursor-pointer hover:text-zinc-200 dark:hover:text-zinc-200 transition-all duration-200 p-2 text-[170%]";

	const fetchUserFromDB = async () => {
		if (typeof email === "string") {
			const q = query(collection(db, "Users"), where("email", "==", email));
			const querySnapshot = await getDocs(q);
			const data = querySnapshot.docs.map((doc) => doc.data());
			setCurrent(data[0] || {});
		}
	};
	
	const handleAddFriend = async () => {
		if (!friend) return;
		
		const userRef = doc(db, "Users", id);
		const friendRef = doc(db, "Users", friend.id);
		
		await updateDoc(userRef, {
			sentReq: arrayUnion(friend.email),
		});
		
		await updateDoc(friendRef, {
			requests: arrayUnion(User.email),
		});
		
		overlayF(false);
		console.log("Friend request sent to " + friend.id);
	};
	const handleDeleteFriend = async ()=>{
		if (!email) return;
		if (selected==email){
			setUserChat(null);
		}
        const userRef = doc(db, "Users", id);
		const q = query(collection(db, "Users"), where("email", "==", email));
		const querySnapshot = await getDocs(q);
		const data = querySnapshot.docs.map((doc) => doc.id);
		console.log(data[0]);
        const friendRef = doc(db, "Users",data[0]);
		
        await updateDoc(userRef, {
            friends: arrayRemove(email),
            requests: arrayRemove(email),
        });

        await updateDoc(friendRef, {
            friends: arrayRemove(User.email),
            sentReq: arrayRemove(User.email),
        });
        console.log("Friend deleted " + friend.id);
	}
	useEffect(() => {
		if (request) {
			email = request;
		}
		fetchUserFromDB();
	}, [request]);

	useEffect(() => {
		fetchUserFromDB();
		setPhotoURL(email?.photoURL || friend?.photoURL);
	}, [name]);

	const handleUserClick = () => {
		if (email) {
			setUserChat(selected === email ? null : email);
		}
	};

	return (
		<div
			className={`mb-1 flex items-center justify-between p-3 rounded-lg transition-all duration-300 cursor-pointer ${
				selected === email
					? "bg-indigo-400/60 dark:bg-zinc-900 hover:bg-indigo-300/60 hover:dark:bg-zinc-900"
					: "bg-zinc-200/20 hover:bg-indigo-200/40 dark:bg-zinc-800/20 dark:hover:bg-zinc-700/80"
			} ${current || friend ? "" : "animate-pulse"}`}>
			<div className="flex items-center gap-2 flex-1" onClick={handleUserClick}>
				{photoURL ? (
					<img
						src={photoURL}
						className="w-10 h-10 rounded-full border border-white/40"
						alt=""
					/>
				) : (
					<Avatar name={name} />
				)}
				<h1 className={`lg:block text-[80%] ${add ? "block" : "hidden"}`}>
					{name || <Loading />}
				</h1>
			</div>
			<div className="flex items-center text-2xl flex-none">
				{request ? (
					<Request reqEmail={request} />
				) : (
					<>
						{add && (
							<IoPersonAddSharp className={iconStyle} onClick={handleAddFriend} />
						)}
						{showOptions ? (
							<div className="flex items-center gap-1">
								{/* <MdBlock className={iconStyle} onClick={() => console.log("Block User")} /> */}
								<MdDelete className={iconStyle} onClick={handleDeleteFriend} />
								<RxCross2
									className={`${iconStyle} text-red-500 hover:text-white hover:bg-red-500`}
									onClick={() => setShowOptions(false)}
								/>
							</div>
						) : (
							<MdOutlineMoreHoriz
								className={`${iconStyle} mr-2`}
								onClick={() => setShowOptions(true)}
							/>
						)}
					</>
				)}
			</div>
		</div>
	);
};

export default Friend;
