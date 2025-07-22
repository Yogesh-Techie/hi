const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');

// ✅ Middleware to check if admin is logged in
function requireAdmin(req, res, next) {
  if (req.session && req.session.admin) {
    return next();
  }
  return res.status(401).json({ msg: 'Unauthorized: Admins only' });
}

// ✅ GET /api/blogs - Public route to fetch all blogs
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ date: -1 });
    res.status(200).json(blogs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error while fetching blogs' });
  }
});

// ✅ POST /api/blogs - Admin-only route to create a blog
router.post('/', requireAdmin, async (req, res) => {
  const { title, content, image } = req.body;

  if (!title || !content) {
    return res.status(400).json({ msg: 'Title and content are required' });
  }

  try {
    const blog = new Blog({ title, content, image });
    await blog.save();
    res.status(201).json(blog);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error while creating blog' });
  }
});

// ✅ DELETE /api/blogs/:id - Admin-only route to delete a blog
router.delete('/:id', requireAdmin, async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      return res.status(404).json({ msg: 'Blog not found' });
    }
    res.status(200).json({ msg: 'Blog deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error while deleting blog' });
  }
});

// ✅ POST /api/blogs/:id/comments - Public route to post a comment on a blog
router.post('/:id/comments', async (req, res) => {
  const { name, message } = req.body;

  if (!name || !message) {
    return res.status(400).json({ msg: 'Name and message are required' });
  }

  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ msg: 'Blog not found' });
    }

    const newComment = {
      name,
      message,
      date: new Date()
    };

    blog.comments.push(newComment);
    await blog.save();

    res.status(201).json({ msg: 'Comment added', comments: blog.comments });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error while adding comment' });
  }
});

module.exports = router;
