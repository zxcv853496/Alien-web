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

import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <MainLayout>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#333',
            color: '#fff',
            fontFamily: '"Inter", sans-serif',
            fontSize: '14px',
            borderRadius: '8px',
          },
          success: {
            style: {
              background: '#4caf50',
            },
            iconTheme: {
              primary: '#fff',
              secondary: '#4caf50',
            },
          },
          error: {
            style: {
              background: '#f44336',
            },
            iconTheme: {
              primary: '#fff',
              secondary: '#f44336',
            },
          },
        }}
      />
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
