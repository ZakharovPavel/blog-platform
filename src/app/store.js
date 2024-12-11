import { configureStore } from '@reduxjs/toolkit';
import articleReducer from '../features/article/articleSlice';
import accountReducer from '../features/account/accountSlice';

export const store = configureStore({
  reducer: {
    article: articleReducer,
    account: accountReducer,
  },
});
