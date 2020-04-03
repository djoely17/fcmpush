// Load config file
const config = require('./config.json')

// Bull
const Queue = require('bull');
const fcmQue = new Queue('FCM', {
  redis: config.redis
});


// Firebase Admin Plugin
// const firebase = require("firebase-admin")
var serviceAccount = require('./fcm.config.json');

const tunnel = require('tunnel2')
const proxyAgent = tunnel.httpsOverHttp({
  proxy: config.proxy
});

// firebase.initializeApp({
//   credential: firebase.credential.cert(serviceAccount, proxyAgent),
//   databaseURL: 'https://primapay-2314a.firebaseio.com',
//   httpAgent: proxyAgent
// });


// Cluster
const cluster = require('cluster')

if(cluster.isMaster){
  for (var i = 0; i < config.worker; i++) {
    cluster.fork();
  }
  
  cluster.on('exit', function(worker, code, signal) {
    console.info('worker ' + worker.process.pid + ' died');
  });
}else{
  console.info('forking worker ' + process.pid);
  // Processing FCM Queue
  // Prima Pay Chat Notification
  fcmQue.process('*', 100, (job, done) => {
    console.info("Received FCM job ", job.name, " with id ", job.id, " and payload ", JSON.stringify(job.data))
    let payload = {
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

    if(job.data.notification) payload.notification = job.data.notification
    if(job.data.data) payload.data = job.data.data
    if(job.data.to) payload.token = job.data.to
    if(job.data.topic) payload.topic = job.data.topic
    if(job.data.condition) payload.condition = job.data.condition
    // payload.data["content-available"] = "1"
    // if(payload.notification) {
    //   payload.data.title = payload.notification.title ? payload.notification.title : " "
    //   payload.data.body = payload.notification.body ? payload.notification.body : " "
    //   payload.data.message = payload.notification.body ? payload.notification.body : " "
    // }
    if(job.data.collapseKey) payload.android.collapseKey = job.data.collapseKey

    console.info("Sending FCM with payload", JSON.stringify(payload))
    job.progress(50)

   return  firebase.messaging().send(payload)
    .then((response) => {
      // Response is a message ID string.
      console.info('Successfully send message for job id ', job.id, " with response ", response)
      job.progress(100)
      done(null, response)
      // return Promise.resolve(response)
    })
    .catch((error) => {
      job.progress(100)
      console.info('Error sending message for job id ', job.id, " with response ", JSON.stringify(error))
      done(error)
      // return Promise.reject(error)
    });
    // console.log("Job done by worker", cluster.worker.id, job.id, new Date());
    // return Promise.resolve(job.data);
  })
}
