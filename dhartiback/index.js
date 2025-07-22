require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const authRouter = require('./App/Routes/web/authroutes');
const leadRouter = require('./App/Routes/web/leaderboardroutes');
const userRoutes = require('./App/Routes/web/userroutes');
const requestPickupRoutes = require('./App/Routes/web/requestpickuproutes');

const app = express();
app.set('trust proxy', 1); // For proper cookie handling behind proxies

const allowedOrigins = [
  'https://project-dharti-pickups-mpu6.vercel.app',
  'http://localhost:5173', // Vite dev server (use your actual port if different)
];

app.use(cookieParser());
// app.use(cors({
//   origin: 'https://project-dharti-pickups-mpu6.vercel.app',
//   credentials: true
// }));
app.use(cors({
   origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`Origin ${origin} not allowed by CORS`));
    }
  },
  credentials: true,
}));
app.options('*', cors());

// Session setup
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',  // true in prod (HTTPS)
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    maxAge: 24 * 60 * 60 * 1000,
  },
}));


//parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use('/api', authRouter);
app.use('/api/leaderboard', leadRouter);
app.use('/api/user', userRoutes);
app.use('/api/requestpickup', requestPickupRoutes);

// leadboard
app.use('/api', require('./App/Routes/web/newPickuproutes'));
app.use('/api', require('./App/Routes/web/leaderboardroutes'));


//error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  if (err.name === 'MulterError') {
    return res.status(400).json({ message: err.message });
  }
  res.status(500).json({ message: 'Internal server error' });
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

