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
