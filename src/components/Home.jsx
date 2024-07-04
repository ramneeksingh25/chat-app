import { createContext, useState } from "react";
import { auth, db } from "../config/firebase";
import ProfileInfo from "./home/List/Profile";
import { collection, getDocs } from "firebase/firestore";
import Loading from "./Loading";
import FriendList from "./home/List/FriendList";
import List from "./home/List";
export const userContext = createContext({
  uid:"1234",
  displayName:"John Doe",
  email:"johndoe@example.com",
  photoURL:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6SGvshARHJ5GYSH_Kig8-cYNw5rO3nWn7mA&s",
});
const Home = () => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	setTimeout(() => {
		console.log(auth.currentUser);
		setUser(auth.currentUser);
		setLoading(false);
	}, 1000);
	const [profileVisible, setProfileVisible] = useState(true);
	return loading ? (
		<Loading />
	) : (
		<>
			{/* {JSON.stringify(user)} */}
			<userContext.Provider value={user}>
				<div className=" h-screen w-[100%] grid grid-cols-4 gap-3 p-2 text-sm sm:text-sm md:text-md lg:text-lg text-indigo-800 dark:text-indigo-300 select-none">
					<div>
						<List />
					</div>
					<div className="col-span-3 sm:col-span-3 md:col-span-3 lg:col-span-2 bg-zinc-800/60 rounded-md text-white relative">
						<div>Chats</div>
					</div>
					<div
						className={`sm:hidden md:hidden hidden ${
							profileVisible ? "lg:block" : "lg:hidden"
						} `}>
						<div>Profile</div>
					</div>
				</div>
			</userContext.Provider>
		</>
	);
};

export default Home;
