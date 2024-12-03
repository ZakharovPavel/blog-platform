import { createAsyncThunk } from '@reduxjs/toolkit';

const apiBase = 'https://blog-platform.kata.academy/api';

const fetchArticles = createAsyncThunk('article/fetchArticles', async (page) => {
    try {
    const response = await fetch(`${apiBase}/articles?limit=5&offset=${page * 5 - 5}&page=${page}`);
    if (!response.ok) {
      throw new Error('Нет запроса');
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
});

const fetchArticle = createAsyncThunk('article/fetchArticle', async (slug) => {
  try {
  const response = await fetch(`${apiBase}/articles/${slug}`);
  if (!response.ok) {
    throw new Error('Нет запроса');
  }
  const result = await response.json();
  return result;
} catch (error) {
  console.error(error);
}
});

const transformArticle = (article, id) => {
  return {
    slug: article.slug,
    title: article.title,
    description: article.description,
    body: article.body,
    tagList: article.tagList,
    createdAt: article.createdAt,
    updatedAt: article.updatedAt,
    favorited: article.favorited,
    favoritesCount: article.favoritesCount,
    authorBio: article.author.bio,
    authorImage: article.author.image,
    authorUsername: article.author.username,
    authorFollowing: article.author.following,
    id: id,
  };
};

function generateKey(prefix) {
  return `${prefix}_${Math.floor(100000 + Math.random() * 900000)}`;
}

export { fetchArticles, fetchArticle, transformArticle, generateKey };