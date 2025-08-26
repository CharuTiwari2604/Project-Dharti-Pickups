// const dhartiModel = require("../../Models/dharti.model");
// const addRequest = async (req, res) => {
//   try {
//     console.log('--- Incoming Request ---');
//     console.log('req.body =', req.body);
//     console.log('req.file =', req.file);

//     // Extract fields from form body
//     const { location, type, weight, date } = req.body;

//     // Basic validation
//     if (!location || !type || !weight || !date) {
//       return res.status(400).json({
//         status: 0,
//         message: 'Missing one or more required fields: location, type, weight, date',
//         received: req.body
//       });
//     }

//     //  Get file path if image was uploaded
//     const image = req.file ? req.file.path : null;

//     //  Create and save request
//     const newRequest = new dhartiModel({
//       location,
//       type,
//       weight,
//       date,
//       image
//     });

//     await newRequest.save();

//     return res.status(200).json({
//       status: 1,
//       message: "Request sent successfully",
//       requestId: newRequest._id
//     });
//   } catch (err) {
//     console.error(" Error in addRequest:", err);
//     return res.status(500).json({
//       status: 0,
//       message: "Internal server error while sending request",
//       error: err.message
//     });
//   }
// };

// module.exports = { addRequest };


//above for multer





//below for cloudinary

// const PickupRequest = require('../../Models/getprofile');
const Pickup = require('../../Models/pickupmodel');
const User = require('../../Models/user');

const addRequest = async (req, res) => {
  try {
    const userId = req.user.id;
    const { location, type, weight, date } = req.body;
    const imageUrl = req.file?.path || req.body.imageUrl || "";

    const pickup = await Pickup.create({
      user: userId,
      location,
      type,
      weight,
      date,
      image: imageUrl,
      points: weight * 10, // this is optional but useful
    });

    const pointsEarned = weight * 10;

    await User.findByIdAndUpdate(
      userId,
      {
        $push: { pickups: pickup._id },
        $inc: { ecoPoints: pointsEarned },
      },
      { new: true }
    );

    res.status(201).json({ message: "Pickup request added successfully", pickup });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};


const getMyPickups = async (req, res) => {
  try {
    const pickups = await PickupRequest
      .find({ user: req.user.id })
      .sort({ createdAt: -1 }); // use createdAt instead of custom date :contentReference[oaicite:1]{index=1}
    console.log('📦 Found pickups:', pickups.length, pickups);
    return res.status(200).json({ pickups });
  } catch (error) {
    console.error('Error fetching pickups:', error);
    return res.status(500).json({ error: 'Failed to fetch pickup data' });
  }
};

module.exports = { addRequest, getMyPickups };
