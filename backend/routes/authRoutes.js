const express = require('express');
const Admin = require('../models/Admin');
const bcrypt = require('bcrypt');
const router = express.Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email });
  if (!admin || !(await admin.validatePassword(password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  req.session.admin = { id: admin._id, email: admin.email };
  res.json({ message: 'Login successful' });
});

router.post('/logout', (req, res) => {
  req.session.destroy(() => res.clearCookie('connect.sid').json({ message: 'Logged out' }));
});

router.get('/me', (req, res) => {
  if (!req.session.admin) return res.status(401).json({ message: 'Not authenticated' });
  res.json({ admin: req.session.admin });
});

module.exports = router;
