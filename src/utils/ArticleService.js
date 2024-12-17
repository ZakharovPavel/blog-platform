import { createAsyncThunk } from '@reduxjs/toolkit';

const apiBase = 'https://blog-platform.kata.academy/api';

const fetchArticlesForThunk = async (page, { rejectWithValue }) => {
  try {
    const response = await fetch(`${apiBase}/articles?limit=5&offset=${page * 5 - 5}&page=${page}`, {
      method: 'GET',
      headers: {
        Authorization: `Token ${localStorage?.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error("Can't fetch articles");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    return rejectWithValue(error.message);
  }
};

const fetchArticles = createAsyncThunk('article/fetchArticles', async (page, { rejectWithValue }) => {
  return fetchArticlesForThunk(page, { rejectWithValue });
});

const fetchArticleForThunk = async (slug, { rejectWithValue }) => {
  try {
    const response = await fetch(`${apiBase}/articles/${slug}`, {
      method: 'GET',
      headers: {
        Authorization: `Token ${localStorage?.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error("Can't fetch article");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    return rejectWithValue(error.message);
  }
};

const fetchArticle = createAsyncThunk('article/fetchArticle', async (slug, { rejectWithValue }) => {
  return fetchArticleForThunk(slug, { rejectWithValue });
});

const createArticleForThunk = async (data, { rejectWithValue }) => {
  try {
    const { title, description, body, tagList, token } = data;
    const article = {
      article: {
        title,
        description,
        body,
        tagList,
        token,
      },
    };
    const response = await fetch(`${apiBase}/articles`, {
      method: 'POST',
      headers: {
        Authorization: `Token ${data.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(article),
    });
    if (!response.ok) {
      throw new Error("Can't create article");
    }
    const result = await response.json();

    return result;
  } catch (error) {
    return rejectWithValue(error.message);
  }
};

const createArticle = createAsyncThunk('article/createArticle', async (data, { rejectWithValue }) => {
  return createArticleForThunk(data, { rejectWithValue });
});

const updateArticleForThunk = async (data, { rejectWithValue }) => {
  try {
    const { title, description, body, tagList, token, slugValue } = data;
    const article = {
      article: {
        title,
        description,
        body,
        tagList,
        token,
      },
    };
    const response = await fetch(`${apiBase}/articles/${slugValue}`, {
      method: 'PUT',
      headers: {
        Authorization: `Token ${data.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(article),
    });

    if (!response.ok) {
      throw new Error("Can't update article");
    }

    const result = await response.json();

    return result;
  } catch (error) {
    return rejectWithValue(error.message);
  }
};

const updateArticle = createAsyncThunk('article/updateArticle', async (data, { rejectWithValue }) => {
  return updateArticleForThunk(data, { rejectWithValue });
});

const deleteArticleForThunk = async (data, { rejectWithValue }) => {
  try {
    const { token, slugValue } = data;
    const response = await fetch(`${apiBase}/articles/${slugValue}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error("Can't delete article");
    }

    const result = await response.json();

    return result;
  } catch (error) {
    return rejectWithValue(error.message);
  }
};

const deleteArticle = createAsyncThunk('article/deleteArticle', async (data, { rejectWithValue }) => {
  return deleteArticleForThunk(data, { rejectWithValue });
});

const favoriteArticleForThunk = async (data, { rejectWithValue }) => {
  try {
    const { token, slug } = data;
    const response = await fetch(`${apiBase}/articles/${slug}/favorite`, {
      method: 'POST',
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Can't favorite article");
    }
    const result = await response.json();

    return result;
  } catch (error) {
    return rejectWithValue(error.message);
  }
};

const favoriteArticle = createAsyncThunk('article/favoriteArticle', async (data, { rejectWithValue }) => {
  return favoriteArticleForThunk(data, { rejectWithValue });
});

const unfavoriteArticleForThunk = async (data, { rejectWithValue }) => {
  try {
    const { token, slug } = data;
    const response = await fetch(`${apiBase}/articles/${slug}/favorite`, {
      method: 'DELETE',
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Can't unfavorite article");
    }
    const result = await response.json();

    return result;
  } catch (error) {
    return rejectWithValue(error.message);
  }
};

const unfavoriteArticle = createAsyncThunk('article/unfavoriteArticle', async (data, { rejectWithValue }) => {
  return unfavoriteArticleForThunk(data, { rejectWithValue });
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

const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) {
    return text;
  }

  let truncatedText = text.slice(0, maxLength);
  const lastSpaceIndex = truncatedText.lastIndexOf(' ');

  if (lastSpaceIndex > -1) {
    truncatedText = truncatedText.slice(0, lastSpaceIndex);
  }

  return `${truncatedText}...`;
};

export {
  fetchArticles,
  fetchArticle,
  createArticle,
  updateArticle,
  deleteArticle,
  favoriteArticle,
  unfavoriteArticle,
  transformArticle,
  generateKey,
  truncateText,
};
