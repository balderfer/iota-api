var apn = require('apn');

var apnConnection = new apn.Connection({});

var myDevice = new apn.Device('cf5352613feec8bee1dfd2ffd3a993804fe4879013ab3779b89394dcd124909e');

var note = new apn.Notification();

note.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
note.badge = 3;
note.sound = "ping.aiff";
note.alert = "\uD83D\uDCE7 \u2709 You have a new message";
note.payload = {'messageFrom': 'Caroline'};

apnConnection.pushNotification(note, myDevice);
