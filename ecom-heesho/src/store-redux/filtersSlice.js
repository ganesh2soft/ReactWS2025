// src/store-redux/filtersSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchTerm: '',
  category: 'all',
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
  },
});

export const { setSearchTerm, setCategory } = filtersSlice.actions;
export default filtersSlice.reducer;
