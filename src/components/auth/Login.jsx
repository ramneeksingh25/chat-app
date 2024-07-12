import logo from '/favicon.svg'
import {
	getRedirectResult,
	signInWithEmailAndPassword,
	signInWithRedirect,
} from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../../config/firebase";
import Input from "./Input";
const Login = () => {
	const [isSigningIn, setSigningIn] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const navigate = useNavigate();
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
	auth.onAuthStateChanged((user) => {
		if (user) {
			setSigningIn(true);
			navigate("/home");
		}
	});
	
	return (
		<div className="flex items-center justify-center w-full h-screen flex-col">
			<div
				className={
					"w-96 text-indigo-800 dark:text-indigo-300 select-none space-y-5 p-7 shadow-xl rounded-lg bg-zinc-200/30 dark:bg-zinc-800/50 backdrop-blur-30"
				}
				onKeyDown={(e) => {
					if (e.key === "Enter") {
						signIn();
					}
				}}>
			<div className='flex items-center justify-center'>
				<img src={logo} alt="logo" className='w-16'/>
				<div className="text-2xl flex-1 bg-gradient-to-r from-blue-500 to-pink-500 text-transparent bg-clip-text underline hover:from-blue-6 cursor-auto  hover:to-pink-600 select-none text-center">
					<span className="text-5xl">ChatterBox</span> <br /> 
					Chat, Share, Connect
				</div>
			</div>
				<div className="text-center">
					<div className="mt-2">
						<h3 className="select-none font-medium underline hover:decoration-pink-300/70 decoration-indigo-700/70 transition duration-1000">
							Sign In to your account!
						</h3>
					</div>
				</div>
				<Input
					type={"Email"}
					onChange={setEmail}
					required
				/>
				<Input
					type={"Password"}
					onChange={setPassword}
					required
				/>
				{errorMessage && (
					<span className="text-red-600 font-semibold">{errorMessage}</span>
				)}

				<button
					type="submit"
					disabled={isSigningIn}
					onClick={signIn}
					className={`w-full px-4 py-2 text-white font-medium rounded-lg transition-all duration-500 bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-700 hover:to-pink-700 hover:shadow-xl ${
						isSigningIn
							? "bg-gray-300 cursor-not-allowed"
							: " bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-700 hover:to-pink-700 hover:shadow-xl transition duration-300"
					}`}>
					{isSigningIn ? "Signing In..." : "Sign In"}
				</button>
				<p className="text-center text-sm text-indigo-700/90 dark:text-indigo-300/90 hover:text-pink-700/90 dark:hover:text-pink-300/90 transition duration-300">
					{" "}
					Dont have an account?{" "}
					<Link
						to={"/register"}
						className="hover:underline font-bold">
						Sign up
					</Link>
				</p>
			</div>
		</div>
	);
};

export default Login;
