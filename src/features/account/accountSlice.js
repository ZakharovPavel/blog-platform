import { createSlice } from '@reduxjs/toolkit';
import { createAccount, editProfile, getUser, loginAccount } from '../../utils/AccountService';

export const accountSlice = createSlice({
  name: 'account',
  initialState: {
    value: null,
    // currentUser: null,
    currentUser: null,
    token: null,
    isLoggedIn: localStorage.length > 0,
    // isLoggedIn: true,
    status: null,
    error: null,
    accountErrorMessage: '',
    createError: false,
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(createAccount.pending, (state) => {
        state.status = 'loading';
        state.accountErrorMessage = '';
      })
      .addCase(createAccount.fulfilled, (state, action) => {
        state.status = 'resolved';
        // state.currentUser = action.payload.user;

        console.log(`create payload: ${action.payload}`);
      })
      .addCase(createAccount.rejected, (state) => {
        // state.errorMessage = action.payload;
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

        localStorage.setItem(action.payload.user.username, action.payload.user.token);

        state.token = action.payload.user.token;

        console.log(`login payload: ${action.payload}`);
        console.log(action.payload);
        console.log(state.currentUser);
      })
      .addCase(loginAccount.rejected, (state) => {
        // state.errorMessage = action.payload;
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

        console.log(`get user payload: ${action.payload}`);
        console.log(action.payload);
        console.log(state.currentUser);
      })
      .addCase(getUser.rejected, (state) => {
        // state.errorMessage = action.payload;
        state.accountErrorMessage = 'getUser error';
      })

      .addCase(editProfile.pending, (state) => {
        state.status = 'loading';
        state.accountErrorMessage = '';
      })
      .addCase(editProfile.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.currentUser = action.payload.user;

        console.log(`edit payload: ${action.payload}`);
        console.log(action.payload);
      })
      .addCase(editProfile.rejected, (state) => {
        // state.errorMessage = action.payload;
        state.accountErrorMessage = 'editProfile error';
      });
  },
});

export const { setCurrentUser, setUserToken, handleLogOut } = accountSlice.actions;

export default accountSlice.reducer;
