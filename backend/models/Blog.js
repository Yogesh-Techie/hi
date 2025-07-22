const mongoose = require('mongoose');

// Define the comment sub-schema
const commentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  message: {
    type: String,
    required: true,
    maxlength: 1000
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// Define the blog schema
const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  content: {
    type: String,
    required: true,
    minlength: 10
  },
  image: {
    type: String,
    default: ''
  },
  date: {
    type: Date,
    default: Date.now
  },
  comments: [commentSchema] // ✅ Add comments field
});

module.exports = mongoose.model('Blog', blogSchema);
