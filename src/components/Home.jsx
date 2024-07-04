import { createContext, useState } from "react";
import { auth, db } from "../config/firebase";
import ProfileInfo from "./home/List/Profile";
import { collection, getDocs } from "firebase/firestore";
import Loading from "./Loading";
import FriendList from "./home/List/FriendList";
import List from "./home/List";
import Chats from "./chat";
export const userContext = createContext({
  uid:"1234",
  displayName:"John Doe",
  email:"johndoe@example.com",
  photoURL:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6SGvshARHJ5GYSH_Kig8-cYNw5rO3nWn7mA&s",
});
const Home = () => {
	const [user, setUser] = useState(null);
	const [selected,setSelected]=useState("");
	const [loading, setLoading] = useState(true);
	setTimeout(() => {
		console.log(auth.currentUser);
		setUser(auth.currentUser);
		setLoading(false);
	}, 1000);
	const [profileVisible, setProfileVisible] = useState(true);
	return loading ? (
    <div className="flex items-center justify-center h-screen text-[10vh] text-indigo-800 dark:text-indigo-300 animate-spin-slow">
      <Loading />
    </div>
	) : (
		<>
			{/* {JSON.stringify(user)} */}
			<userContext.Provider value={{user,selected,setSelected}}>
				<div className=" h-screen w-[100%] grid grid-cols-4 gap-3 p-3 text-sm sm:text-sm md:text-md lg:text-lg text-indigo-900 dark:text-indigo-300 select-none">
					<List />
					<div className={`col-span-3 sm:col-span-3 md:col-span-3 lg:col-span-2 relative ${profileVisible?" ":"lg:col-span-3"}`}>
						<Chats/>
					</div>
					{profileVisible&&<div
						className={`sm:hidden md:hidden hidden ${
							profileVisible ? "lg:block" : "lg:hidden"
						} `}>
							Details
					</div>}
				</div>
			</userContext.Provider>
		</>
	);
};

export default Home;
