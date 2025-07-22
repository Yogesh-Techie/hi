import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Skills from './pages/Skills';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import Login from './pages/Login';
import About from './pages/About';
import Blog from './pages/Blog';
import AppNavbar from './components/Navbar'; // ✅ Consistent naming

function ProtectedRoute({ children }) {
  const isAdmin = typeof window !== 'undefined' && localStorage.getItem('isAdmin') === 'true';
  return isAdmin ? children : <Navigate to="/login" replace />;
}

function App() {
  const isAdmin = typeof window !== 'undefined' && localStorage.getItem('isAdmin') === 'true';

  return (
    <BrowserRouter>
      <AppNavbar /> {/* ✅ Navbar should be outside Routes but inside Router */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={isAdmin ? <Navigate to="/admin" replace /> : <Login />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
