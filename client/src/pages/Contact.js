import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { motion } from 'framer-motion';
import axios from 'axios';
import { FaLinkedin } from 'react-icons/fa';

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/api/contact', form, { withCredentials: true });
      setSubmitted(true);
      setError('');
      setForm({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setError('❌ Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="page-section contact-section">
      <Container style={{ maxWidth: 600 }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Contact Me</h2>

          {/* ✅ Success Message */}
          {submitted && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Alert
                variant="success"
                dismissible
                onClose={() => setSubmitted(false)}
                className="mt-3"
              >
                ✅ Your message has been sent successfully! I will get back to you shortly.
              </Alert>
            </motion.div>
          )}

          {/* ❌ Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Alert
                variant="danger"
                dismissible
                onClose={() => setError('')}
                className="mt-3"
              >
                {error}
              </Alert>
            </motion.div>
          )}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                name="message"
                value={form.message}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button type="submit" variant="primary">Send</Button>
          </Form>

          <div className="mt-4 text-center">
            <a
              href="https://www.linkedin.com/in/yogesh-rk"
              target="_blank"
              rel="noopener noreferrer"
              className="text-decoration-none d-inline-flex align-items-center gap-2 text-dark"
            >
              <FaLinkedin size={24} color="#0077b5" />
              <span>www.linkedin.com/in/yogesh-rk</span>
            </a>
          </div>
        </motion.div>
      </Container>
    </div>
  );
}

export default Contact;
