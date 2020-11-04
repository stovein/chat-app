importScripts('https://www.gstatic.com/firebasejs/8.0.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.0.0/firebase-messaging.js');
firebase.initializeApp({
    messagingSenderId: 382670813204
});
const messaging = firebase.messaging();