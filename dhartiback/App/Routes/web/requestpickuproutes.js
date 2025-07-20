// const express = require('express');
// const router = express.Router();
// const authToken = require('../../middleware/authMiddleware');
// const { getMyPickups, addPickup } = require('../../Controller/web/requestPickupController');

// router.get('/mypickups', authToken, getMyPickups);
// router.post('/add', authToken, addPickup);

// module.exports = router;


//new
// const express = require('express');
// const authToken = require('../../middleware/authMiddleware');
// const upload = require('../../config/multercloudinary');
// const { addRequest } = require('../../Controller/web/dhartiCollector');
// const { getMyPickups } = require('../../App/Controller/web/requestPickupController');
// const router = express.Router();

// router.get('/mypickups', authToken, getMyPickups);
// router.post('/request', authToken, upload.single('image'), addRequest);

// module.exports = router;



//new2
// const express = require('express');
// const authToken = require('../../middleware/authMiddleware');
// const upload = require('../../config/multercloudinary');
// const { addRequest, addPickup, getMyPickups } = require('../../Controller/web/dhartiCollector');
// const router = express.Router();

// router.get('/mypickups', authToken, getMyPickups);
// router.post('/request', authToken, upload.single('image'), addRequest);
// router.post('/add', authToken, upload.single('image'), addPickup);

// module.exports = router;



//new3
// requestpickuproutes.js
// const express = require('express');
// const authToken = require('../../middleware/authMiddleware');
// const upload = require('../../config/multercloudinary');
// const { addRequest, addPickup, getMyPickups } = require('../../Controller/web/dhartiCollector');
// const router = express.Router();

// // GET user's previous pickups
// router.get('/mypickups', authToken, getMyPickups);

// // POST new pickup request
// router.post('/request',
//   authToken,
//   upload.single('image'),
//   async (req, res, next) => {
//     try {
//       console.log('req.body:', req.body);
//       console.log('req.file:', req.file);
//       const { location, type, weight, date } = req.body;
//       const imageUrl = req.file?.path; // Cloudinary URL
//       const created = await addRequest({ location, type, weight, date, imageUrl, userId: req.user.id });
//       res.json({ success: true, message: 'Pickup request created', data: created });
//     } catch (err) {
//       next(err);
//     }
//   }
// );

// // POST add pickup (admin or collector use)
// router.post('/add',
//   authToken,
//   upload.single('image'),
//   async (req, res, next) => {
//     try {
//       console.log('Request body:', req.body);
//       console.log('Uploaded file:', req.file);

//       const { location, type, weight, date } = req.body;
//       const imageUrl = req.file?.path || req.file?.secure_url;

//       const created = await addPickup({ location, type, weight, date, imageUrl, userId: req.user.id });
//       res.json({ success: true, message: 'Pickup added successfully', data: created });
//     } catch (err) {
//       next(err);
//     }
//   }
// );

// module.exports = router;



//new
// const express = require('express');
// const authToken = require('../../middleware/authMiddleware');
// const upload = require('../../config/multercloudinary');
// const { addRequest, addPickup, getMyPickups } = require('../../Controller/web/dhartiCollector');

// const router = express.Router();

// router.get('/mypickups', authToken, getMyPickups);

// router.post('/request',
//   authToken,
//   upload.single('image'),
//   async (req, res, next) => {
//     try {
//       // console.log('req.body:', req.body);
//       // console.log('req.file:', req.file);

//       const { location, type, weight, date } = req.body;
//       const imageUrl = req.file?.path || req.file?.secure_url;

//       const created = await addRequest({ location, type, weight, date, imageUrl, userId: req.user.id });
//       res.json({ success: true, message: 'Pickup request created', data: created });
//     } catch (err) {
//       next(err);
//     }
//   }
// );

// router.post('/add',
//   authToken,
//   upload.single('image'),
//   async (req, res, next) => {
//     try {
//       console.log('Request body:', req.body);
//       console.log('Uploaded file:', req.file);

//       const { location, type, weight, date } = req.body;
//       const imageUrl = req.file?.path || req.file?.secure_url;

//       const created = await addPickup({ location, type, weight, date, imageUrl, userId: req.user.id });
//       res.status(201).json({ success: true, message: 'Pickup added successfully', data: created });
//     } catch (err) {
//       next(err);
//     }
//   }
// );

// module.exports = router;






//working
const express = require('express');
const authToken = require('../../middleware/authMiddleware');
const upload = require('../../config/multercloudinary');
const { addRequest, getMyPickups } = require('../../Controller/web/dhartiCollector');

const router = express.Router();

router.post('/request',
  authToken,
  upload.single('image'),
  addRequest
);

router.get('/mypickups',
  authToken,
  getMyPickups
);

module.exports = router;


