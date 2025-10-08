require('dotenv').config();    //loads hidden secrets from .env
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');   //connects to mongodb
const cookieParser = require('cookie-parser');   //read/write cookies

const authRouter = require('./App/Routes/web/authroutes');
const leadRouter = require('./App/Routes/web/leaderboardroutes');
const userRoutes = require('./App/Routes/web/userroutes');
const requestPickupRoutes = require('./App/Routes/web/requestpickuproutes');

const app = express();
app.set('trust proxy', 1); // For proper cookie handling behind proxies

const allowedOrigins = [
  'https://project-dharti-pickups-mpu6.vercel.app',
  'https://project-dharti-pickups.onrender.com', 
  'http://localhost:5173',
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS block:" +origin));
    }
  },
  credentials: true,     //allows cookies/JWT to be sent along with requests.
}));

app.use(cookieParser());    //added this middleware

//parsing
app.use(express.json());   //lets server read JSON data sent by frontend
app.use(express.urlencoded({ extended: true }));  //lets server read form data (name=value&age=20)

//routes
app.use('/api', authRouter);
app.use('/api/user', userRoutes);
app.use('/api/requestpickup', requestPickupRoutes);

// leadboard
app.use('/api', require('./App/Routes/web/newPickuproutes'));
app.use('/api', require('./App/Routes/web/leaderboardroutes'));


//error handler
app.use((err, req, res, next) => {
  console.error('Global error:', err);
  if (res.headersSent) return next(err);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});


// mongoose.connect(process.env.DBURL)
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

  .then(() => {
    console.log('Connected to MongoDB');
    const port = process.env.PORT || 7000;
    app.listen(port, () => console.log(`Server running on port ${port}`));
  })
  .catch(err => console.error('MongoDB connection error:', err));

