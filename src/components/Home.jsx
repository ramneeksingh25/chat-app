import { createContext, useEffect, useState } from "react";
import { auth, db } from "../config/firebase";
import Loading from "./Loading";
import List from "./home/List";
import Chats from "./home/chat";
import { collection, getDocs, onSnapshot, query, where } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
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
	const [id,setID]=useState(0);
	const [user, setUser] = useState(null);
	const [userDB,setUserDB] = useState(null);
	const [userFriendsArray,setUserFriendsArray]=useState([]);
	const [userRequestsArray,setUserRequestsArray]=useState([]);
	const [loading, setLoading] = useState(true);
	const [rerender,setRerender]=useState(false);
	const navigate = useNavigate();
	const fetchUserFromDB = async () => {
		const q = query(collection(db,"Users"),where("email","==",auth?.currentUser?.email));
		const querySnapshot = await getDocs(q);
		const data=querySnapshot.docs.map(doc=>doc.data());
		setUserDB(data[0]);
		setUser(auth.currentUser);
		setUserFriendsArray(data[0].friends);
		setUserRequestsArray(data[0].requests);
	}
	auth.onAuthStateChanged((user)=>{
		if (!user) {
			navigate("/")			
		}
	})
	useEffect(()=>{
		console.log("Home rendered");
		setTimeout(() => {
			// console.log(auth.currentUser.uid);
			setID(auth.currentUser.uid);
			setEmail(auth.currentUser.email);
			fetchUserFromDB()
			
		},1000);
	},[rerender])
	useEffect(()=>{
		if (email) {
			setLoading(false);
		}
	},[email])
	onSnapshot(query(collection(db,"Users"),where("email","==",email)),(snapshot)=>{
		snapshot.docChanges().forEach((change)=>{
			if (change.type === "modified") {
				console.log(change);
                setRerender(!rerender);
            }
		})
	})
	const [profileVisible, setProfileVisible] = useState(true);
	return loading ? (
    <div className="flex items-center justify-center h-screen text-[10vh]">
      <Loading />
    </div>
	) : (
		<>
			<userContext.Provider value={{user,userDB,userFriendsArray,userRequestsArray,id,email,setRerender}}>
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
