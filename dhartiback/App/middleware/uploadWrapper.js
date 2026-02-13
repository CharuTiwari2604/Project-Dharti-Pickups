const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_KEY
})

const storage= new CloudinaryStorage({
  cloudinary, 
  params:{
    folder:'waste_images',
    allowed_formats: ['jpg', 'jpeg', 'png']
  }
});

const upload=multer({storage})

module.exports=(req, res, next)=>{
  upload.single('image')(req, res, err=>{
    if(err){
      const status=err instanceof multer.MulterError ? 400 : 500;
      console.error('Upload Error: ', err.message)
      return res.status(status).json({
        success: false,
        message: err.message || 'Image upload failed'
      })
    }
    next()
  })
}