const Pickup = require('../Models/pickupmodel');

const getUserPickups = async (req, res) => {
  try {
    const userId = req.user.id;
    const pickups = await Pickup.find({ user: userId });
    res.status(200).json(pickups);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching pickups' });
  }
};

module.exports = { getUserPickups };
