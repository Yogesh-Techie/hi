const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const Admin = require('./models/Admin');

dotenv.config();

async function seedAdmin() {
  await mongoose.connect(process.env.MONGO_URI);
  const existing = await Admin.findOne({ email: process.env.ADMIN_EMAIL });
  if (existing) {
    console.log('Admin already exists');
    process.exit();
  }

  const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
  await Admin.create({
    email: process.env.ADMIN_EMAIL,
    password: hashedPassword
  });

  console.log('Admin user created successfully');
  process.exit();
}

seedAdmin();
