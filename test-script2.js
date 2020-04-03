const firebase = require('firebase-admin')
var serviceAccount = require('./fcm.config.json')

// const tunnel = require('tunnel2')
// const proxyAgent = tunnel.httpsOverHttp({
//   proxy: {
//     host: '10.126.67.101',
//     port: '8080'
//   }
// });

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: 'https://primapay-2314a.firebaseio.com'
  // httpAgent: proxyAgent
})

let payload = {
  token: 'fZ69ge1qelE:APA91bGOboP4LRkkz9qUrODwv03WOkgdOq7a-sSXazDQ2QNuSywVl7HVFo66QlKvruqhLJaMHIsqa0dOPeKIG84keMcIdsjxH6JS-PA-z-loAPjmGEIv_3HyXQ8oebFneaAYzD2C44qV',
  android: {
    priority: 'high',
    notification: {
      clickAction: "FCM_PLUGIN_ACTIVITY"
    }
  },
  apns: {
    headers: {
      'apns-priority': '10',
      'content-available': '1'
    },
    payload: {
      aps:{
        badge:1
      }
    }
  }
};

return firebase
  .messaging()
  .send(payload)
  .then(response => {
    // Response is a message ID string.
    console.info(
      'Sukses',
      response
    )
    process.exit()
    return Promise.resolve(response)
  })
  .catch(error => {
    console.info(
      'error',
      JSON.stringify(error)
    )
    process.exit()
    return Promise.reject(error)
  })
