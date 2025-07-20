// const multer = require('multer');
// const { CloudinaryStorage } = require('multer-storage-cloudinary');
// const { cloudinary } = require('./cloudinary');

// const { CloudinaryStorage } = require("multer-storage-cloudinary");

// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: {
//     folder: 'waste_uploads',         // optional Cloudinary folder name
//     allowed_formats: ['jpg', 'png', 'jpeg'],
//     transformation: [{ width: 800, height: 800, crop: 'limit' }]
//   }
// });

// const upload = multer({ storage });

// module.exports = upload;



//new
// const multer = require('multer');
// const { CloudinaryStorage } = require('multer-storage-cloudinary');
// const cloudinary = require('../config/cloudinary');

// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: 'waste_images', // ✅ Change to your desired folder in Cloudinary
//     allowed_formats: ['jpg', 'png', 'jpeg'],
//     // public_id: (req, file) => `${Date.now()}-${file.originalname}`
//   }
// });

// // module.exports = { cloudinaryStorage };
// const upload = multer({ storage });
// // const upload = multer({
// //   limits: { fileSize: 2 * 1024 * 1024 } // 2MB max       
// // });

// module.exports = upload;



//new333
// const multer = require('multer');
// const { CloudinaryStorage } = require('multer-storage-cloudinary');
// const cloudinary = require('../config/cloudinary');

// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary.v2,
//   params: {
//     folder: 'waste_images',
//     allowed_formats: ['jpg', 'png', 'jpeg']
//   },
// });
// const upload = multer({ storage });



//new
// const multer=require('multer')
// const { CloudinaryStorage } = require('multer-storage-cloudinary');
// const cloudinary = require('./cloudinary'); // <-- must import the correctly-configured object

// const storage = new CloudinaryStorage({
//    cloudinary, // <-- this must be valid
//   params: {
//     folder: 'waste_images',
//     allowed_formats: ['jpg', 'png', 'jpeg']
//   }
// });

// const upload = multer({ storage });
// module.exports = upload;




//new
// config/multercloudinary.js
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinary'); // ensure correct import of cloudinary.v2 instance

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'waste_images',
    allowed_formats: ['jpg', 'jpeg', 'png']
  }
});

const upload = multer({ storage });
module.exports = upload;
