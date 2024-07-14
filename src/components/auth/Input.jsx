import React, { useEffect, useState } from "react";

const Input = ({ type, onChange, required }) => {
	const [fieldType, setFieldType] = useState("email");
	const [value, setValue] = useState("");
	const labelStyle = `absolute left-0 top-1 cursor-text peer-focus:text-xs peer-focus:text-pink-600/70 dark:peer-focus:text-pink-300/70 peer-focus:-top-4 
		transition-all duration-300 ${value!="" && " -top-[15px] text-xs text-indigo-500"}`
	useEffect(() => {
		if (
			type === "Password" ||
			type === "password" ||
			type === "Confirm Password"
		) {
			setFieldType("password");
		}
		if (type === "Name") {
			setFieldType("text");
		}
		if (type === "Email") {
			setFieldType("email");
		}
	}, []);
	return (
		<div className="relative w-full my-3 py-1">
			<input
				id={type}
				type={fieldType}
				className="border-b border-indigo-800 dark:border-indigo-300 bg-transparent py-1 w-full focus:outline-none focus:border-pink-600/70 dark:focus:border-pink-300/70  focus:border-b-2 transition-colors peer duration-300"
				onChange={(e) => {
					onChange(e.target.value);
					setValue(e.target.value);
				}}
				required={required}
			/>
			<label
				htmlFor={type}
				className={labelStyle}>
				{type}
			</label>
		</div>
	);
};

export default Input;
