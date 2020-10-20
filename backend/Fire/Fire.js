import firebase from 'firebase';

class Fire {
    constructor(){
        this.init();

        this.messageShowCount = 20;

        this.observeAuth();
    }

    init = () => {
        firebase.initializeApp({
            apiKey: "AIzaSyBxLA5EoabUUpLTBGs5DPLaB03RrNmjgnQ",
            authDomain: "chat-app-6e361.firebaseapp.com",
            databaseURL: "https://chat-app-6e361.firebaseio.com",
            projectId: "chat-app-6e361",
            storageBucket: "chat-app-6e361.appspot.com",
            messagingSenderId: "382670813204",
            //appId: "1:382670813204:web:000ec2708506334fc54f01"
        });
    }

    // AUTH START
    observeAuth = () => {
        firebase.auth().onAuthStateChanged(this.onAuthStateChanged);
    }

    onAuthStateChanged = user => {
        if (!user) {
            try {
                firebase.auth().signInAnonymously();
            } catch ( {message} ) {
                console.log(message);
            }
        }
    }
    // AUTH END

    // GET MESSAGE START
    get ref() {
        return firebase.database().ref('messages');
    }

    on = callback => {
        this.ref
            .limitToLast(this.messageShowCount)
            .on('child_added', snapshot => callback(this.parse(snapshot)))
    }

    parse = snapshot => {
        const { timestamp, text, user } = snapshot.val();
        const { key: _id } = snapshot;

        const timestamp = new Date(timestamp);

        const message = {
            _id,
            timestamp,
            text,
            user,
        };
        return message;
    }

    off() {
        this.ref.off();
    }
    // GET MESSAGE END

    // SEND MESSAGE START
    get uid() {
        return (firebase.auth().currentUser || {}).uid;
    }

    get timestamp() {
        return firebase.database.ServerValue.TIMESTAMP;
    }
    
    send = messages => {
        for (let i = 0; i < messages.length; i++) {
        const { text, user } = messages[i];
        const message = {
            text,
            user,
            timestamp: this.timestamp,
        };
        this.append(message);
        }
    };

    append = message => this.ref.push(message);
    // SEND MESSAGE END
}

Fire.shared = new Fire();
export default Fire;