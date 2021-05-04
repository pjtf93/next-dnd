import { configureStore } from '@reduxjs/toolkit';
import itemsReducer from '../features/itemSlice';

export default configureStore({
  reducer: {
    items: itemsReducer,
  },
});
