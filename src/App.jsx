import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Home from './components/home/Home';
import BlogList from './components/blog/BlogList';
import BlogPost from './components/blog/BlogPost';
import PricingPage from './components/pricing/PricingPage';
import ContactPage from './components/contact/ContactPage';

import FloatingCTA from './components/common/FloatingCTA';

import AIPage from './components/ai/AIPage';

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/articles" element={<BlogList />} />
        <Route path="/articles/:id" element={<BlogPost />} />
        <Route path="/ai-strategy" element={<AIPage />} />
      </Routes>
      <FloatingCTA />
    </MainLayout>
  );
}

export default App;
