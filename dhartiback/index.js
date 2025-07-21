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

app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', authRouter);
app.use('/api/leaderboard', leadRouter);
app.use('/api/user', userRoutes);
app.use('/api/requestpickup', requestPickupRoutes);

// leadboard
app.use('/api', require('./App/Routes/web/newPickuproutes'));
app.use('/api', require('./App/Routes/web/leaderboardroutes'));



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



//revised
// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const mongoose = require('mongoose');
// const cookieParser = require('cookie-parser');

// // Routes
// const userRoutes = require('./App/Routes/web/userroutes');
// const requestPickupRoutes = require('./App/Routes/web/requestpickuproutes');
// const leaderboardRoutes = require('./App/Routes/web/leaderboardroutes');
// const authRouter = require('./App/Routes/web/authroutes');

// const app = express();

// // Middleware
// app.use(cookieParser());
// app.use(cors({
//   origin: 'http://localhost:5173',
//   credentials: true
// }));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Routes
// app.use('/api/auth', authRouter);
// app.use('/api/user', userRoutes);
// app.use('/api/request', requestPickupRoutes);
// app.use('/api/leaderboard', leaderboardRoutes);

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error('Error:', err);
//   if (err.name === 'MulterError') {
//     return res.status(400).json({ message: err.message });
//   }
//   res.status(500).json({ message: 'Internal server error' });
// });

// // DB Connection
// mongoose.connect(process.env.DBURL)
//   .then(() => {
//     console.log('Connected to MongoDB');
//     const port = process.env.PORT || 7000;
//     app.listen(port, () => console.log(`Server running on port ${port}`));
//   })
//   .catch(err => console.error('MongoDB connection error:', err));
