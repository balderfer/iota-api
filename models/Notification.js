var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Notification = new mongoose.Schema({
  message: String,
  sender: Schema.Types.ObjectId,
  recipient: Schema.Types.ObjectId,
  date: Date
});

module.exports = mongoose.model('Notification', Notification);
