const express = require('express');
const router = express.Router();
const authToken = require('../../middleware/authMiddleware'); 
const { getUserProfile, updateUserProfile, getEcopoints, getLeaderboard,  } = require('../../Controller/web/userController');
const { loginUser } = require('../../Controller/web/authController');

router.get('/profile', authToken, getUserProfile);
router.put('/profile', authToken, updateUserProfile);
router.post('/login', loginUser);
router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
});
// points
router.get('/ecopoints', authToken, getEcopoints);
// Leaderboard endpoint
router.get('/leaderboard', getLeaderboard); 

module.exports = router;
