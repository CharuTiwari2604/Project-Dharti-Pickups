const User = require("../../Models/user");

const getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await User.aggregate([
      {
        $lookup: {
          from: "pickups", 
          localField: "pickups",
          foreignField: "_id",
          as: "pickupDetails",
        },
      },
      {
        $addFields: {
          ecoPoints: {
            $sum: {
              $map: {
                input: "$pickupDetails",
                as: "pickup",
                in: { $multiply: ["$$pickup.weight", 10] },
              },
            },
          },
        },
      },
      {
        $match: {
          ecoPoints: { $gte: 4000 },
        },
      },
      {
        $project: {
          name: 1,
          location: 1,
          ecoPoints: 1,
        },
      },
      {
        $sort: { ecoPoints: -1 },
      },
    ]);

    res.status(200).json(leaderboard);
  } catch (err) {
    console.error("Leaderboard Error:", err);
    res.status(500).json({ message: "Failed to get leaderboard" });
  }
};

module.exports = { getLeaderboard };
