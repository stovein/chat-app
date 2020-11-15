import React, { useState, useEffect } from "react";
import SelectUsernameScreen from "./Components/SelectUsernameScreen";
import SelectRoom from "./Components/SelectRoom";
import "./App.css";
import FCMController from "./FCM/FCMController";

export default function App() {
	const [name, setName] = useState("");
	const [isNameScreen, setIsNameScreen] = useState(true);

	useEffect(() => {
		FCMController.requestNotificationPermission();
		FCMController.getToken((token) => {
			console.log(token);
		});
		FCMController.onNotification();
	}, []);

	return (
		<div className="App">
			<h1 style={{ textAlign: "center" }}>Chat App</h1>
			{isNameScreen ? (
				<SelectUsernameScreen
					name={name}
					setName={setName}
					setIsNameScreen={setIsNameScreen}
				/>
			) : (
				<SelectRoom name={name} />
			)}
		</div>
	);
}
