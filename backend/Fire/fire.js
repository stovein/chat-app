import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyBxLA5EoabUUpLTBGs5DPLaB03RrNmjgnQ",
    authDomain: "chat-app-6e361.firebaseapp.com",
    databaseURL: "https://chat-app-6e361.firebaseio.com",
    projectId: "chat-app-6e361",
    storageBucket: "chat-app-6e361.appspot.com",
    messagingSenderId: "382670813204",
    appId: "1:382670813204:web:000ec2708506334fc54f01"
};

firebase.initializeApp(config);

const messaging = firebase.messaging();

messaging.usePublicVapidKey("BFJWvVoXq7HCOgLAiw1JC-_qrigjyChVff4wGuvEMHg0q6Ah3xc7gbHA2bzao1sYHdGCOVDJMuU--qDTziFbhFU");

// Get Instance ID token. Initially this makes a network call, once retrieved
// subsequent calls to getToken will return from cache.
messaging.getToken().then((currentToken) => {
    if (currentToken) {
      sendTokenToServer(currentToken);
      updateUIForPushEnabled(currentToken);
    } else {
      // Show permission request.
      console.log('No Instance ID token available. Request permission to generate one.');
      // Show permission UI.
      updateUIForPushPermissionRequired();
      setTokenSentToServer(false);
    }
  }).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
    showToken('Error retrieving Instance ID token. ', err);
    setTokenSentToServer(false);
  });