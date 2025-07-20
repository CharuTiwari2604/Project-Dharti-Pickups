const jwt = require("jsonwebtoken");
const User = require("../../Models/user"); 
const bcrypt = require("bcrypt");
// const PickupRequest = require("../../Models/getprofile");
const mongoose = require('mongoose');
const Pickup = require("../../Models/pickupmodel");

// ✅ LOGIN
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, name: user.name, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,            // ✅ true if HTTPS
      sameSite: "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ GET USER PROFILE
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    const pickups = await Pickup.find({ user: req.user.id }).sort({ createdAt: -1 });

    console.log('📦 User profile pickups:', pickups.length);

    res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      location: user.location || "",
      phone: user.phone || "",
      bio: user.bio || "",
      pickups
    });
  } catch (err) {
    console.error("Get profile error:", err);
    res.status(500).json({ message: "Error fetching profile" });
  }
};

// ✅ UPDATE ONLY location, phone, bio
exports.updateUserProfile = async (req, res) => {
  try {
    const { location, phone, bio } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Only update location, phone, bio
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

// points
exports.getEcopoints = async (req, res) => {
  try {
    const userId = req.user.id;

    const total = await Pickup.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(userId) } },
      { $group: { _id: null, totalPoints: { $sum: "$points" } } }
    ]);

    const ecopoints = total[0]?.totalPoints || 0;

    res.status(200).json({ ecopoints });
  } catch (error) {
    console.error("Failed to calculate ecopoints:", error);
    res.status(500).json({ message: "Server error while calculating Ecopoints" });
  }
};

//leaderboard
exports.getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await Pickup.aggregate([
      {
        $group: {
          _id: "$user",
          totalPoints: { $sum: "$points" },
        },
      },
      {
        $match: {
          totalPoints: { $gte: 4000 },
        },
      },
      {
        $sort: {
          totalPoints: -1,
        },
      },
      {
           $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      {
        $unwind: "$userDetails",
      },
      {
        $project: {
          name: "$userDetails.name",
          email: "$userDetails.email",
          totalPoints: 1,
          level: {
            $switch: {
              branches: [
                { case: { $gte: ["$totalPoints", 10000] }, then: "Elite Recycler" },
                { case: { $gte: ["$totalPoints", 7000] }, then: "Eco Warrior" },
                { case: { $gte: ["$totalPoints", 4000] }, then: "Green Guardian" },
              ],
               default: "Beginner",
            },
          },
        },
      },
    ]);

    res.status(200).json({ leaderboard });
  } catch (error) {
    console.error("Error generating leaderboard:", error);
    res.status(500).json({ message: "Server error while generating leaderboard" });
  }
};