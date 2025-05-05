const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const repaymentRoutes = require('./routes/repaymentRoutes');
const cors = require('cors');
const helmet = require('helmet'); 
const morgan = require('morgan');
const mongoSanitize = require('express-mongo-sanitize'); 
const { xss } = require('express-xss-sanitizer');
const hpp = require('hpp'); 
const rateLimit = require('express-rate-limit');
const app = express();

dotenv.config('./.env');
app.use(morgan('dev')); 

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(xss()); 
app.use(hpp()); 

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, 
  max: 100, 
  message: 'Too many requests from this IP, please try again later.',
});
app.use(limiter);

app.use('/api/repayments', repaymentRoutes);


mongoose.connect(process.env.MONGO_DB_PATH)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.use(mongoSanitize());
app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});
