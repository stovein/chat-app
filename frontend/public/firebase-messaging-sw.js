importScripts("https://www.gstatic.com/firebasejs/8.0.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.0.1/firebase-messaging.js");

const firebaseConfig = {
	apiKey: "AIzaSyBxLA5EoabUUpLTBGs5DPLaB03RrNmjgnQ",
	authDomain: "chat-app-6e361.firebaseapp.com",
	databaseURL: "https://chat-app-6e361.firebaseio.com",
	projectId: "chat-app-6e361",
	storageBucket: "chat-app-6e361.appspot.com",
	messagingSenderId: "382670813204",
	appId: "1:382670813204:web:000ec2708506334fc54f01",
};
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler((payload) => {
	const title = "Hello World";
	const options = { body: payload.data.status };
	return self.registration.showNotification(title, options);
});
