const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EnquireSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  location: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['Plastic', 'Paper', 'Metal', 'Electronics'],
    required: true
  },
  weight: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  image: {
    type: String,
    required: false
  },
  points: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

const Pickup = mongoose.model('Request', EnquireSchema);
module.exports = Pickup;
