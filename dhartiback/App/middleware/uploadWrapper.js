const multer = require('multer');
const upload = require('../config/multercloudinary');

module.exports = (req, res, next) => {
  upload.single('image')(req, res, err => {
    if (err instanceof multer.MulterError) {
      console.error('Multer/Cloudinary error:', err);
      return res.status(400).json({ message: err.message });
    }
    if (err) {
      console.error('Unknown upload error:', err);
      return res.status(500).json({ message: 'Failed to upload image' });
    }
    next(); 
  });
};
