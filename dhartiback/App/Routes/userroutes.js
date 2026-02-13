const express = require('express');
const router = express.Router();   
const authToken = require('../middleware/authMiddleware'); 
const { getUserProfile, updateUserProfile, getEcopoints, getLeaderboard,  } = require('../Controller/userController');
const uploadImage = require('../middleware/uploadWrapper');
const { addRequest, getMyPickups } = require('../Controller/dhartiCollector');

router.use(authToken);
router.get('/profile', getUserProfile);
router.put('/profile', updateUserProfile);
router.get('/ecopoints',  getEcopoints);    
router.get('/leaderboard', getLeaderboard);  
router.post('/request', uploadImage, addRequest);
router.get('/mypickups', getMyPickups);

module.exports = router;
