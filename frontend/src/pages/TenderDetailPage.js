import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Chip,
  Button,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  IconButton,
  Skeleton,
  Alert,
  Container,
  Stack,
  Breadcrumbs,
  Link,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Business as BusinessIcon,
  LocationOn as LocationIcon,
  AttachMoney as MoneyIcon,
  Schedule as ScheduleIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Language as LanguageIcon,
  CheckCircle as CheckCircleIcon,
  Share as ShareIcon,
  BookmarkBorder as BookmarkIcon,
  Bookmark as BookmarkedIcon,
  TrendingUp as TrendingUpIcon,
  Category as CategoryIcon,
  CalendarToday as CalendarIcon,
} from '@mui/icons-material';

import { fetchTenderById } from '../store/slices/tendersSlice';

const TenderDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { selectedTender, loading, error } = useSelector((state) => state.tenders);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchTenderById(id));
    }
  }, [dispatch, id]);

  const formatCurrency = (amount, currency) => {
    if (!amount) return 'Not specified';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency || 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'No deadline';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

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

  const getCategoryColor = (category) => {
    const colors = {
      'Technology': 'primary',
      'Infrastructure': 'secondary',
      'Healthcare': 'error',
      'Agriculture': 'success',
      'Education': 'info',
      'Energy': 'warning',
    };
    return colors[category] || 'default';
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: selectedTender?.title,
        text: selectedTender?.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      // You could add a toast notification here
    }
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Skeleton variant="rectangular" height={60} sx={{ mb: 2 }} />
        <Skeleton variant="rectangular" height={400} sx={{ mb: 2 }} />
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Skeleton variant="rectangular" height={200} sx={{ mb: 2 }} />
            <Skeleton variant="rectangular" height={300} />
          </Grid>
          <Grid item xs={12} md={4}>
            <Skeleton variant="rectangular" height={400} />
          </Grid>
        </Grid>
      </Container>
    );
  }

  if (error || !selectedTender) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error || 'Tender not found'}
        </Alert>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/tenders')}
        >
          Back to Tenders
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Breadcrumbs */}
      <Breadcrumbs sx={{ mb: 3 }}>
        <Link
          color="inherit"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            navigate('/');
          }}
        >
          Home
        </Link>
        <Link
          color="inherit"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            navigate('/tenders');
          }}
        >
          Tenders
        </Link>
        <Typography color="text.primary">Details</Typography>
      </Breadcrumbs>

      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/tenders')}
            sx={{ mb: 2 }}
          >
            Back to Tenders
          </Button>
          <Box>
            <IconButton onClick={() => setIsBookmarked(!isBookmarked)} color="primary">
              {isBookmarked ? <BookmarkedIcon /> : <BookmarkIcon />}
            </IconButton>
            <IconButton onClick={handleShare} color="primary">
              <ShareIcon />
            </IconButton>
          </Box>
        </Box>

        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700, lineHeight: 1.2 }}>
          {selectedTender.title}
        </Typography>

        <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
          <Chip
            label={selectedTender.status || 'Open'}
            color={getStatusColor(selectedTender.status)}
            size="large"
          />
          <Chip
            label={selectedTender.category || 'General'}
            color={getCategoryColor(selectedTender.category)}
            variant="outlined"
            size="large"
          />
        </Stack>
      </Box>

      <Grid container spacing={4}>
        {/* Main Content */}
        <Grid item xs={12} md={8}>
          {/* Description */}
          <Card sx={{ mb: 4 }}>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
                Description
              </Typography>
              <Typography variant="body1" paragraph sx={{ lineHeight: 1.7, fontSize: '1.1rem' }}>
                {selectedTender.description}
              </Typography>
            </CardContent>
          </Card>

          {/* Requirements */}
          {selectedTender.requirements && selectedTender.requirements.length > 0 && (
            <Card sx={{ mb: 4 }}>
              <CardContent>
                <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
                  Requirements
                </Typography>
                <List>
                  {selectedTender.requirements.map((requirement, index) => (
                    <ListItem key={index} sx={{ py: 0.5 }}>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <CheckCircleIcon color="primary" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary={requirement} />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          )}
        </Grid>

        {/* Sidebar */}
        <Grid item xs={12} md={4}>
          <Stack spacing={3}>
            {/* Organization Info */}
            <Card>
              <CardContent>
                <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
                  Organization
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <BusinessIcon sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {selectedTender.organization}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <LocationIcon sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography variant="body2" color="text.secondary">
                    {selectedTender.country}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CategoryIcon sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography variant="body2" color="text.secondary">
                    {selectedTender.category}
                  </Typography>
                </Box>
              </CardContent>
            </Card>

            {/* Budget & Timeline */}
            <Card>
              <CardContent>
                <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
                  Budget & Timeline
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <MoneyIcon sx={{ mr: 1, color: 'success.main' }} />
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {formatCurrency(selectedTender.budget, selectedTender.currency)}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <CalendarIcon sx={{ mr: 1, color: 'warning.main' }} />
                  <Typography variant="body2" color="text.secondary">
                    Deadline: {formatDate(selectedTender.deadline)}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <TrendingUpIcon sx={{ mr: 1, color: 'info.main' }} />
                  <Typography variant="body2" color="text.secondary">
                    Posted: {formatDate(selectedTender.created_at)}
                  </Typography>
                </Box>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardContent>
                <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
                  Contact Information
                </Typography>
                {selectedTender.contact_email && (
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <EmailIcon sx={{ mr: 1, color: 'primary.main' }} />
                    <Typography variant="body2" component="a" href={`mailto:${selectedTender.contact_email}`}>
                      {selectedTender.contact_email}
                    </Typography>
                  </Box>
                )}
                {selectedTender.contact_phone && (
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <PhoneIcon sx={{ mr: 1, color: 'primary.main' }} />
                    <Typography variant="body2" component="a" href={`tel:${selectedTender.contact_phone}`}>
                      {selectedTender.contact_phone}
                    </Typography>
                  </Box>
                )}
                {selectedTender.website && (
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <LanguageIcon sx={{ mr: 1, color: 'primary.main' }} />
                    <Typography variant="body2" component="a" href={selectedTender.website} target="_blank" rel="noopener">
                      Visit Website
                    </Typography>
                  </Box>
                )}
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <Card>
              <CardContent>
                <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
                  Take Action
                </Typography>
                <Stack spacing={2}>
                  <Button
                    variant="contained"
                    size="large"
                    fullWidth
                    startIcon={<EmailIcon />}
                    href={`mailto:${selectedTender.contact_email}`}
                  >
                    Contact Organization
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    fullWidth
                    startIcon={<BookmarkIcon />}
                    onClick={() => setIsBookmarked(!isBookmarked)}
                  >
                    {isBookmarked ? 'Remove from Bookmarks' : 'Add to Bookmarks'}
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
};

export default TenderDetailPage; 