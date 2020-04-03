## A Distributed FCM Service for Rintis Project

### What this service can do :
 - Sending push notification with or without the additional data.
 - Sending data to the device without showing notification
 - Sending to device token(registrationId), topic or condition

### Dependency :
To send FCM trough this service from your feathers project you need `bull` you can install it using this command :

```bash
$ yarn add bull
```
or 
```bash
$ npm install bull --save
```

### Usage In Your FeathersJS Project:
```javascript
// Default config for Rintis development purpose
const config = {
  "port":  6379,
  "host":  "159.89.205.235",
  "password":  "sapiGoreng"
},
// Bull 
const Queue = require('bull'); 
const fcmQue = new Queue('FCM', { redis: config }); 
```

**Sending to single device :**
```javascript
const payload = {  
  "notification":{  
    "title":"Rizal Az",  
    "body":"Ini isinya"  
  },  
  "data":{  
    "key1":"value1",  
    "key2":"value2"  
  },  
  "token":"your device token"  
}
var job = fcmQue.add('primaPayChat', payload)
```

**Sending to multiple device :**
```javascript
const payload = {  
  "notification":{  
    "title":"Rizal Az",  
    "body":"Ini isinya"  
  },  
  "data":{  
    "key1":"value1",  
    "key2":"value2"  
  },  
  "token": [
    "your device token 1",
    "your device token 2",
    "your device token 3",
    ...
    "your device token 1000"
  ]  
}
var job = fcmQue.add('primaPayChat', payload)
```
**Note** : maximum 1000 device token each call

**Sending to topic :**
```javascript
const payload = {  
  "notification":{  
    "title":"Rizal Az",  
    "body":"Ini isinya"  
  },  
  "data":{  
    "key1":"value1",  
    "key2":"value2"  
  },  
  "topic":"your-topic"  
}
var job = fcmQue.add('primaPayChat', payload)
```

**Sending to condition :**
```javascript
const payload = {  
  "notification":{  
    "title":"Rizal Az",  
    "body":"Ini isinya"  
  },  
  "data":{  
    "key1":"value1",  
    "key2":"value2"  
  },  
  "condition":"'stock-GOOG' in topics || 'industry-tech' in topics"  
}
var job = fcmQue.add('primaPayChat', payload)
```

**Message payload:**
```javascript
// Send notification and data
const payload = {  
  "notification":{  
    "title":"Rizal Az",  
    "body":"Ini isinya"  
  },  
  "data":{  
    "key1":"value1",  
    "key2":"value2"  
  },
  
// Only send notification
const payload = {  
  "notification":{  
    "title":"Rizal Az",  
    "body":"Ini isinya"  
  }
}

// Only send data
const payload = {  
  "data":{  
    "key1":"value1",  
    "key2":"value2"  
  }
}
```

