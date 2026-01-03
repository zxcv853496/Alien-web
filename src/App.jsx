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
          duration: 4000,
          style: {
            background: '#333',
            color: '#fff',
            fontFamily: '"Inter", sans-serif',
            fontSize: '14px',
            borderRadius: '12px',
            padding: '12px 16px',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          },
          success: {
            style: {
              background: '#059669', // Emerald 600
            },
            iconTheme: {
              primary: '#fff',
              secondary: '#059669',
            },
          },
          error: {
            style: {
              background: '#dc2626', // Red 600
            },
            iconTheme: {
              primary: '#fff',
              secondary: '#dc2626',
            },
          },
        }}
      >
        {(t) => (
          <div
            style={{
              opacity: t.visible ? 1 : 0,
              transform: t.visible ? 'translateY(0)' : 'translateY(-20px)',
              transition: 'all 0.2s ease-in-out',
              background: t.type === 'success' ? '#059669' : t.type === 'error' ? '#dc2626' : '#333',
              color: '#fff',
              padding: '12px 16px',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
              fontFamily: '"Inter", sans-serif',
              fontSize: '14px',
              fontWeight: 500,
            }}
          >
            {t.icon}
            <div style={{ flex: 1 }}>
              {typeof t.message === 'function' ? t.message(t) : t.message}
            </div>
            <button
              onClick={() => toast.dismiss(t.id)}
              style={{
                background: 'rgba(255, 255, 255, 0.2)',
                border: 'none',
                color: '#fff',
                borderRadius: '50%',
                width: '20px',
                height: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                fontSize: '14px',
                lineHeight: 1,
                paddingBottom: '2px',
                transition: 'background 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)')}
            >
              ×
            </button>
          </div>
        )}
      </Toaster>
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
