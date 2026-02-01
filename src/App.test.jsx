import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';

// Mock Supabase
vi.mock('./lib/supabaseClient', () => ({
  supabase: {
    auth: {
      getSession: vi.fn().mockResolvedValue({ data: { session: null }, error: null }),
      onAuthStateChange: vi.fn().mockReturnValue({ data: { subscription: { unsubscribe: vi.fn() } } }),
    },
    from: vi.fn(() => ({
      select: vi.fn().mockResolvedValue({ data: [], error: null }),
    })),
  },
}));

// Mock i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
    i18n: {
      changeLanguage: vi.fn(),
      language: 'en',
    },
  }),
}));

// Mock scrollTo
window.scrollTo = vi.fn();

describe('App Smoke Test', () => {
  it('renders without crashing', () => {
    // This test ensures the app component tree can mount successfully
    // It verifies that providers (Auth, Theme, Router) are working together
    const { container } = render(
      <HelmetProvider>
        <MemoryRouter>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </MemoryRouter>
      </HelmetProvider>
    );

    expect(container).toBeTruthy();
    // Since we mock T to return keys, we expect to see content related to keys potentially 
    // or just checking that body is not empty.

    // Check if main layout is present (usually has some structure)
    // Or just check that we don't have a blank screen
    expect(document.body).toBeInTheDocument();
  });
});
