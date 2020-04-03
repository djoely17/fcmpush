const FCM = require('fcm-push')
const config = require('./config.json')

const HttpsProxyAgent = require('https-proxy-agent');

// const tunnel = require('tunnel2')
// const proxyAgent = tunnel.httpsOverHttp({
//   proxy: { // Proxy settings
//     host: '10.126.218.130', // Defaults to 'localhost'
//     port: '3128'
//   }
// });

const proxyurl = 'http://10.126.218.130:3128'
const agent = new HttpsProxyAgent(proxyurl);
console.log('Agent', agent)


// console.log('ProxyAgent', proxyAgent)
// var serviceAccount = require('./fcm.config.json');

var serverKey = 'AAAAZrOExco:APA91bFc40F4Qi1YqCgnjlmB1R5lI2hvQRmKqRmuGY2-UJZEY9hvPY16RCA3e7-XXWuBXj7YrkhPF9v4z95oJ6jw87aQZ5y7aVviTjVO99O9-l1qKDZroKqc1CaJUMOE6z2R83a78LzQ';
var fcm = new FCM(serverKey, agent);
var messageResult = {
                      "content": "Tes bro",
                      "conversationId": "5e574146dce0ad64cdf3326b",
                      "senderId": "5e572bf3068ffe3801cf9805",
                      "recipients": [
                        {
                          "status": "SENT",
                          "userId": "5e4ba3ae04d5db1837814ee4"
                        }
                      ],
                      "createdAt": "2020-03-11T10:10:41.198Z",
                      "updatedAt": "2020-03-11T10:10:41.198Z",
                      "__v": 0,
                      "_include": []
                    }
var conversation = { _id: '5e574146dce0ad64cdf3326b' }
var message = {
    to: 'e_EomdASUtw:APA91bGFk98Ymy9Y77wi4FPwUl3cNl0BTNrL0vsHJ_OBOd_VW-kAKquNy3qx-BajDZ-7FzmnN1QXpvst_NanrPlFNC_BrMQ7i9VsDOHL3vtRMDL1kv1uuGk4StxBoNrHdjmYjBtmrNWQ',
    "data": {
        title: "Galih",
        body: "Test Chat Notif",
        count: 4,
        messageData: JSON.stringify(messageResult),  
        conversationData: JSON.stringify(conversation),
        conversationId: '5e574146dce0ad64cdf3326b'
    }
};


fcm.send(message)
    .then(function (response) {
        console.log("Successfully sent with response: ", response);
    })
    .catch(function (err) {
        console.log("Something has gone wrong!");
        console.error(err);
    })