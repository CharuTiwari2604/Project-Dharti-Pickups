const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: {type: String,required: true,},
  location: String,
  phone: String,
  bio: String,
ecoPoints: {
  type: Number,
  default: 0,
},
  pickups: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pickup' }],
}, {
  timestamps: true // Automatically adds createdAt and updatedAt
});

const User=mongoose.model('User', userSchema);
module.exports = User;