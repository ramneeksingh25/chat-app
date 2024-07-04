import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../../config/firebase";
import { doc, setDoc } from "firebase/firestore";

const Register = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [isSigningIn, setSigningIn] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const inputStyle =
		"w-full mt-2 px-3 py-2 text-gray-600 bg-white outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300 border-slate-300";
	const boxStyle= "w-96 text-indigo-800 dark:text-indigo-300 select-none space-y-5 p-4 shadow-xl rounded-xl bg-zinc-200/30 dark:bg-zinc-800/50 backdrop-blur-30";
	const textStyle = "text-sm font-bold underline decoration-pink-500/70 hover:decoration-indigo-700/70 transition duration-500"
	const navigate = useNavigate();
	const signUp = async () => {
		if (password !== confirmPassword) {
			setErrorMessage("Passwords do not match!");
			return;
		}
		setErrorMessage("");
		try {
			setSigningIn(true);
			await createUserWithEmailAndPassword(auth, email, password);
			const user = auth.currentUser;
			updateProfile(auth.currentUser, {
				displayName: name
			  })
			console.log(user);
			if (user) {
				await setDoc(doc(db, "Users", user.uid), {
				  email: user.email,
				  displayName: name,
				  photo:""
				});
			  }

			navigate("/home");

		} catch (error) {
			console.error("Error creating user:", error);
			console.log(error);
			setErrorMessage(error.message)
			setSigningIn(false)
		}
	};
	auth.onAuthStateChanged((user) => {
		if (user) {
			setSigningIn(true);
			navigate("/home");
		}
	});
	return (
		<div>
			<div className="flex items-center justify-center w-full h-screen select-none">
				<div className={boxStyle} onKeyDown={(e)=>{
				if(e.key === "Enter"){
                    signUp();
                }
			}}>
					<div className="text-center">
						<div className="mt-2">
							<h3 className={` text-xl font-semibold  ${textStyle} `}>
								Please Enter your details
							</h3>
						</div>
					</div>
					<div>
						<label className={textStyle}>
							Enter Name
						</label>
						<input
							type="text"
							autoComplete="name"
							required
							value={name}
							onChange={(e) => {
								setName(e.target.value);
							}}
							className={inputStyle}
						/>
					</div>
					<div>
						<label className={textStyle}>
							Enter Email
						</label>
						<input
							type="text"
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
						<label className={textStyle}>
							Enter Password
						</label>
						<input
							type="password"
							autoComplete="current-password"
							required
							value={password}
							onChange={(e) => {
								setPassword(e.target.value);
							}}
							className={inputStyle}
						/>
					</div>
					<div>
						<label className={textStyle}>
							Confirm Password
						</label>
						<input
							type="password"
							autoComplete="current-password"
							required
							value={confirmPassword}
							onChange={(e) => {
								setConfirmPassword(e.target.value);
							}}
							className={inputStyle}
						/>
					</div><br />
					{errorMessage && (
						<span className="text-red-600 font-bold m-3 leading-7">{errorMessage}</span>
					)}
					
					<button
						type="submit"
						disabled={isSigningIn}
						onClick={signUp}
						className={`w-full px-4 py-2 text-white font-medium rounded-lg ${
							isSigningIn
								? "bg-gray-300 cursor-not-allowed"
								: " bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-700 hover:to-pink-700 hover:shadow-xl transition duration-300"
								}`}>
						{isSigningIn ? "Signing In..." : "Register"}
					</button>
					<p className="text-center text-sm">
						{" "}
						Already have an account?{" "}
						<Link
							to={"/signin"}
							className="hover:underline font-bold">
							Sign in
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Register;
