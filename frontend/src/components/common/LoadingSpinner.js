import React from 'react';
import {
  Box,
  CircularProgress,
  Typography,
  Paper,
  Fade,
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
} from '@mui/icons-material';

const LoadingSpinner = ({ 
  message = 'Loading...', 
  size = 'large',
  fullScreen = false,
  variant = 'spinner' 
}) => {
  const getSize = () => {
    switch (size) {
      case 'small':
        return 24;
      case 'medium':
        return 40;
      case 'large':
        return 60;
      default:
        return 40;
    }
  };

  const getContainerStyles = () => {
    if (fullScreen) {
      return {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        bgcolor: 'rgba(255, 255, 255, 0.9)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      };
    }
    return {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      py: 4,
    };
  };

  if (variant === 'card') {
    return (
      <Fade in={true}>
        <Paper
          sx={{
            p: 4,
            textAlign: 'center',
            borderRadius: 3,
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          }}
        >
          <Box sx={{ position: 'relative', display: 'inline-block', mb: 2 }}>
            <CircularProgress
              size={getSize()}
              thickness={4}
              sx={{
                color: 'primary.main',
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                color: 'primary.main',
              }}
            >
              <TrendingUpIcon sx={{ fontSize: getSize() * 0.4 }} />
            </Box>
          </Box>
          <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 500 }}>
            {message}
          </Typography>
        </Paper>
      </Fade>
    );
  }

  return (
    <Box sx={getContainerStyles()}>
      <Box sx={{ textAlign: 'center' }}>
        <Box sx={{ position: 'relative', display: 'inline-block', mb: 2 }}>
          <CircularProgress
            size={getSize()}
            thickness={4}
            sx={{
              color: 'primary.main',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              color: 'primary.main',
            }}
          >
            <TrendingUpIcon sx={{ fontSize: getSize() * 0.4 }} />
          </Box>
        </Box>
        {message && (
          <Typography 
            variant={size === 'large' ? 'h6' : 'body1'} 
            color="text.secondary"
            sx={{ fontWeight: 500 }}
          >
            {message}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default LoadingSpinner; 