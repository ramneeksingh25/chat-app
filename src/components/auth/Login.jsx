import {
	getRedirectResult,
	signInWithEmailAndPassword,
	signInWithRedirect,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../../config/firebase";
import { FcGoogle } from "react-icons/fc";
const Login = () => {
	const [isSigningIn, setSigningIn] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [response,setResponse]=useState("")
	const navigate = useNavigate();
	const inputStyle =
		"w-full mt-2 px-3 py-2 text-gray-600 bg-white outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300 border-slate-300";
	const boxStyle= "w-96 text-indigo-800 dark:text-indigo-300 select-none space-y-5 p-4 shadow-xl rounded-xl bg-zinc-200/30 dark:bg-zinc-800/80 backdrop-blur-30";
	const signIn = async () => {
		try {
			setErrorMessage("");
			setSigningIn(true);
			await signInWithEmailAndPassword(auth, email, password);
		} catch (error) {
			console.error("Error signing in:", error);
			setSigningIn(false);
			setErrorMessage("Error Signing in! Check your credentials.");
		}
	};
	const signInwithGoogle = async () => {
		try {
			console.log("GOOGLE");
			signInWithRedirect(auth,googleProvider)
			getRedirectResult(auth).then((result)=>{
				console.log(result);
			})
			
		} catch (error) {
			console.error("Error signing in with Google:", error);
			setErrorMessage("Error Signing in with Google");
			setSigningIn(false);
		}
	};
	auth.onAuthStateChanged((user) => {
		if (user) {
			setSigningIn(true);
			navigate("/home");
		}
	});
	return (
		<div className="flex items-center justify-center w-full h-screen">
			<div className={boxStyle} onKeyDown={(e)=>{
				if(e.key === "Enter"){
                    signIn();
                }
			}}>
				<div className="text-center">
					<div className="mt-2">
						<h3 className="text-xl font-semibold sm:text-2xl select-none underline decoration-pink-500/70 hover:decoration-indigo-700/70 transition duration-1000">
							Welcome Back!
						</h3>
					</div>
				</div>
				<div>
					<label className="text-sm font-bold underline decoration-pink-500/70 hover:decoration-indigo-700/70 transition duration-500">Email</label>
					<input
						type="email"
						name="email"
						autoComplete="email"
						required
						value={email}
						onChange={(e) => {
							setEmail(e.target.value);
						}}
						className={inputStyle}
					/>
				</div>
				<div>
					<label className="text-sm font-bold underline decoration-pink-500/70 hover:decoration-indigo-700/70 transition duration-500">Password</label>
					<input
						type="password"
						name="password"
						autoComplete="current-password"
						required
						value={password}
						onChange={(e) => {
							setPassword(e.target.value);
						}}
						className={inputStyle}
					/>
				</div>

				{errorMessage && (
					<span className="text-red-600 font-semibold">{errorMessage}</span>
				)}

				<button
					type="submit"
					disabled={isSigningIn}
					onClick={signIn}
					className={`w-full px-4 py-2 text-white font-medium rounded-lg ${
						isSigningIn
							? "bg-gray-400 cursor-not-allowed"
							: " bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-700 hover:to-pink-700 hover:shadow-xl transition duration-300"
					}`}>
					{isSigningIn ? "Signing In..." : "Sign In"}
				</button>
				<p className="text-center text-sm">
					{" "}
					Dont have an account?{" "}
					<Link
						to={"/register"}
						className="hover:underline font-bold">
						Sign up
					</Link>
				</p>
				<div className="flex flex-row text-center w-full">
					<div className="border-b-2 mb-2.5 mr-2 w-full border-slate-800/20 dark:border-slate-300/20"></div>
					<div className="text-sm font-bold w-fit">OR</div>
					<div className="border-b-2 mb-2.5 ml-2 w-full border-slate-800/20 dark:border-slate-300/20"></div>
				</div>
				<button
					disabled={isSigningIn}
					onClick={signInwithGoogle}
					className={`w-full flex items-center justify-center gap-x-3 py-2.5 rounded-lg text-sm font-medium bg-gradient-to-r text-white  ${
						isSigningIn
							? "cursor-not-allowed from-slate-400/90 to-slate-500/70"
							: "from-indigo-600/80 to-blue-700/50 hover:from-blue-700/80 hover:to-indigo-700/80 hover:shadow-xl transition duration-300"
					}`}>
					{isSigningIn ? "Signing In..." : "Continue with Google"}
					<FcGoogle className="bg-slate-200 text-xl p-1 rounded-full"/>

				</button>
			</div>
		</div>
	);
};

export default Login;
