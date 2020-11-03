var FCM = require('fcm-push');

var fcm = new FCM(process.env.SERVER_KEY);

module.exports = {
    sendNotification: function(user_id = '', device_token = '', type = '', msg_body = '') {
        var message = {
            to: device_token,
            data: {
                user_id: user_id,
                title: 'My App', // you can replace your app name here
                body: msg_body,
                type :type, // type is for internal purpose, to identify the type of notification within app
            },
        };
        
        fcm.send(message, function(err, response){
            if (err) {
                console.log("Something has gone wrong!:", err);
            } 
            else {
                console.log("Successfully sent with response: ", response);
            }
            return;
        });
        return;
    }
};




/*const fcm = require('fcm-notification');
const FCM = new fcm('key.json');
const TOKEN = '';



const Notification = {
    createMessage: (data) => {
        return {
            notification:{
                title: data.sender,
                body: data.message
            },
            android: {
                ttl: 3600 * 1000,
                notification: {
                    icon: '',
                    color: '#f45342',
                },
            },
            apns: {
                payload: {
                    aps: {
                        badge: 42,
                    },
                },
            },
            token: data.token
        }
    },

    sendNotification: (data, callback) => {
        msg = Notification.createMessage(data);
        FCM.send(msg, callback);
    }
}

module.exports = Notification;*/