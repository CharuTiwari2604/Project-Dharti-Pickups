const User = require("../Models/user"); 
const Pickup = require("../Models/pickupmodel");

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    const pickups = await Pickup.find({ user: req.user.id }).sort({ createdAt: -1 });

    res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      location: user.location || "",
      phone: user.phone || "",
      bio: user.bio || "",
      ecoPoints: user.ecoPoints || 0,
      pickups
    });
  } catch (err) {
    console.error("Get profile error:", err);
    res.status(500).json({ message: "Error fetching profile" });
  }
};

exports.updateUserProfile = async (req, res) => {
  try {
    const { location, phone, bio } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (location !== undefined) user.location = location;
    if (phone !== undefined) user.phone = phone;
    if (bio !== undefined) user.bio = bio;

    await user.save();

    res.status(200).json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getEcopoints = async (req, res) => {
  try {
    const user= await User.findById(req.user.id).select("ecoPoints");
    res.status(200).json({ ecoPoints: user?.ecoPoints || 0 });
  } catch (error) {
    res.status(500).json({ message: "Error fetching Ecopoints" });
  }
};

exports.getLeaderboard = async (req, res) => {
  try {
    const users = await User.find({ecoPoints: { $gte: 4000 } }).select("name location ecoPoints").sort({ ecoPoints: -1 });

     const leaderboard=users.map(u=>{
      let level="Begineer"
      if(u.ecoPoints >= 10000) level="Elite Recycler";
      else if(u.ecoPoints >= 7000) level="Eco-Warrior";
      else if(u.ecoPoints>=4000) level="Green Guardian"

      return{
        name: u.name, email: u.email, totalPoints: u.ecoPoints, level
      }
     })
    res.status(200).json({ leaderboard});
  } catch (error) {
    console.error("Error generating leaderboard:", error);
    res.status(500).json({ message: "Server error while generating leaderboard" });
  }
};
