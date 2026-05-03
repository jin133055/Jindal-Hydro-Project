import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import App from './App.jsx';
import '../styles.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App page="home" />} />
        <Route path="/products" element={<App page="products" />} />
        <Route path="/product-detail" element={<App page="product-detail" />} />
        <Route path="/solutions" element={<App page="solutions" />} />
        <Route path="/about" element={<App page="about" />} />
        <Route path="/case-studies" element={<App page="case-studies" />} />
        <Route path="/blog" element={<App page="blog" />} />
        <Route path="/contact" element={<App page="contact" />} />
        <Route path="*" element={<App page="not-found" />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);

export { Link };
