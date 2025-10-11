import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import authReducer from './authSlice';
import filtersReducer from './filtersSlice';
 const store = configureStore({
  reducer: {
  cart: cartReducer,
  auth: authReducer,
  filters: filtersReducer,
  },
});

export default store;