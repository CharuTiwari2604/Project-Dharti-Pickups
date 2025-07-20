const express = require('express');
const { getLeaderboard } = require('../../Controller/web/newleaderboardController');
const router = express.Router();

router.get('/leaderboard', getLeaderboard);

module.exports = router;
