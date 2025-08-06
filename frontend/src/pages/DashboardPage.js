import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Chip,
  LinearProgress,
  Paper,
  Container,
  Stack,
  Divider,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  Bookmark as BookmarkIcon,
  Search as SearchIcon,
  Notifications as NotificationsIcon,
  Business as BusinessIcon,
  LocationOn as LocationIcon,
  AttachMoney as MoneyIcon,
  Schedule as ScheduleIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Edit as EditIcon,
  Settings as SettingsIcon,
  Refresh as RefreshIcon,
  Visibility as ViewIcon,
} from '@mui/icons-material';

import { fetchRecommendations } from '../store/slices/tendersSlice';
import { getProfile } from '../store/slices/authSlice';
import TenderCard from '../components/tenders/TenderCard';

const DashboardPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { recommendations, tenders } = useSelector((state) => state.tenders);

  useEffect(() => {
    dispatch(getProfile());
    dispatch(fetchRecommendations());
  }, [dispatch]);

  const stats = [
    {
      title: 'Total Opportunities',
      value: tenders.length,
      icon: <SearchIcon sx={{ fontSize: 40 }} />,
      color: 'primary.main',
      change: '+12%',
      changeColor: 'success.main',
    },
    {
      title: 'Bookmarked Tenders',
      value: 3,
      icon: <BookmarkIcon sx={{ fontSize: 40 }} />,
      color: 'secondary.main',
      change: '+5%',
      changeColor: 'success.main',
    },
    {
      title: 'Applied This Month',
      value: 2,
      icon: <TrendingUpIcon sx={{ fontSize: 40 }} />,
      color: 'success.main',
      change: '+8%',
      changeColor: 'success.main',
    },
    {
      title: 'Notifications',
      value: 7,
      icon: <NotificationsIcon sx={{ fontSize: 40 }} />,
      color: 'warning.main',
      change: '+3',
      changeColor: 'warning.main',
    },
  ];

  const recentActivities = [
    {
      id: 1,
      action: 'Applied for',
      tender: 'Software Development Consultant',
      organization: 'Ministry of Digital Transformation',
      time: '2 hours ago',
      status: 'Pending',
    },
    {
      id: 2,
      action: 'Bookmarked',
      tender: 'Infrastructure Development Project Manager',
      organization: 'Department of Public Works',
      time: '1 day ago',
      status: 'Open',
    },
    {
      id: 3,
      action: 'Viewed',
      tender: 'Healthcare System Modernization',
      organization: 'Ministry of Health',
      time: '3 days ago',
      status: 'Open',
    },
  ];

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'open':
        return 'success';
      case 'closed':
        return 'error';
      case 'pending':
        return 'warning';
      default:
        return 'default';
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Welcome Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
          Welcome back, {user?.first_name || 'User'}! 👋
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
          Here's what's happening with your opportunities today
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ height: '100%', position: 'relative', overflow: 'visible' }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Box>
                    <Typography variant="h4" component="div" sx={{ fontWeight: 700, mb: 1 }}>
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      {stat.title}
                    </Typography>
                    <Chip
                      label={stat.change}
                      size="small"
                      sx={{
                        backgroundColor: stat.changeColor,
                        color: 'white',
                        fontSize: '0.75rem',
                      }}
                    />
                  </Box>
                  <Box
                    sx={{
                      color: stat.color,
                      p: 1,
                      borderRadius: 2,
                      backgroundColor: `${stat.color}15`,
                    }}
                  >
                    {stat.icon}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={4}>
        {/* Main Content */}
        <Grid item xs={12} lg={8}>
          {/* Profile Overview */}
          <Card sx={{ mb: 4 }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h5" component="h2" sx={{ fontWeight: 600 }}>
                  Profile Overview
                </Typography>
                <IconButton onClick={() => navigate('/profile')} color="primary">
                  <EditIcon />
                </IconButton>
              </Box>
              
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                      <PersonIcon />
                    </Avatar>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {user?.first_name} {user?.last_name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {user?.email}
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <EmailIcon sx={{ mr: 1, color: 'text.secondary', fontSize: 20 }} />
                    <Typography variant="body2" color="text.secondary">
                      {user?.email}
                    </Typography>
                  </Box>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    Preferences
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Preferred Categories
                    </Typography>
                    <Stack direction="row" spacing={1} flexWrap="wrap">
                      {user?.preferences?.categories?.map((category, index) => (
                        <Chip key={index} label={category} size="small" variant="outlined" />
                      )) || (
                        <Typography variant="body2" color="text.secondary">
                          No preferences set
                        </Typography>
                      )}
                    </Stack>
                  </Box>
                  
                  <Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Preferred Countries
                    </Typography>
                    <Stack direction="row" spacing={1} flexWrap="wrap">
                      {user?.preferences?.countries?.map((country, index) => (
                        <Chip key={index} label={country} size="small" variant="outlined" />
                      )) || (
                        <Typography variant="body2" color="text.secondary">
                          No preferences set
                        </Typography>
                      )}
                    </Stack>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Recommended Opportunities */}
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h5" component="h2" sx={{ fontWeight: 600 }}>
                  Recommended for You
                </Typography>
                <Button
                  variant="outlined"
                  startIcon={<RefreshIcon />}
                  onClick={() => dispatch(fetchRecommendations())}
                >
                  Refresh
                </Button>
              </Box>
              
              {recommendations.length > 0 ? (
                <Grid container spacing={3}>
                  {recommendations.slice(0, 3).map((tender) => (
                    <Grid item xs={12} key={tender._id}>
                      <TenderCard tender={tender} />
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <SearchIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
                  <Typography variant="h6" color="text.secondary" gutterBottom>
                    No recommendations yet
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Update your preferences to get personalized recommendations
                  </Typography>
                  <Button
                    variant="contained"
                    onClick={() => navigate('/profile')}
                    startIcon={<SettingsIcon />}
                  >
                    Update Preferences
                  </Button>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Sidebar */}
        <Grid item xs={12} lg={4}>
          <Stack spacing={3}>
            {/* Recent Activity */}
            <Card>
              <CardContent>
                <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
                  Recent Activity
                </Typography>
                <List sx={{ p: 0 }}>
                  {recentActivities.map((activity, index) => (
                    <React.Fragment key={activity.id}>
                      <ListItem sx={{ px: 0, py: 1.5 }}>
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                            {activity.action === 'Applied for' && <TrendingUpIcon fontSize="small" />}
                            {activity.action === 'Bookmarked' && <BookmarkIcon fontSize="small" />}
                            {activity.action === 'Viewed' && <ViewIcon fontSize="small" />}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                              {activity.action} <strong>{activity.tender}</strong>
                            </Typography>
                          }
                          secondary={
                            <Box>
                              <Typography variant="caption" color="text.secondary">
                                {activity.organization}
                              </Typography>
                              <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                                <Typography variant="caption" color="text.secondary" sx={{ mr: 1 }}>
                                  {activity.time}
                                </Typography>
                                <Chip
                                  label={activity.status}
                                  size="small"
                                  color={getStatusColor(activity.status)}
                                  sx={{ height: 20 }}
                                />
                              </Box>
                            </Box>
                          }
                        />
                      </ListItem>
                      {index < recentActivities.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </List>
                <Button
                  variant="text"
                  fullWidth
                  sx={{ mt: 2 }}
                  onClick={() => navigate('/tenders')}
                >
                  View All Activity
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardContent>
                <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
                  Quick Actions
                </Typography>
                <Stack spacing={2}>
                  <Button
                    variant="contained"
                    fullWidth
                    startIcon={<SearchIcon />}
                    onClick={() => navigate('/tenders')}
                  >
                    Browse All Tenders
                  </Button>
                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<BookmarkIcon />}
                    onClick={() => navigate('/tenders')}
                  >
                    View Bookmarks
                  </Button>
                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<SettingsIcon />}
                    onClick={() => navigate('/profile')}
                  >
                    Update Profile
                  </Button>
                </Stack>
              </CardContent>
            </Card>

            {/* Application Progress */}
            <Card>
              <CardContent>
                <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
                  Application Progress
                </Typography>
                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">Profile Completion</Typography>
                    <Typography variant="body2" color="primary">85%</Typography>
                  </Box>
                  <LinearProgress variant="determinate" value={85} sx={{ height: 8, borderRadius: 4 }} />
                </Box>
                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">Preferences Set</Typography>
                    <Typography variant="body2" color="primary">60%</Typography>
                  </Box>
                  <LinearProgress variant="determinate" value={60} sx={{ height: 8, borderRadius: 4 }} />
                </Box>
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">Applications This Month</Typography>
                    <Typography variant="body2" color="primary">2/5</Typography>
                  </Box>
                  <LinearProgress variant="determinate" value={40} sx={{ height: 8, borderRadius: 4 }} />
                </Box>
              </CardContent>
            </Card>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DashboardPage; 