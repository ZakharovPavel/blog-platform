import { createAsyncThunk } from '@reduxjs/toolkit';

const apiBase = 'https://blog-platform.kata.academy/api';

const createAccountForThunk = async (data, { rejectWithValue }) => {
  try {
    const {username, email, password} = data;
    const newUser = {
      user: {
        username,
        email,
        password,
      }
    }
    const response = await fetch(`${apiBase}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    });
    if (!response.ok) {
      throw new Error("Can't create new user");
    }
    const result = await response.json();

    console.log(result);
    
    return result;
  } catch (error) {
    console.error(error);
    return rejectWithValue(error.message);
  }
};

const createAccount = createAsyncThunk('account/createAccount', async (data, { rejectWithValue }) => {
  return createAccountForThunk(data, { rejectWithValue });
});

const loginAccountForThunk = async (data, { rejectWithValue }) => {
  try {
    const { email, password } = data;
    const loginUser = {
      user: {
        email,
        password,
      }
    }
    const response = await fetch(`${apiBase}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginUser),
    });
    if (!response.ok) {
      throw new Error("Can't login");
    }
    const result = await response.json();
    
    console.log(result);
    
    return result;
  } catch (error) {
    // console.error(error);
    return rejectWithValue(error.message);
  }
};

const loginAccount = createAsyncThunk('account/loginAccount', async (data, { rejectWithValue }) => {
  return loginAccountForThunk(data, { rejectWithValue });
});

const editProfileForThunk = async (data, { rejectWithValue }) => {
  try {
    const { email, username, avatar, token } = data;
    const editUser = {
      user: {
        email,
        // token: localStorage.getItem(localStorage.key(0)),
        token,
        username,
        bio: "I work at State Farm.",
        image: avatar,
      }
    }
    const response = await fetch(`${apiBase}/user`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${data.token}`,
      },
      body: JSON.stringify(editUser),
    });
    if (!response.ok) {
      throw new Error("Can't edit profile");
    }
    const result = await response.json();

    console.log(result);

    return result;
  } catch (error) {
    // console.error(error);
    return rejectWithValue(error.message);
  }
};

const editProfile = createAsyncThunk('account/editProfile', async (data, { rejectWithValue }) => {
  return editProfileForThunk(data, { rejectWithValue });
});

const getUserForThunk = async (_, { rejectWithValue }) => {
  try {
    const response = await fetch(`${apiBase}/user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${localStorage.getItem(localStorage.key(0))}`,
      },
    });
    if (!response.ok) {
      throw new Error("Can't get user");
    }
    const result = await response.json();

    console.log(result);

    return result;
  } catch (error) {
    // console.error(error);
    return rejectWithValue(error.message);
  }
};

const getUser = createAsyncThunk('account/getUser', async (data, { rejectWithValue }) => {
  return getUserForThunk(data, { rejectWithValue });
});

export { createAccount, loginAccount, getUser, editProfile };
