//corrected
// const mongoose = require("mongoose");

// const pickupSchema = new mongoose.Schema({
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     required: true,
//   },
//   weight: {
//     type: Number,
//     required: true,
//   },
//   type: {
//     type: String,
//     required: true,
//   },
//   location: {
//     type: String,
//     required: true,
//   },
//   pickupDate: {
//     type: Date,
//     default: Date.now,
//   },
//   points: {
//     type: Number
//   }
// });
// pickupSchema.pre("save", function (next) {
//   if (!this.points && this.weight) {
//     this.points = Math.floor(this.weight * 10); // or any other logic
//   }
//   next();
// });

// const Pickup = mongoose.model("Pickup", pickupSchema);
// module.exports = Pickup;


//getprofile.js
// const mongoose = require('mongoose');
// const pickupSchema = new mongoose.Schema({
//   user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   location: { type: String, required: true },
//   type: { type: String, required: true },
//   weight: { type: Number, required: true },
//   date: { type: Date, default: Date.now },
//   image: { type: String }, // from Cloudinary or local
//   points: { type: Number }
// });

// module.exports = mongoose.model("PickupRequest", pickupSchema);



// revised
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PickupSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  location: { type: String, required: true },
  type: {
    type: String,
    enum: ['Plastic', 'Paper', 'Metal', 'Electronics'],
    required: true,
  },
  weight: { type: Number, required: true },
  date: { type: Date, required: true },
  image: { type: String, required: false },
  points: { type: Number, default: 0 },
}, {
  timestamps: true,
});

const Pickup = mongoose.model('Pickup', PickupSchema);
module.exports = Pickup;
