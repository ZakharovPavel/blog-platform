import { createSlice } from '@reduxjs/toolkit';
import { createAccount, editProfile, getUser, loginAccount } from '../../utils/AccountService';

export const accountSlice = createSlice({
  name: 'account',
  initialState: {
    value: null,
    currentUser: null,
    token: null,
    isLoggedIn: localStorage.getItem('token'),
    status: null,
    error: null,
    accountErrorMessage: null,
    createError: false,
    isAccountCreated: false,
  },
  reducers: {
    setCurrentUser: (state) => {
      state.currentUser = localStorage.key(0);
    },
    setUserToken: (state) => {
      state.token = localStorage.key(0);
    },
    handleLogOut: (state) => {
      state.isLoggedIn = false;
      state.currentUser = null;
      localStorage.clear();
    },
    setIsAccountCreated: (state, action) => {
      state.isAccountCreated = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createAccount.pending, (state) => {
        state.status = 'loading';
        state.accountErrorMessage = '';
      })
      .addCase(createAccount.fulfilled, (state) => {
        state.status = 'resolved';
        state.isAccountCreated = true;
      })
      .addCase(createAccount.rejected, (state) => {
        state.status = 'error';
        state.accountErrorMessage = 'createAccount error';
      })

      .addCase(loginAccount.pending, (state) => {
        state.status = 'loading';
        state.accountErrorMessage = '';
      })
      .addCase(loginAccount.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.isLoggedIn = true;
        state.currentUser = action.payload.user;

        localStorage.setItem('token', action.payload.user.token);

        state.token = action.payload.user.token;
      })
      .addCase(loginAccount.rejected, (state) => {
        state.status = 'error';
        state.accountErrorMessage = 'loginAccount error';
      })

      .addCase(getUser.pending, (state) => {
        state.status = 'loading';
        state.accountErrorMessage = '';
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.isLoggedIn = true;
        state.currentUser = action.payload.user;
        state.token = action.payload.user.token;
      })
      .addCase(getUser.rejected, (state) => {
        state.status = 'error';
        state.accountErrorMessage = 'getUser error';
      })

      .addCase(editProfile.pending, (state) => {
        state.status = 'loading';
        state.accountErrorMessage = '';
      })
      .addCase(editProfile.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.currentUser = action.payload.user;
      })
      .addCase(editProfile.rejected, (state) => {
        state.status = 'error';
        state.accountErrorMessage = 'editProfile error';
      });
  },
});

export const { setCurrentUser, setUserToken, handleLogOut, setIsAccountCreated } = accountSlice.actions;

export default accountSlice.reducer;
