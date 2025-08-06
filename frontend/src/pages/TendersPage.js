import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Typography,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Pagination,
  CircularProgress,
  Card,
  CardContent,
  Chip,
  Stack,
  Container,
  InputAdornment,
  IconButton,
  Collapse,
  Slider,
  FormControlLabel,
  Checkbox,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Skeleton,
  Alert,
} from '@mui/material';
import {
  Search as SearchIcon,
  Clear as ClearIcon,
  FilterList as FilterIcon,
  ExpandMore as ExpandMoreIcon,
  AttachMoney as MoneyIcon,
  LocationOn as LocationIcon,
  Category as CategoryIcon,
  Schedule as ScheduleIcon,
} from '@mui/icons-material';

import { fetchTenders, setFilters, clearFilters, setPage } from '../store/slices/tendersSlice';
import TenderCard from '../components/tenders/TenderCard';

const TendersPage = () => {
  const dispatch = useDispatch();
  const { tenders, loading, pagination, filters, categories, countries } = useSelector((state) => state.tenders);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [budgetRange, setBudgetRange] = useState([0, 10000000]);

  useEffect(() => {
    dispatch(fetchTenders({ ...filters, page: pagination.page }));
  }, [dispatch, filters, pagination.page]);

  const handleSearchChange = (event) => {
    dispatch(setFilters({ search: event.target.value }));
  };

  const handleCountryChange = (event) => {
    dispatch(setFilters({ country: event.target.value }));
  };

  const handleCategoryChange = (event) => {
    dispatch(setFilters({ category: event.target.value }));
  };

  const handleStatusChange = (event) => {
    dispatch(setFilters({ status: event.target.value }));
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
  };

  const handlePageChange = (event, value) => {
    dispatch(setPage(value));
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
          Browse Opportunities
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Discover and filter through African government tenders and opportunities
        </Typography>
      </Box>

      {/* Search and Basic Filters */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Search tenders, organizations, or keywords"
                value={filters.search}
                onChange={handleSearchChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
                placeholder="e.g., software development, healthcare, infrastructure"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <FormControl fullWidth>
                <InputLabel>Country</InputLabel>
                <Select
                  value={filters.country}
                  label="Country"
                  onChange={handleCountryChange}
                >
                  <MenuItem value="">All Countries</MenuItem>
                  {countries.map((country) => (
                    <MenuItem key={country} value={country}>
                      {country}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  value={filters.category}
                  label="Category"
                  onChange={handleCategoryChange}
                >
                  <MenuItem value="">All Categories</MenuItem>
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <Stack direction="row" spacing={1}>
                <Button
                  variant={showAdvancedFilters ? "contained" : "outlined"}
                  startIcon={<FilterIcon />}
                  onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                  fullWidth
                >
                  Filters
                </Button>
                <IconButton
                  onClick={handleClearFilters}
                  color="primary"
                  title="Clear all filters"
                >
                  <ClearIcon />
                </IconButton>
              </Stack>
            </Grid>
          </Grid>

          {/* Advanced Filters */}
          <Collapse in={showAdvancedFilters}>
            <Box sx={{ mt: 3, pt: 3, borderTop: 1, borderColor: 'divider' }}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={3}>
                  <FormControl fullWidth>
                    <InputLabel>Status</InputLabel>
                    <Select
                      value={filters.status}
                      label="Status"
                      onChange={handleStatusChange}
                    >
                      <MenuItem value="">All Status</MenuItem>
                      <MenuItem value="Open">Open</MenuItem>
                      <MenuItem value="Closed">Closed</MenuItem>
                      <MenuItem value="Pending">Pending</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Typography variant="body2" gutterBottom>
                    Budget Range (USD)
                  </Typography>
                  <Slider
                    value={budgetRange}
                    onChange={(_, newValue) => setBudgetRange(newValue)}
                    valueLabelDisplay="auto"
                    min={0}
                    max={10000000}
                    step={100000}
                    valueLabelFormat={(value) => `$${(value / 1000000).toFixed(1)}M`}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Only urgent tenders"
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <FormControlLabel
                    control={<Checkbox />}
                    label="With budget specified"
                  />
                </Grid>
              </Grid>
            </Box>
          </Collapse>
        </CardContent>
      </Card>

      {/* Results Summary */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" color="text.secondary">
          {loading ? 'Loading...' : `${tenders.length} opportunities found`}
        </Typography>
        <Stack direction="row" spacing={1}>
          <Chip
            icon={<LocationIcon />}
            label={filters.country || 'All Countries'}
            variant="outlined"
            size="small"
          />
          <Chip
            icon={<CategoryIcon />}
            label={filters.category || 'All Categories'}
            variant="outlined"
            size="small"
          />
          {filters.search && (
            <Chip
              icon={<SearchIcon />}
              label={`"${filters.search}"`}
              variant="outlined"
              size="small"
              onDelete={() => dispatch(setFilters({ ...filters, search: '' }))}
            />
          )}
        </Stack>
      </Box>

      {/* Results */}
      {loading ? (
        <Grid container spacing={3}>
          {[...Array(6)].map((_, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardContent>
                  <Skeleton variant="text" width="80%" height={32} sx={{ mb: 1 }} />
                  <Skeleton variant="text" width="60%" height={24} sx={{ mb: 2 }} />
                  <Skeleton variant="text" width="100%" height={60} sx={{ mb: 2 }} />
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Skeleton variant="rectangular" width={80} height={24} />
                    <Skeleton variant="rectangular" width={100} height={24} />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : tenders.length === 0 ? (
        <Card>
          <CardContent sx={{ textAlign: 'center', py: 8 }}>
            <SearchIcon sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h5" color="text.secondary" gutterBottom>
              No opportunities found
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Try adjusting your search criteria or filters
            </Typography>
            <Button
              variant="outlined"
              onClick={handleClearFilters}
              startIcon={<ClearIcon />}
            >
              Clear All Filters
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          <Grid container spacing={3}>
            {tenders.map((tender) => (
              <Grid item xs={12} sm={6} md={4} key={tender._id}>
                <TenderCard tender={tender} />
              </Grid>
            ))}
          </Grid>

          {/* Pagination */}
          {pagination.pages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Pagination
                count={pagination.pages}
                page={pagination.page}
                onChange={handlePageChange}
                color="primary"
                size="large"
              />
            </Box>
          )}
        </>
      )}
    </Container>
  );
};

export default TendersPage; 