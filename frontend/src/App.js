import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Container } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

// Components
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import Footer from './components/layout/Footer';
import NotificationSystem from './components/common/NotificationSystem';

// Pages
import HomePage from './pages/HomePage';
import TendersPage from './pages/TendersPage';
import TenderDetailPage from './pages/TenderDetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import DashboardPage from './pages/DashboardPage';
import NotFoundPage from './pages/NotFoundPage';

// Redux actions
import { getProfile } from './store/slices/authSlice';
import { fetchTenders, fetchCategories, fetchCountries } from './store/slices/tendersSlice';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { theme } = useSelector((state) => state.ui);

  // Create theme based on user preference
  const appTheme = createTheme({
    palette: {
      mode: theme,
      primary: {
        main: '#1976d2',
        light: '#42a5f5',
        dark: '#1565c0',
      },
      secondary: {
        main: '#dc004e',
        light: '#ff5983',
        dark: '#9a0036',
      },
      background: {
        default: theme === 'light' ? '#f5f5f5' : '#121212',
        paper: theme === 'light' ? '#ffffff' : '#1e1e1e',
      },
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      h4: {
        fontWeight: 600,
      },
      h5: {
        fontWeight: 600,
      },
      h6: {
        fontWeight: 600,
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            borderRadius: 8,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            boxShadow: theme === 'light' 
              ? '0 2px 8px rgba(0,0,0,0.1)' 
              : '0 2px 8px rgba(255,255,255,0.1)',
          },
        },
      },
    },
  });

  useEffect(() => {
    // Check if user is authenticated and get profile
    if (isAuthenticated && !user) {
      dispatch(getProfile());
    }

    // Fetch initial data
    dispatch(fetchTenders());
    dispatch(fetchCategories());
    dispatch(fetchCountries());
  }, [dispatch, isAuthenticated, user]);

  return (
    <ThemeProvider theme={appTheme}>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        
        <Box sx={{ display: 'flex', flex: 1 }}>
          <Sidebar />
          
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              backgroundColor: 'background.default',
              minHeight: 'calc(100vh - 64px)',
            }}
          >
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/tenders" element={<TendersPage />} />
              <Route path="/tenders/:id" element={<TenderDetailPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                }
              />
                              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Box>
        </Box>
        
        <Footer />
        <NotificationSystem />
      </Box>
    </ThemeProvider>
  );
}

export default App; 