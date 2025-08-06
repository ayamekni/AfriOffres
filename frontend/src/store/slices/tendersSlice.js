import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunks
export const fetchTenders = createAsyncThunk(
  'tenders/fetchTenders',
  async (params = {}, { rejectWithValue }) => {
    try {
      const queryParams = new URLSearchParams();
      
      if (params.page) queryParams.append('page', params.page);
      if (params.limit) queryParams.append('limit', params.limit);
      if (params.search) queryParams.append('search', params.search);
      if (params.country) queryParams.append('country', params.country);
      if (params.category) queryParams.append('category', params.category);
      if (params.status) queryParams.append('status', params.status);
      
      const response = await axios.get(`/api/tenders?${queryParams}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Failed to fetch tenders');
    }
  }
);

export const fetchTenderById = createAsyncThunk(
  'tenders/fetchTenderById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/tenders/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Failed to fetch tender');
    }
  }
);

export const fetchCategories = createAsyncThunk(
  'tenders/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/tenders/categories');
      return response.data.categories;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Failed to fetch categories');
    }
  }
);

export const fetchCountries = createAsyncThunk(
  'tenders/fetchCountries',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/tenders/countries');
      return response.data.countries;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Failed to fetch countries');
    }
  }
);

export const fetchRecommendations = createAsyncThunk(
  'tenders/fetchRecommendations',
  async (_, { rejectWithValue, getState }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }
      
      const response = await axios.get('/api/user/recommendations', {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data.recommendations;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Failed to fetch recommendations');
    }
  }
);

const initialState = {
  tenders: [],
  selectedTender: null,
  categories: [],
  countries: [],
  recommendations: [],
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    pages: 0,
  },
  filters: {
    search: '',
    country: '',
    category: '',
    status: '',
  },
  loading: false,
  error: null,
};

const tendersSlice = createSlice({
  name: 'tenders',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      state.pagination.page = 1; // Reset to first page when filters change
    },
    clearFilters: (state) => {
      state.filters = {
        search: '',
        country: '',
        category: '',
        status: '',
      };
      state.pagination.page = 1;
    },
    setPage: (state, action) => {
      state.pagination.page = action.payload;
    },
    clearSelectedTender: (state) => {
      state.selectedTender = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Tenders
      .addCase(fetchTenders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTenders.fulfilled, (state, action) => {
        state.loading = false;
        state.tenders = action.payload.tenders;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchTenders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Tender by ID
      .addCase(fetchTenderById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTenderById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedTender = action.payload;
      })
      .addCase(fetchTenderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Categories
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.error = action.payload;
      })
      // Fetch Countries
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.countries = action.payload;
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        state.error = action.payload;
      })
      // Fetch Recommendations
      .addCase(fetchRecommendations.fulfilled, (state, action) => {
        state.recommendations = action.payload;
      })
      .addCase(fetchRecommendations.rejected, (state, action) => {
        // Don't set error for recommendations as they're optional
        state.recommendations = [];
      });
  },
});

export const {
  setFilters,
  clearFilters,
  setPage,
  clearSelectedTender,
  clearError,
} = tendersSlice.actions;

export default tendersSlice.reducer; 