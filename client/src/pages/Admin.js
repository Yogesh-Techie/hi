import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container, Button, Table, Alert, Spinner,
  Form, Tabs, Tab
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './Home.css';

function Admin() {
  const [data, setData] = useState({ messages: [], visitors: [] });
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [blogSuccess, setBlogSuccess] = useState('');
  const [newBlog, setNewBlog] = useState({ title: '', content: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    if (!isAdmin) {
      navigate('/login');
      return;
    }

    const fetchData = async () => {
      try {
        const [contactRes, blogRes] = await Promise.all([
          axios.get('http://localhost:4000/api/contact/admin/data', { withCredentials: true }),
          axios.get('http://localhost:4000/api/blogs')
        ]);
        setData(contactRes.data);
        setBlogs(blogRes.data);
        setLoading(false);
      } catch (err) {
        setError('❌ Failed to load data');
        navigate('/login');
      }
    };

    fetchData();
  }, [navigate]);

  const logout = async () => {
    await axios.post('http://localhost:4000/api/auth/logout', {}, { withCredentials: true });
    localStorage.removeItem('isAdmin');
    navigate('/login');
  };

  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/api/blogs', newBlog, { withCredentials: true });
      const updatedBlogs = await axios.get('http://localhost:4000/api/blogs');
      setBlogs(updatedBlogs.data);
      setNewBlog({ title: '', content: '' });
      setBlogSuccess('✅ Blog posted successfully!');
      setTimeout(() => setBlogSuccess(''), 3000);
    } catch (err) {
      setBlogSuccess('❌ Failed to post blog');
    }
  };

  const deleteBlog = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/blogs/${id}`, { withCredentials: true });
      setBlogs(prev => prev.filter(blog => blog._id !== id));
    } catch (err) {
      console.error('❌ Failed to delete blog');
    }
  };

  return (
    <div className="admin-section page-section" style={{ minHeight: '100vh' }}>
      <div className="overlay" style={{ backgroundColor: 'rgba(0,0,0,0.7)', padding: '40px 0' }}>
        <Container>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7 }}>
            <h2 className="section-title">Admin Panel</h2>
            <Button onClick={logout} variant="danger" className="mb-4">Logout</Button>

            {error && <Alert variant="danger">{error}</Alert>}
            {loading ? (
              <div className="text-center">
                <Spinner animation="border" variant="light" />
              </div>
            ) : (
              <Tabs defaultActiveKey="visitor" id="admin-tabs" className="mb-3 bg-light p-2 rounded">
                {/* Visitor Logs */}
                <Tab eventKey="visitor" title="Visitor Logs">
                  {data.visitors.length === 0 ? (
                    <p className="text-light">No visitor logs found.</p>
                  ) : (
                    <Table bordered responsive size="sm" className="bg-white">
                      <thead>
                        <tr><th>IP</th><th>UserAgent</th><th>Path</th><th>Date</th></tr>
                      </thead>
                      <tbody>
                        {data.visitors.map((v, i) => (
                          <tr key={i}>
                            <td>{v.ip}</td>
                            <td>{v.userAgent.slice(0, 40)}...</td>
                            <td>{v.path}</td>
                            <td>{new Date(v.date).toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  )}
                </Tab>

                {/* Contact Messages */}
                <Tab eventKey="messages" title="Messages">
                  {data.messages.length === 0 ? (
                    <p className="text-light">No messages submitted yet.</p>
                  ) : (
                    <Table bordered responsive size="sm" className="bg-white">
                      <thead>
                        <tr><th>Name</th><th>Email</th><th>Message</th><th>Date</th></tr>
                      </thead>
                      <tbody>
                        {data.messages.map((m, i) => (
                          <tr key={i}>
                            <td>{m.name}</td>
                            <td>{m.email}</td>
                            <td>{m.message}</td>
                            <td>{new Date(m.date).toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  )}
                </Tab>

                {/* Blog Section */}
                <Tab eventKey="blog" title="Blog">
                  {blogSuccess && <Alert variant="info">{blogSuccess}</Alert>}

                  {/* Post Blog */}
                  <Form onSubmit={handleBlogSubmit} className="mb-4">
                    <Form.Group className="mb-3">
                      <Form.Label>Title</Form.Label>
                      <ReactQuill
                        value={newBlog.title}
                        onChange={(value) => setNewBlog({ ...newBlog, title: value })}
                        theme="snow"
                        placeholder="Blog title"
                        modules={{
                          toolbar: [['bold', 'italic', 'underline', 'link'], ['clean']],
                        }}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Content</Form.Label>
                      <ReactQuill
                        value={newBlog.content}
                        onChange={(value) => setNewBlog({ ...newBlog, content: value })}
                        theme="snow"
                        placeholder="Blog content"
                      />
                    </Form.Group>
                    <Button type="submit">Post Blog</Button>
                  </Form>

                  {/* Blog List */}
                  <h5 className="text-light">Posted Blogs</h5>
                  {blogs.length === 0 ? (
                    <p className="text-light">No blogs posted yet.</p>
                  ) : (
                    blogs.map(blog => (
                      <div key={blog._id} className="bg-white p-3 mb-3 rounded shadow-sm">
                        <div className="blog-title" dangerouslySetInnerHTML={{ __html: blog.title }} />
                        <small className="text-muted">{new Date(blog.date).toLocaleString()}</small>
                        <div>
                          <Button
                            variant="danger"
                            size="sm"
                            className="mt-2"
                            onClick={() => deleteBlog(blog._id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </Tab>
              </Tabs>
            )}
          </motion.div>
        </Container>
      </div>
    </div>
  );
}

export default Admin;
