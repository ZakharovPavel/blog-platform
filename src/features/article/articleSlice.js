import { createSlice } from '@reduxjs/toolkit';
import {
  createArticle,
  deleteArticle,
  favoriteArticle,
  fetchArticle,
  fetchArticles,
  unfavoriteArticle,
  updateArticle,
} from '../../utils/ArticleService';

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
    articleFormMode: null,
    isEdit: false,
    status: null,
    error: null,
    articleErrorMessage: '',
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setArticleFormMode: (state, action) => {
      state.articleFormMode = action.payload;
    },
    setIsEdit: (state, action) => {
      state.isEdit = action.payload;
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
        state.status = 'error';
        state.articleErrorMessage = action.payload;
      })

      .addCase(fetchArticle.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchArticle.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.article = action.payload.article;
      })
      .addCase(fetchArticle.rejected, (state, action) => {
        state.status = 'error';
        state.articleErrorMessage = action.payload;
      })

      .addCase(createArticle.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createArticle.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.article = action.payload.article;
        state.articles.unshift(action.payload.article);
        if (state.articles.length > 1) {
          state.articles.pop();
        }
      })
      .addCase(createArticle.rejected, (state, action) => {
        state.status = 'error';
        state.articleErrorMessage = action.payload;
      })

      .addCase(updateArticle.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateArticle.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.article = action.payload.article;
        state.isEdit = false;
        state.articles = state.articles.map((article) =>
          article.slug === action.payload.article.slug ? action.payload.article : article
        );
      })
      .addCase(updateArticle.rejected, (state, action) => {
        state.status = 'error';
        state.articleErrorMessage = action.payload;
      })

      .addCase(deleteArticle.pending, () => {})
      .addCase(deleteArticle.fulfilled, () => {})
      .addCase(deleteArticle.rejected, (state, action) => {
        state.status = 'error';
        state.articleErrorMessage = action.payload;
      })

      .addCase(favoriteArticle.pending, () => {})
      .addCase(favoriteArticle.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.article = action.payload.article;
        state.articles = state.articles.map((article) =>
          article.slug === action.payload.article.slug ? action.payload.article : article
        );
      })
      .addCase(favoriteArticle.rejected, (state, action) => {
        state.status = 'error';
        state.articleErrorMessage = action.payload;
      })

      .addCase(unfavoriteArticle.pending, () => {})
      .addCase(unfavoriteArticle.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.article = action.payload.article;
        state.articles = state.articles.map((article) =>
          article.slug === action.payload.article.slug ? action.payload.article : article
        );
      })
      .addCase(unfavoriteArticle.rejected, (state, action) => {
        state.status = 'error';
        state.articleErrorMessage = action.payload;
      });
  },
});

export const { setCurrentPage, setArticleFormMode, setIsEdit } = articleSlice.actions;

export default articleSlice.reducer;
