const express = require('express');
const Message = require('../models/Message');
const VisitorLog = require('../models/VisitorLog');
const sendMail = require('../utils/sendMail'); // ⬅️ import mail utility
const router = express.Router();

// 📩 POST /api/contact - Public message + email
router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    // ✅ Save message to DB
    await Message.create({ name, email, message });

    // ✅ Send mail using Nodemailer
    await sendMail({
      subject: `📬 New Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`,
      html: `
        <h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    });

    res.json({ message: 'Message received and emailed successfully' });
  } catch (err) {
    console.error('❌ Contact form error:', err);
    res.status(500).json({ message: 'Server error while sending message' });
  }
});

// 🔒 GET /api/contact/admin/data - Admin dashboard
router.get('/admin/data', async (req, res) => {
  if (!req.session.admin) return res.status(403).json({ message: 'Unauthorized' });

  try {
    const messages = await Message.find().sort({ date: -1 });
    const visitors = await VisitorLog.find().sort({ date: -1 });
    res.json({ messages, visitors });
  } catch (err) {
    console.error('❌ Admin data fetch error:', err);
    res.status(500).json({ message: 'Server error while fetching admin data' });
  }
});

module.exports = router;
