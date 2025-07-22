import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Card, Form, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';

function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [commentInputs, setCommentInputs] = useState({}); // Track inputs per blog
  const [commentSuccess, setCommentSuccess] = useState({}); // Track success msg per blog

  useEffect(() => {
    axios.get('http://localhost:4000/api/blogs')
      .then(res => setBlogs(res.data))
      .catch(err => console.error('Failed to fetch blogs:', err));
  }, []);

  const handleInputChange = (blogId, field, value) => {
    setCommentInputs(prev => ({
      ...prev,
      [blogId]: {
        ...prev[blogId],
        [field]: value
      }
    }));
  };

  const handleCommentSubmit = async (blogId) => {
    const input = commentInputs[blogId];
    if (!input?.name || !input?.message) return;

    try {
      const res = await axios.post(`http://localhost:4000/api/blogs/${blogId}/comments`, input);
      // Update the specific blog's comments
      setBlogs(prev =>
        prev.map(blog =>
          blog._id === blogId ? { ...blog, comments: res.data.comments } : blog
        )
      );
      setCommentSuccess({ [blogId]: '✅ Comment added!' });
      setTimeout(() => setCommentSuccess({}), 3000);
      setCommentInputs(prev => ({ ...prev, [blogId]: { name: '', message: '' } }));
    } catch (err) {
      console.error('❌ Failed to submit comment:', err);
    }
  };

  return (
    <div className="page-section gradient-bg">
      <Container>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7 }}>
          <h2 className="section-title">📝 Blog</h2>
          {blogs.length === 0 ? (
            <p className="text-light">No blogs found.</p>
          ) : (
            blogs.map((blog, idx) => (
              <Card key={idx} className="mb-5 shadow-sm">
                <Card.Body>
                  <div
                    dangerouslySetInnerHTML={{ __html: blog.title }}
                    style={{ fontWeight: 'bold', fontSize: '20px', marginBottom: '10px' }}
                  />
                  <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                  <small className="text-muted d-block mt-2">
                    Posted on: {new Date(blog.date).toLocaleString()}
                  </small>

                  {/* ✅ Comments Section */}
                  <hr />
                  <h6>💬 Comments</h6>
                  {blog.comments && blog.comments.length > 0 ? (
                    blog.comments.map((c, i) => (
                      <div key={i} className="mb-2">
                        <strong>{c.name}</strong> <small className="text-muted">({new Date(c.date).toLocaleString()})</small>
                        <p className="mb-1">{c.message}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted">No comments yet.</p>
                  )}

                  {/* ✅ Comment Form */}
                  <Form className="mt-3">
                    <Form.Group className="mb-2">
                      <Form.Control
                        size="sm"
                        type="text"
                        placeholder="Your Name"
                        value={commentInputs[blog._id]?.name || ''}
                        onChange={(e) =>
                          handleInputChange(blog._id, 'name', e.target.value)
                        }
                      />
                    </Form.Group>
                    <Form.Group className="mb-2">
                      <Form.Control
                        as="textarea"
                        size="sm"
                        rows={2}
                        placeholder="Your Comment"
                        value={commentInputs[blog._id]?.message || ''}
                        onChange={(e) =>
                          handleInputChange(blog._id, 'message', e.target.value)
                        }
                      />
                    </Form.Group>
                    <Button
                      size="sm"
                      variant="primary"
                      onClick={() => handleCommentSubmit(blog._id)}
                    >
                      Submit Comment
                    </Button>
                    {commentSuccess[blog._id] && (
                      <div className="text-success mt-2">{commentSuccess[blog._id]}</div>
                    )}
                  </Form>
                </Card.Body>
              </Card>
            ))
          )}
        </motion.div>
      </Container>
    </div>
  );
}

export default Blog;
