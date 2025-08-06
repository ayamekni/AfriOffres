import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Avatar,
  Switch,
  FormControlLabel,
  Chip,
  Divider,
  Container,
  Stack,
  Alert,
  IconButton,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Autocomplete,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Business as BusinessIcon,
  LocationOn as LocationIcon,
  Notifications as NotificationsIcon,
  Security as SecurityIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  Settings as SettingsIcon,
  Bookmark as BookmarkIcon,
  TrendingUp as TrendingUpIcon,
} from '@mui/icons-material';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    preferences: {
      categories: [],
      countries: [],
    },
    notifications_enabled: true,
  });
  const [openPreferencesDialog, setOpenPreferencesDialog] = useState(false);

  const availableCategories = [
    'Technology', 'Infrastructure', 'Healthcare', 'Agriculture', 
    'Education', 'Energy', 'Finance', 'Transportation', 'Environment'
  ];

  const availableCountries = [
    'Nigeria', 'Kenya', 'Ghana', 'South Africa', 'Ethiopia', 
    'Uganda', 'Tanzania', 'Morocco', 'Egypt', 'Algeria'
  ];

  useEffect(() => {
    if (user) {
      setFormData({
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        email: user.email || '',
        preferences: user.preferences || { categories: [], countries: [] },
        notifications_enabled: user.notifications_enabled !== false,
      });
    }
  }, [user]);

  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleSave = () => {
    // Here you would dispatch an action to update the profile
    console.log('Saving profile:', formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      first_name: user.first_name || '',
      last_name: user.last_name || '',
      email: user.email || '',
      preferences: user.preferences || { categories: [], countries: [] },
      notifications_enabled: user.notifications_enabled !== false,
    });
    setIsEditing(false);
  };

  const getInitials = (firstName, lastName) => {
    return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase();
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
          Profile Settings
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Manage your account information and preferences
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* Main Profile Section */}
        <Grid item xs={12} lg={8}>
          <Stack spacing={3}>
            {/* Personal Information */}
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h5" component="h2" sx={{ fontWeight: 600 }}>
                    Personal Information
                  </Typography>
                  <IconButton 
                    onClick={() => setIsEditing(!isEditing)} 
                    color="primary"
                    disabled={loading}
                  >
                    {isEditing ? <CancelIcon /> : <EditIcon />}
                  </IconButton>
                </Box>

                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="First Name"
                      value={formData.first_name}
                      onChange={(e) => handleInputChange('first_name', e.target.value)}
                      disabled={!isEditing}
                      sx={{ mb: 2 }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Last Name"
                      value={formData.last_name}
                      onChange={(e) => handleInputChange('last_name', e.target.value)}
                      disabled={!isEditing}
                      sx={{ mb: 2 }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      disabled={!isEditing}
                      sx={{ mb: 2 }}
                    />
                  </Grid>
                </Grid>

                {isEditing && (
                  <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
                    <Button
                      variant="contained"
                      startIcon={<SaveIcon />}
                      onClick={handleSave}
                      disabled={loading}
                    >
                      Save Changes
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={handleCancel}
                      disabled={loading}
                    >
                      Cancel
                    </Button>
                  </Box>
                )}
              </CardContent>
            </Card>

            {/* Preferences */}
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h5" component="h2" sx={{ fontWeight: 600 }}>
                    Job Preferences
                  </Typography>
                  <Button
                    variant="outlined"
                    startIcon={<AddIcon />}
                    onClick={() => setOpenPreferencesDialog(true)}
                  >
                    Edit Preferences
                  </Button>
                </Box>

                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                      Preferred Categories
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                      {formData.preferences.categories.length > 0 ? (
                        formData.preferences.categories.map((category, index) => (
                          <Chip
                            key={index}
                            label={category}
                            color="primary"
                            variant="outlined"
                            onDelete={isEditing ? () => {
                              const newCategories = formData.preferences.categories.filter((_, i) => i !== index);
                              handleInputChange('preferences.categories', newCategories);
                            } : undefined}
                          />
                        ))
                      ) : (
                        <Typography variant="body2" color="text.secondary">
                          No categories selected
                        </Typography>
                      )}
                    </Box>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                      Preferred Countries
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {formData.preferences.countries.length > 0 ? (
                        formData.preferences.countries.map((country, index) => (
                          <Chip
                            key={index}
                            label={country}
                            color="secondary"
                            variant="outlined"
                            onDelete={isEditing ? () => {
                              const newCountries = formData.preferences.countries.filter((_, i) => i !== index);
                              handleInputChange('preferences.countries', newCountries);
                            } : undefined}
                          />
                        ))
                      ) : (
                        <Typography variant="body2" color="text.secondary">
                          No countries selected
                        </Typography>
                      )}
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            {/* Notification Settings */}
            <Card>
              <CardContent>
                <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
                  Notification Settings
                </Typography>
                
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <NotificationsIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Email Notifications"
                      secondary="Receive notifications about new opportunities matching your preferences"
                    />
                    <ListItemSecondaryAction>
                      <Switch
                        edge="end"
                        checked={formData.notifications_enabled}
                        onChange={(e) => handleInputChange('notifications_enabled', e.target.checked)}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Stack>
        </Grid>

        {/* Sidebar */}
        <Grid item xs={12} lg={4}>
          <Stack spacing={3}>
            {/* Profile Summary */}
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Avatar
                  sx={{
                    width: 100,
                    height: 100,
                    mx: 'auto',
                    mb: 2,
                    bgcolor: 'primary.main',
                    fontSize: '2rem',
                  }}
                >
                  {getInitials(formData.first_name, formData.last_name)}
                </Avatar>
                <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
                  {formData.first_name} {formData.last_name}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {formData.email}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Member since {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'Recently'}
                </Typography>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardContent>
                <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
                  Your Activity
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemIcon>
                      <BookmarkIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Bookmarked Tenders" secondary="3" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <TrendingUpIcon color="success" />
                    </ListItemIcon>
                    <ListItemText primary="Applications" secondary="2 this month" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <SearchIcon color="info" />
                    </ListItemIcon>
                    <ListItemText primary="Tenders Viewed" secondary="15" />
                  </ListItem>
                </List>
              </CardContent>
            </Card>

            {/* Account Actions */}
            <Card>
              <CardContent>
                <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
                  Account Actions
                </Typography>
                <Stack spacing={2}>
                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<SecurityIcon />}
                  >
                    Change Password
                  </Button>
                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<SettingsIcon />}
                  >
                    Privacy Settings
                  </Button>
                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<DeleteIcon />}
                    color="error"
                  >
                    Delete Account
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Grid>
      </Grid>

      {/* Preferences Dialog */}
      <Dialog
        open={openPreferencesDialog}
        onClose={() => setOpenPreferencesDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Edit Preferences
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <Autocomplete
                multiple
                options={availableCategories}
                value={formData.preferences.categories}
                onChange={(_, newValue) => handleInputChange('preferences.categories', newValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Preferred Categories"
                    placeholder="Select categories"
                  />
                )}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      label={option}
                      {...getTagProps({ index })}
                      color="primary"
                      variant="outlined"
                    />
                  ))
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Autocomplete
                multiple
                options={availableCountries}
                value={formData.preferences.countries}
                onChange={(_, newValue) => handleInputChange('preferences.countries', newValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Preferred Countries"
                    placeholder="Select countries"
                  />
                )}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      label={option}
                      {...getTagProps({ index })}
                      color="secondary"
                      variant="outlined"
                    />
                  ))
                }
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPreferencesDialog(false)}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              handleSave();
              setOpenPreferencesDialog(false);
            }}
          >
            Save Preferences
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ProfilePage; 