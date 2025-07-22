const mongoose = require('mongoose');

const visitorSchema = new mongoose.Schema({
  ip: String,
  userAgent: String,
  path: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('VisitorLog', visitorSchema);
