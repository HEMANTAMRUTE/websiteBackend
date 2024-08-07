const mongoose = require('mongoose');

const loginSchema = new mongoose.Schema({
  browser: { type: String, required: true },
  os: { type: String, required: true },
  device: { type: String, required: true },
  ipAddress: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const Login = mongoose.model('Login', loginSchema);

module.exports = Login;
