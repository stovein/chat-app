import firebase from "firebase";
import firebaseConfig from "../fcmConfig.json";

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

export default {
	requestNotificationPermission: function () {
		const messaging = firebase.messaging();
		messaging
			.requestPermission()
			.then(() => {
				console.log("Have Permission");
			})
			.catch(() => {
				console.log("Error Occured");
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
