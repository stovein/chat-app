import firebase from "firebase";
const firebaseConfig = {
	apiKey: "AIzaSyBxLA5EoabUUpLTBGs5DPLaB03RrNmjgnQ",
	authDomain: "chat-app-6e361.firebaseapp.com",
	databaseURL: "https://chat-app-6e361.firebaseio.com",
	projectId: "chat-app-6e361",
	storageBucket: "chat-app-6e361.appspot.com",
	messagingSenderId: "382670813204",
	appId: "1:382670813204:web:000ec2708506334fc54f01",
};

const fb = firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();
const notification = false;

export default {
	requestNotificationPermission: function () {
		const messaging = firebase.messaging();
		messaging
			.requestPermission()
			.then(() => {
				console.log("Have Permission");
				this.notification = true;
			})
			.catch(() => {
				console.log("Error Occured");
				this.notification = false;
			});
	},

	getToken: (callback) => {
		messaging
			.getToken()
			.then(callback)
			.catch((e) => {
				console.log(e);
			});
	},

	onNotification: () => {
		messaging.onMessage((payload) => {
			console.log("onMessage: ", payload);
		});
	},
};
