const nodemailer = require('nodemailer');
require('dotenv').config(); // Load .env

// Validate critical ENV vars
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS || !process.env.EMAIL_TO) {
  console.error('❌ Missing required email environment variables (EMAIL_USER, EMAIL_PASS, EMAIL_TO)');
  process.exit(1);
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Verify transporter setup once on startup
transporter.verify((error, success) => {
  if (error) {
    console.error('❌ Email transporter error:', error);
  } else {
    console.log('✅ Email transporter ready');
  }
});

const sendMail = async ({ subject, text, html }) => {
  try {
    const mailOptions = {
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      subject: subject || '📨 New Portfolio Message',
      text: text || 'No plain text provided.',
      html: html || '<p>No HTML content provided.</p>'
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent:', info.messageId);
  } catch (err) {
    console.error('❌ Failed to send email:', err.message);
    throw err;
  }
};

module.exports = sendMail;
