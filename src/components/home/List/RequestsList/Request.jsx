import React, { useContext, useEffect, useState } from "react";
import { IoCheckmark } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { userContext } from "../../../Home";
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
import { db } from "../../../../config/firebase";
import Loading from "../../../Loading";
import { useSelector } from "react-redux";

const Request = ({ reqEmail }) => {
	const {id, email, setRerender } = useContext(userContext);
	const userRef = doc(db, "Users", id);
	const [friendRef, setFriendRef] = useState(null);
	const [loading, setLoading] = useState(null);
	const acceptFriend = async () => {
		console.log("Accept Friend Request" + reqEmail);
		await updateDoc(userRef, {
			friends: arrayUnion(reqEmail),
			requests: arrayRemove(reqEmail),
		});
		await updateDoc(friendRef, {
			friends: arrayUnion(email),
			sentReq: arrayRemove(email),
		});
		setLoading(true);
		setRerender((prev) => !prev);
	};
	const rejectFriend = async () => {
		console.log("Reject Friend Request" + reqEmail);
		await updateDoc(userRef, {
			requests: arrayRemove(reqEmail),
		});
		await updateDoc(friendRef, {
			sentReq: arrayRemove(reqEmail),
		});
		await updateDoc(friendRef, {
			sentReq: arrayRemove(email),
		});
		setLoading(true)
	};
	const getReqUser = async () => {
		const q = query(collection(db, "Users"), where("email", "==", reqEmail));
		const friend = await getDocs(q);
		const data = friend.docs.map((doc) => doc.id);
		console.log(data[0]);
		setFriendRef(doc(db, "Users", data[0]));
	};
	useEffect(() => {
		getReqUser();
	}, []);
	const iconStyle = (color) =>
		`rounded-full p-2 text-[170%] text-${color}-600 hover:text-white hover:bg-${color}-600`;
	return (
		<>
			<div className={`flex items-center gap-2 ${loading ? "w-0" : "w-full"}`}>
				<IoCheckmark
					className={`${iconStyle("green")} hover:bg-green-600`}
					onClick={acceptFriend}
					/>
				<RxCross2
					className={`${iconStyle("red")} `}
					onClick={rejectFriend}
					/>
			</div>
			<div className={loading?" opacity-100":"opacity-0"}>
				<Loading/>
			</div>
		</>
	);
};

export default Request;
