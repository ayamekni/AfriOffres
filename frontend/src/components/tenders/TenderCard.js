import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Chip,
  Box,
  Button,
  Avatar,
  IconButton,
  Tooltip,
  Stack,
  Divider,
  Grid,
} from '@mui/material';
import {
  Business as BusinessIcon,
  LocationOn as LocationIcon,
  AttachMoney as MoneyIcon,
  Schedule as ScheduleIcon,
  BookmarkBorder as BookmarkIcon,
  Bookmark as BookmarkedIcon,
  Share as ShareIcon,
  Visibility as ViewIcon,
  TrendingUp as TrendingUpIcon,
  Category as CategoryIcon,
} from '@mui/icons-material';

const TenderCard = ({ tender }) => {
  const navigate = useNavigate();
  const [isBookmarked, setIsBookmarked] = useState(false);

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
      month: 'short',
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
        title: tender.title,
        text: tender.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <Card 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
        },
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Stack direction="row" spacing={1}>
            <Chip
              label={tender.status || 'Open'}
              color={getStatusColor(tender.status)}
              size="small"
            />
            <Chip
              label={tender.category || 'General'}
              color={getCategoryColor(tender.category)}
              size="small"
              variant="outlined"
            />
          </Stack>
          <Box>
            <Tooltip title={isBookmarked ? "Remove from bookmarks" : "Add to bookmarks"}>
              <IconButton
                size="small"
                onClick={() => setIsBookmarked(!isBookmarked)}
                color="primary"
              >
                {isBookmarked ? <BookmarkedIcon /> : <BookmarkIcon />}
              </IconButton>
            </Tooltip>
            <Tooltip title="Share">
              <IconButton size="small" onClick={handleShare} color="primary">
                <ShareIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        {/* Title */}
        <Typography
          variant="h6"
          component="h3"
          gutterBottom
          sx={{
            fontWeight: 600,
            lineHeight: 1.3,
            mb: 2,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {tender.title}
        </Typography>

        {/* Organization */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
          <Avatar sx={{ width: 24, height: 24, mr: 1, bgcolor: 'primary.main' }}>
            <BusinessIcon sx={{ fontSize: 14 }} />
          </Avatar>
          <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
            {tender.organization}
          </Typography>
        </Box>

        {/* Key Details Grid */}
        <Box sx={{ mb: 2 }}>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <LocationIcon sx={{ fontSize: 16, mr: 0.5, color: 'primary.main' }} />
                <Typography variant="caption" color="text.secondary">
                  {tender.country}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <MoneyIcon sx={{ fontSize: 16, mr: 0.5, color: 'success.main' }} />
                <Typography variant="caption" color="text.secondary">
                  {formatCurrency(tender.budget, tender.currency)}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ScheduleIcon sx={{ fontSize: 16, mr: 0.5, color: 'warning.main' }} />
                <Typography variant="caption" color="text.secondary">
                  Deadline: {formatDate(tender.deadline)}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* Description Preview */}
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            lineHeight: 1.4,
          }}
        >
          {tender.description}
        </Typography>
      </CardContent>

      <Divider />
      <CardActions sx={{ p: 2, pt: 1 }}>
        <Button
          size="small"
          variant="contained"
          fullWidth
          startIcon={<ViewIcon />}
          onClick={() => navigate(`/tenders/${tender._id}`)}
          sx={{ fontWeight: 600 }}
        >
          View Details
        </Button>
      </CardActions>
    </Card>
  );
};

export default TenderCard; 