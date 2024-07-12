import logo from "/favicon.svg";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../../config/firebase";
import { doc, setDoc } from "firebase/firestore";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import Input from "./Input";

const Register = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [profilePic, setProfilePic] = useState({
		file: null,
		url: "",
	});
	const [isSigningIn, setSigningIn] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const textStyle =
		"text-sm font-bold underline decoration-pink-500/70 hover:decoration-indigo-700/70 transition duration-500";
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
				displayName: name,
			});
			console.log(user);
			if (user) {
				await setDoc(doc(db, "Users", user.uid), {
					email: user.email,
					displayName: name,
					photoURL: profilePic.url,
					friends: [],
					requests: [],
					sentReq: [],
				});
			}

			navigate("/home");
		} catch (error) {
			console.error("Error creating user:", error);
			console.log(error);
			setErrorMessage(error.message);
			setSigningIn(false);
		}
	};
	auth.onAuthStateChanged((user) => {
		if (user) {
			setSigningIn(true);
			setTimeout(() => {
				navigate("/home");
			}, 1000);
		}
	});
	const handleAvatar = (e) => {
		if (e.target.files[0]) {
			setProfilePic({
				file: e.target.files[0],
				url: URL.createObjectURL(e.target.files[0]),
			});
		}
	};
	return (
		<div>
			<div className="flex items-center justify-center w-full h-screen select-none">
				<div
					className={
						"w-96 text-indigo-800 dark:text-indigo-300 select-none space-y-5 p-7 shadow-xl rounded-lg bg-zinc-200/30 dark:bg-zinc-800/50 backdrop-blur-30"
					}
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							signUp();
						}
					}}>
					<div className="flex items-center">
						<img
							src={logo}
							alt=""
							className="w-16"
						/>
						<div className="text-2xl flex-1 bg-gradient-to-r from-blue-500 to-pink-500 text-transparent bg-clip-text underline hover:from-blue-6 cursor-auto  hover:to-pink-600 select-none text-center">
							<span className="text-5xl">ChatterBox</span> <br />
							Chat, Share, Connect
						</div>
					</div>
					<div className="text-center">
						<div className="mt-2">
							<h3 className="select-none font-medium underline hover:decoration-pink-300/70 decoration-indigo-700/70 transition duration-1000">
								Enter your details to register!
							</h3>
						</div>
					</div>
					<div className="flex items-center justify-center">
						<label
							htmlFor="file"
							className="flex flex-col items-center gap-2 pointer-cursor">
							{profilePic.file && (
								<img
									src={profilePic.url}
									className="w-[70px] h-[70px] border border-white/20 p-[1px] rounded-full hover:border-white/90 transition-all duration-300 cursor-pointer"
									alt="yourProfile"
								/>
							)}
							<MdOutlineAddPhotoAlternate
								className={`bg-indigo-700 hover:bg-indigo-600
								w-[50px] h-[50px] p-[10px]
									rounded-full transition-all duration-500 flex items-center justify-center text-4xl cursor-pointer border border-pink-207hover:border-pink-400 text-pink-200 hover:text-pink-400 peer ${
									profilePic.file && "hidden"
								}`}
							/>
						</label>
						{profilePic.file && (
							<div
								className="hover:underline hover:text-[102%] cursor-pointer"
								onClick={() => {
									setProfilePic({
										file: null,
										url: "",
									});
								}}>
								Remove
							</div>
						)}
						<input
							type="file"
							id="file"
							className="hidden"
							onChange={handleAvatar}
						/>
					</div>
					<Input
						type="Name"
						onChange={setName}
						required
					/>
					<Input
						type="Email"
						onChange={setEmail}
						required
					/>
					<Input
						type="Password"
						onChange={setPassword}
						required
					/>
					<Input
						type="Confirm Password"
						onChange={setConfirmPassword}
						required
					/>
					{errorMessage && (
						<span className="text-red-600 font-bold m-3 leading-7">
							{errorMessage}
						</span>
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
					<p className="text-center text-sm text-indigo-700/90 dark:text-indigo-300/90 hover:text-pink-700/90 dark:hover:text-pink-300/90 transition duration-300">
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
