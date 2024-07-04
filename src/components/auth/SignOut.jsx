import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase";

const SignOut = () => {
	const navigate = useNavigate();
	const [isSignedIn, setSignedIn] = useState(true);
	useEffect(() => {
		if (!isSignedIn) {
			navigate("/signin");
		}
	}, [isSignedIn, navigate]);
    
	return <button onClick={() => {auth.signOut();
        setSignedIn(false);
      }}
	  className={`text-white w-28 flex items-center justify-center gap-x-3 py-2.5 rounded-lg text-sm font-medium bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-700 hover:to-pink-700 hover:shadow-xl transition duration-300`}
	  >Sign Out</button>;
};

export default SignOut;
