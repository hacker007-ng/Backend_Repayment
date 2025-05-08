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
const app = express();

dotenv.config('./.env');
app.use(morgan('dev')); 

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(xss()); 
app.use(hpp()); 


app.use('/api/repayments', repaymentRoutes);

app.use(mongoSanitize());
mongoose.connect(process.env.MONGO_DB_PATH)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});
