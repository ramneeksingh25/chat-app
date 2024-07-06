import { createContext, useEffect, useState } from "react";
import { auth, db } from "../config/firebase";
import Loading from "./Loading";
import List from "./home/List";
import Chats from "./home/chat";
import { collection, getDocs, query, where } from "firebase/firestore";
import { FaUserTimes } from "react-icons/fa";
export const userContext = createContext({
  uid:"1234",
  displayName:"John Doe",
  email:"johndoe@example.com",
  photoURL:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6SGvshARHJ5GYSH_Kig8-cYNw5rO3nWn7mA&s",
  friends:["12345","12"],
  requests:["http@example.com"],
  sentReq:["abc@abc.com"]
});
const Home = () => {
	const [email,setEmail]=useState(null);
	const [user, setUser] = useState(null);
	const [userDB,setUserDB] = useState(null);
	const [selected,setSelected]=useState("");
	const [userFriendsArray,setUserFriendsArray]=useState([]);
	const [loading, setLoading] = useState(true);
	const fetchUserFromDB = async () => {
		const q = query(collection(db,"Users"),where("email","==",auth?.currentUser?.email));
		const querySnapshot = await getDocs(q);
		const data=querySnapshot.docs.map(doc=>doc.data());
		console.log(data[0]);
		setUserDB(data[0]);
		setUser(auth.currentUser);
		setUserFriendsArray(data[0].friends);
	}
	useEffect(()=>{
		setTimeout(() => {
			console.log(auth.currentUser?.email);
			setEmail(auth.currentUser.email);
			fetchUserFromDB();
		},1000);
	},[])
	useEffect(()=>{
		if (email) {
			setLoading(false);
		}
	},[email])
	const [profileVisible, setProfileVisible] = useState(true);
	return loading ? (
    <div className="flex items-center justify-center h-screen text-[10vh] text-indigo-800 dark:text-indigo-300 animate-spin-slow">
      <Loading />
    </div>
	) : (
		<>
			{JSON.stringify(userFriendsArray)}
			<userContext.Provider value={{user,userDB,userFriendsArray,selected,setSelected}}>
				<div className=" h-screen w-[100%] grid grid-cols-4 gap-3 p-3 text-sm sm:text-sm md:text-md lg:text-lg text-indigo-900 dark:text-indigo-200 select-none">
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
