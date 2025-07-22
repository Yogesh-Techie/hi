const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const useragent = require('express-useragent');
const rateLimit = require('express-rate-limit');
const path = require('path');

// Routes & Middleware
const authRoutes = require('./routes/authRoutes');
const contactRoutes = require('./routes/contactRoutes');
const blogRoutes = require('./routes/blogRoutes');
const visitorLogger = require('./middlewares/visitorLogger');

dotenv.config();
const app = express();

// ✅ Safety check for required env variables
['MONGO_URI', 'SESSION_SECRET', 'EMAIL_USER', 'EMAIL_PASS', 'EMAIL_TO'].forEach((key) => {
  if (!process.env[key]) {
    console.warn(`⚠️ Missing ENV: ${key}`);
  }
});

// ✅ Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(useragent.express());

// ✅ Rate limiting (applied only to public POST /api/contact)
const contactLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 5,
  message: { message: 'Too many messages sent. Try again later.' }
});

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { message: 'Too many login attempts. Try again later.' }
});

// ✅ Session config
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 1000 * 60 * 60 * 24 // 1 day
  }
}));

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => {
    console.error('❌ MongoDB connection failed:', err);
    process.exit(1);
  });

// ✅ Custom visitor logger
app.use(visitorLogger);

// ✅ Conditionally apply contact rate limiter (only on POSTs)
app.use('/api/contact', (req, res, next) => {
  if (req.method === 'POST' && req.path === '/') {
    contactLimiter(req, res, next);
  } else {
    next();
  }
}, contactRoutes);

// ✅ Routes
app.use('/api/auth/login', loginLimiter); // Optional
app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);

// ✅ Health check
app.get('/', (req, res) => {
  res.send('Portfolio API Running 🚀');
});

// ✅ Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
