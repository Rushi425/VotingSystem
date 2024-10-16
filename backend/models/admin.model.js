// models/Admin.js
const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  voterId: {
    type: String,
    required: true,
    unique: true,
  },
  aadhaar: {
    type: String,
    required: true,
  },
  spid: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
