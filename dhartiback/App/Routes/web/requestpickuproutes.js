// const express = require('express');
// const authToken = require('../../middleware/authMiddleware');
// const upload = require('../../config/multercloudinary');
// const { addRequest, getMyPickups } = require('../../Controller/web/dhartiCollector');

// const router = express.Router();

// router.post('/request',
//   authToken,
//   upload.single('image'),
//   addRequest
// );

// router.get('/mypickups',
//   authToken,
//   getMyPickups
// );

// module.exports = router;


const express = require('express');
const authToken = require('../../middleware/authMiddleware');
const uploadImage = require('../../middleware/uploadWrapper');
const asyncHandler = require('../../middleware/asyncHandler');
const { addRequest, getMyPickups } = require('../../Controller/web/dhartiCollector');

const router = express.Router();

router.post(
  '/request',
  authToken,
  uploadImage,                  // wraps Cloudinary upload
  asyncHandler(addRequest)     // wraps controller
);

router.get(
  '/mypickups',
  authToken,
  asyncHandler(getMyPickups)
);

module.exports = router;

