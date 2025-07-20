const express = require('express');
const authToken = require('../../middleware/authMiddleware');
const { getUserPickups } = require('../../Controller/newPickupController');
const router = express.Router();

router.get('/user/pickups', authToken, getUserPickups);

module.exports = router;
