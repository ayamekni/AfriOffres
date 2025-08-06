import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Container,
  Paper,
  Stack,
  Grid,
} from '@mui/material';
import {
  Home as HomeIcon,
  Search as SearchIcon,
  ArrowBack as ArrowBackIcon,
  Error as ErrorIcon,
} from '@mui/icons-material';

const NotFoundPage = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      title: 'Browse Tenders',
      description: 'Explore available opportunities',
      icon: <SearchIcon sx={{ fontSize: 40 }} />,
      action: () => navigate('/tenders'),
      color: 'primary',
    },
    {
      title: 'Go Home',
      description: 'Return to the homepage',
      icon: <HomeIcon sx={{ fontSize: 40 }} />,
      action: () => navigate('/'),
      color: 'secondary',
    },
  ];

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        {/* 404 Icon */}
        <Box sx={{ mb: 4 }}>
          <ErrorIcon sx={{ fontSize: 120, color: 'primary.main', mb: 2 }} />
        </Box>

        {/* Main Message */}
        <Typography variant="h1" component="h1" gutterBottom sx={{ fontWeight: 700, fontSize: { xs: '4rem', md: '6rem' } }}>
          404
        </Typography>
        
        <Typography variant="h3" component="h2" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
          Page Not Found
        </Typography>
        
        <Typography variant="h6" color="text.secondary" sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}>
          Oops! The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
        </Typography>

        {/* Action Buttons */}
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center" sx={{ mb: 6 }}>
          <Button
            variant="contained"
            size="large"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
          >
            Go Back
          </Button>
          <Button
            variant="outlined"
            size="large"
            startIcon={<HomeIcon />}
            onClick={() => navigate('/')}
          >
            Go Home
          </Button>
        </Stack>
      </Box>

      {/* Quick Actions */}
      <Paper sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600, textAlign: 'center', mb: 4 }}>
          What would you like to do?
        </Typography>
        
        <Grid container spacing={3}>
          {quickActions.map((action, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Paper
                sx={{
                  p: 3,
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                  },
                }}
                onClick={action.action}
              >
                <Box sx={{ color: `${action.color}.main`, mb: 2 }}>
                  {action.icon}
                </Box>
                <Typography variant="h6" component="h4" gutterBottom sx={{ fontWeight: 600 }}>
                  {action.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {action.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* Help Section */}
      <Box sx={{ mt: 6, textAlign: 'center' }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
          Need Help?
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          If you believe this is an error, please contact our support team.
        </Typography>
        <Button
          variant="text"
          color="primary"
          onClick={() => navigate('/contact')}
        >
          Contact Support
        </Button>
      </Box>
    </Container>
  );
};

export default NotFoundPage; 