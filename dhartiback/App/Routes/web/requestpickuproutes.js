const express = require('express');
const authToken = require('../../middleware/authMiddleware');
const uploadImage = require('../../middleware/uploadWrapper');
const asyncHandler = require('../../middleware/asyncHandler');
const { addRequest, getMyPickups } = require('../../Controller/web/dhartiCollector');

const router = express.Router();

router.post(
  '/request',
  authToken,
  uploadImage,                  
  asyncHandler(addRequest)    
);

router.get(
  '/mypickups',
  authToken,
  asyncHandler(getMyPickups)
);

module.exports = router;

