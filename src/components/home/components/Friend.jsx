import React, { useContext, useEffect, useState } from "react";
import {
	MdBlock,
	MdCall,
	MdOutlineMoreHoriz,
	MdVideocam,
} from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { IoPersonAddSharp } from "react-icons/io5";
import Avatar from "./Avatar";
import { userContext } from "../../Home";
import {
	arrayUnion,
	collection,
	doc,
	getDocs,
	onSnapshot,
	query,
	updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../../config/firebase";
import Loading from "../../Loading";

const Friend = ({ email,friend, add, isSelected }) => {
	const { user, setSelected } = useContext(userContext);
  const [current,setCurrent]=useState({});
	const name = friend?.displayName || current?.displayName
	const iconStyle =
		"hover:bg-indigo-800 rounded-full cursor-pointer hover:text-zinc-200 dark:hover:text-zinc-200 transition-all duration-200 p-2 text-[170%]";
	const [count, setCount] = useState(0);
	const [tasks, setTasks] = useState([]);
	const getUserFromDB = async () => {
		if (typeof email == "string") {
			const q = query(collection(db, "Users"),where("email","==",email));
      const querySnapshot = await getDocs(q);
      const data=querySnapshot.docs.map(doc=>doc.data());
    //   console.log(data[0]);
      setCurrent(data[0]);
		}
	};
	const addFriend = async () => {
		if (!friend) return;
		console.log("adding friend request to user " + friend.id);
		//add friend to database
		const userRef = doc(db, "Users", user.uid);
		const friendRef = doc(db, "Users", friend.id);

		// update user friend list
		await updateDoc(userRef, {
			sentReq: arrayUnion(friend.email),
		});
		// update friend friend list
		await updateDoc(friendRef, {
			requests: arrayUnion(user.email),
		});

		setCount(count + 1);
		console.log("Friend request sent to " + friend.id);
	};
	useEffect(() => {
		getUserFromDB();
		// console.log(tasks);
	}, [name]);
	return (
		<div
			className={`mb-1 flex items-center justify-between bg-zinc-200/5 hover:bg-indigo-200/40 font-medium dark:bg-zinc-800/20 dark:hover:bg-zinc-800 duration-300 p-3 transition-all cursor-pointer rounded-lg ${
				isSelected && " bg-zinc-900"
			}`}
			onClick={() => {
				console.log(friend);
				setSelected(friend);
			}}>
			{/* <img src= alt='Ramneek' className='w-12 h-12 rounded-full'/> */}
      {/* {JSON.stringify(current)} */}
			<div className="flex items-center gap-2 mr-0 sm:mr-0 md:mr-0 lg:mr-2">
				<Avatar name={name} />
				<h1 className="hidden sm:hidden md:hidden lg:block">
					{name|| <>
            <Loading/>
          </>}
				</h1>
			</div>
			<div className="flex items-center text-2xl">
				{!add ? (
					<div className="hidden sm:hidden md:block lg:flex items-center justify-center">
						<MdCall className={iconStyle} />
						<MdVideocam className={iconStyle} />
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
						<RxCross2
							className={
								iconStyle + " text-red-500 hover:text-white hover:bg-red-500 "
							}
							onClick={() => {
								setCount(0);
							}}
						/>
					</div>
				)}
			</div>
		</div>
	);
};

export default Friend;
