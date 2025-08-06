import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  Chip,
  Container,
  Paper,
  Stack,
} from '@mui/material';
import {
  Search as SearchIcon,
  TrendingUp as TrendingUpIcon,
  Notifications as NotificationsIcon,
  Security as SecurityIcon,
  Speed as SpeedIcon,
  Public as PublicIcon,
} from '@mui/icons-material';

import { fetchTenders } from '../store/slices/tendersSlice';
import TenderCard from '../components/tenders/TenderCard';

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tenders, loading } = useSelector((state) => state.tenders);
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (tenders.length === 0) {
      dispatch(fetchTenders({ limit: 6 }));
    }
  }, [dispatch, tenders.length]);

  const features = [
    {
      icon: <SearchIcon sx={{ fontSize: 40 }} />,
      title: 'Advanced Search',
      description: 'Find the perfect opportunity with our powerful search and filtering tools.',
    },
    {
      icon: <TrendingUpIcon sx={{ fontSize: 40 }} />,
      title: 'Real-time Updates',
      description: 'Get notified instantly when new tenders match your preferences.',
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 40 }} />,
      title: 'Verified Sources',
      description: 'All tenders are sourced directly from official government websites.',
    },
    {
      icon: <SpeedIcon sx={{ fontSize: 40 }} />,
      title: 'Fast & Efficient',
      description: 'Quick access to thousands of opportunities across Africa.',
    },
    {
      icon: <NotificationsIcon sx={{ fontSize: 40 }} />,
      title: 'Smart Notifications',
      description: 'Personalized alerts based on your skills and interests.',
    },
    {
      icon: <PublicIcon sx={{ fontSize: 40 }} />,
      title: 'Pan-African Coverage',
      description: 'Comprehensive coverage of opportunities across the continent.',
    },
  ];

  const stats = [
    { label: 'Countries', value: '50+' },
    { label: 'Tenders', value: '10,000+' },
    { label: 'Organizations', value: '500+' },
    { label: 'Users', value: '25,000+' },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Paper
        sx={{
          position: 'relative',
          backgroundColor: 'grey.800',
          color: 'white',
          mb: 4,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundImage: 'url(https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2074&q=80)',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            backgroundColor: 'rgba(0,0,0,.3)',
          }}
        />
        <Container maxWidth="lg" sx={{ position: 'relative', py: 8 }}>
          <Typography component="h1" variant="h2" color="inherit" gutterBottom>
            Discover African Opportunities
          </Typography>
          <Typography variant="h5" color="inherit" paragraph>
            Centralized access to public job offers and tenders across Africa. 
            Find your next opportunity with our comprehensive platform.
          </Typography>
          <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/tenders')}
              startIcon={<SearchIcon />}
            >
              Browse Tenders
            </Button>
            {!isAuthenticated && (
              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate('/register')}
                sx={{ color: 'white', borderColor: 'white' }}
              >
                Get Started
              </Button>
            )}
          </Stack>
        </Container>
      </Paper>

      {/* Stats Section */}
      <Container maxWidth="lg" sx={{ mb: 6 }}>
        <Grid container spacing={3} justifyContent="center">
          {stats.map((stat) => (
            <Grid item xs={6} sm={3} key={stat.label}>
              <Box textAlign="center">
                <Typography variant="h3" component="div" color="primary" gutterBottom>
                  {stat.value}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {stat.label}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ mb: 6 }}>
        <Typography variant="h4" component="h2" gutterBottom textAlign="center" sx={{ mb: 4 }}>
          Why Choose AfriOffres?
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ height: '100%', textAlign: 'center' }}>
                <CardContent>
                  <Box sx={{ color: 'primary.main', mb: 2 }}>
                    {feature.icon}
                  </Box>
                  <Typography gutterBottom variant="h6" component="h3">
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Recent Tenders Section */}
      <Container maxWidth="lg" sx={{ mb: 6 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h2">
            Recent Opportunities
          </Typography>
          <Button
            variant="outlined"
            onClick={() => navigate('/tenders')}
          >
            View All
          </Button>
        </Box>
        
        {loading ? (
          <Grid container spacing={3}>
            {[1, 2, 3].map((item) => (
              <Grid item xs={12} md={4} key={item}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Box sx={{ width: '100%', height: 20, bgcolor: 'grey.300', borderRadius: 1 }} />
                    </Box>
                    <Box sx={{ width: '80%', height: 16, bgcolor: 'grey.300', borderRadius: 1, mb: 1 }} />
                    <Box sx={{ width: '60%', height: 16, bgcolor: 'grey.300', borderRadius: 1 }} />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Grid container spacing={3}>
            {tenders.slice(0, 6).map((tender) => (
              <Grid item xs={12} md={4} key={tender._id}>
                <TenderCard tender={tender} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>

      {/* CTA Section */}
      <Paper sx={{ bgcolor: 'primary.main', color: 'white', py: 6 }}>
        <Container maxWidth="md" textAlign="center">
          <Typography variant="h4" component="h2" gutterBottom>
            Ready to Find Your Next Opportunity?
          </Typography>
          <Typography variant="h6" paragraph>
            Join thousands of professionals who trust AfriOffres for their career growth.
          </Typography>
          <Stack direction="row" spacing={2} justifyContent="center">
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/tenders')}
              sx={{ bgcolor: 'white', color: 'primary.main' }}
            >
              Start Searching
            </Button>
            {!isAuthenticated && (
              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate('/register')}
                sx={{ color: 'white', borderColor: 'white' }}
              >
                Create Account
              </Button>
            )}
          </Stack>
        </Container>
      </Paper>
    </Box>
  );
};

export default HomePage; 