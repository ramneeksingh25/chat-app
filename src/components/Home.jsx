import { createContext, useEffect, useState } from "react";
import { auth, db } from "../config/firebase";
import Loading from "./Loading";
import List from "./home/List";
import Chats from "./home/chat";
import {
	collection,
	getDocs,
	onSnapshot,
	query,
	where,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setU } from "../redux/user/userSlice";
export const userContext = createContext(null);
const Home = () => {
	const dispatch = useDispatch();
	const [email, setEmail] = useState(null);
	const [id, setId] = useState(null);
	const [loading, setLoading] = useState(true);
	const [rerender, setRerender] = useState(false);
	const navigate = useNavigate();
	const [selected, setSelected] = useState(null);
	const fetchUserFromDB = async () => {
		const q = query(
			collection(db, "Users"),
			where("email", "==", auth.currentUser.email)
		);
		const querySnapshot = await getDocs(q);
		const data = querySnapshot.docs.map((doc) => doc.data());
		dispatch(setU(data[0]));
	};
	auth.onAuthStateChanged((user) => {
		if (!user) {
			navigate("/");
		}
	});
	useEffect(() => {
		console.log("Home rendered");
		setTimeout(() => {
			setEmail(auth?.currentUser?.email);
			setId(auth?.currentUser?.uid);
			fetchUserFromDB();
		}, 1000);
	}, [rerender]);
	useEffect(() => {
		if (email) {
			setLoading(false);
		}
	}, [email]);
	onSnapshot(
		query(collection(db, "Users"), where("email", "==", email)),
		(snapshot) => {
			snapshot.docChanges().forEach((change) => {
				if (change.type === "modified") {
					console.log(change.doc);
					setRerender(!rerender);
				}
			});
		}
	);
	const setUserChat = (s) => {
		setSelected(s);
	};
	const provider = {
		id,
		email,
		selected,
		setUserChat,
		setRerender,
	};
	return loading ? (
		<div className="flex items-center justify-center h-screen text-[10vh]">
			<Loading />
		</div>
	) : (
		<>
			<userContext.Provider value={provider}>
				<div className=" h-screen w-[100%] grid grid-cols-4 gap-3 p-2 text-sm sm:text-sm md:text-md lg:text-lg text-indigo-900 dark:text-indigo-200 select-none">
					<div
						className={`col-span-3 relative transition-all duration-500`}>
						<Chats />
					</div>
					<List />
				</div>
			</userContext.Provider>
		</>
	);
};

export default Home;
