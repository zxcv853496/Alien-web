import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Home from './components/home/Home';
import BlogList from './components/blog/BlogList';
import BlogPost from './components/blog/BlogPost';
import PricingPage from './components/pricing/PricingPage';
import ContactPage from './components/contact/ContactPage';

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/articles" element={<BlogList />} />
        <Route path="/articles/:id" element={<BlogPost />} />
      </Routes>
    </MainLayout>
  );
}

export default App;
