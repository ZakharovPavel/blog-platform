import { createSlice } from '@reduxjs/toolkit';
import { fetchArticle, fetchArticles } from '../../utils/ArticleService';

export const articleSlice = createSlice({
  name: 'article',
  initialState: {
    value: 0,
    articles: [],
    article: null,
    articlesCount: 0,
    currentPage: 1,
    fetchOffset: 0,
    pageSize: 5,
    status: null,
    error: null,
    errorMessage: '',
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.articles = action.payload.articles;
        state.articlesCount = action.payload.articlesCount;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.errorMessage = action.payload;
      })
      .addCase(fetchArticle.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchArticle.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.article = action.payload.article;
      })
      .addCase(fetchArticle.rejected, (state, action) => {
        state.errorMessage = action.payload;
      });
  },
});

export const { setCurrentPage } = articleSlice.actions;

export default articleSlice.reducer;
