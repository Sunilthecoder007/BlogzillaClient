import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "../services/Messages";
import AuthService from "../services/AuthService";
export const loginApi = createAsyncThunk(
  "auth/loginApi",
  async (params, thunkAPI) => {
    try {
      const data = await AuthService.login(params);
      return { user: data };
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (email, thunkAPI) => {
    try {
      const data = await AuthService.forgotPassword(email);
      return { response: data };
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (params, thunkAPI) => {
    try {
      const data = await AuthService.resetPassword(params);
      return { response: data };
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const SignUpApi = createAsyncThunk(
  "auth/SignUpApi",
  async (params, thunkAPI) => {
    try {
      const data = await AuthService.signUp(params);
      return { data };
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const logoutApi = createAsyncThunk(
  "auth/logoutApi",
  async (params, thunkAPI) => {
    try {
      const data = await AuthService.logout(params);
      return { data };
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const UpdateUserApi = createAsyncThunk(
  "auth/UpdateUserApi",
  async (params, thunkAPI) => {
    try {
      const data = await AuthService.updateUser(params);
      console.log(data);
      return { data };
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const initialState = {
  isLoggedIn: false,
  tokens: null,
  user: null,
  response: null,
  isGoogleExist: null,
  isFacebookExist: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: {
    [loginApi.fulfilled]: (state, action) => {
      if (action.payload.user) {
        state.isLoggedIn = true;
        state.user = action.payload.user.user;
        state.tokens = action.payload.user.tokens;
        localStorage.setItem("userLoginTime", new Date().getTime());
        localStorage.setItem(
          "tokens",
          JSON.stringify(action.payload.user.tokens)
        );
      }
    },
    [loginApi.rejected]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
      state.message = action.payload;
    },

    [UpdateUserApi.fulfilled]: (state, action) => {
      if (action.payload.data) {
        console.log(action.payload.data.data);
        state.user = action.payload.data.data;
      }
    },
    [SignUpApi.fulfilled]: (state, action) => {
      if (action.payload.data) {
        state.isLoggedIn = true;
        state.user = action.payload.data.user;
        state.tokens = action.payload.data.tokens;
        localStorage.setItem("userLoginTime", new Date().getTime());
      }
    },
    [SignUpApi.rejected]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
      state.message = action.payload;
    },
    [forgotPassword.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
      state.response = action.payload.response;
    },
    [logoutApi.fulfilled]: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});
const { reducer } = authSlice;
export default reducer;
