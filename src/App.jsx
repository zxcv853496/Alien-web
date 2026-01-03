import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Home from './components/home/Home';
import BlogList from './components/blog/BlogList';
import BlogPost from './components/blog/BlogPost';
import PricingPage from './components/pricing/PricingPage';
import ContactPage from './components/contact/ContactPage';

import FloatingCTA from './components/common/FloatingCTA';

import AIPage from './components/ai/AIPage';

import { Toaster } from 'react-hot-toast';

import { AuthProvider } from './contexts/AuthContext';
import Login from './components/auth/Login';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Dashboard from './components/admin/Dashboard';
import Messages from './components/admin/Messages';
import ArticleList from './components/admin/articles/ArticleList';
import ArticleEditor from './components/admin/articles/ArticleEditor';
import AdminLayout from './components/admin/AdminLayout';

function App() {
  return (
    <AuthProvider>
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
        {/* Public Routes with MainLayout */}
        <Route element={<MainLayout><Outlet /><FloatingCTA /></MainLayout>}>
          <Route path="/" element={<Home />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/articles" element={<BlogList />} />
          <Route path="/articles/:id" element={<BlogPost />} />
          <Route path="/ai-strategy" element={<AIPage />} />
          <Route path="/login" element={<Login />} />
        </Route>



        {/* Protected Admin Routes with AdminLayout */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin/messages" element={<Messages />} />
            <Route path="/admin/articles" element={<ArticleList />} />
            <Route path="/admin/articles/:id" element={<ArticleEditor />} />
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
