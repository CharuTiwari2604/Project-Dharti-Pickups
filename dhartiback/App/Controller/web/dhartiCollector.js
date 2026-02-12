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
      points: weight * 10,
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
      .sort({ createdAt: -1 }); 
    console.log(' Found pickups:', pickups.length, pickups);
    return res.status(200).json({ pickups });
  } catch (error) {
    console.error('Error fetching pickups:', error);
    return res.status(500).json({ error: 'Failed to fetch pickup data' });
  }
};

module.exports = { addRequest, getMyPickups };
