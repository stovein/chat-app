var FCM = require("fcm-push");

var fcm = new FCM(process.env.SERVER_KEY);

module.exports = {
	sendNotification: function (
		data = {},
		device_token = "",
		user_id = "",
		type = ""
	) {
		var message = {
			to: device_token,
			data,
			notification: {
				title: "Chat-App",
				body: `${"Somebody"} has sent you a message`,
			},
		};

		fcm.send(message, function (err, response) {
			if (err) {
				console.log("Something has gone wrong!:", err);
			} else {
				console.log("Successfully sent with response: ", response);
			}
			return;
		});
		return;
	},
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
