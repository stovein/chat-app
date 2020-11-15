importScripts("https://www.gstatic.com/firebasejs/8.0.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.0.1/firebase-messaging.js");
import firebaseConfig from "./fcmConfig.json";

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler((payload) => {
	const title = "Hello World";
	const options = { body: payload.data.status };
	return self.registration.showNotification(title, options);
});
