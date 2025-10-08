const express = require('express');
const router = express.Router();    //mini express app for routes
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

router.get('/ecopoints', authToken, getEcopoints);    // points
router.get('/leaderboard', getLeaderboard);    // Leaderboard endpoint

module.exports = router;
