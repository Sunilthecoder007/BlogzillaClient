import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "../services/Messages";
import ArticleService from "../services/ArticleService";

export const postArticleApi = createAsyncThunk(
  "auth/postArticleApi",
  async (params, thunkAPI) => {
    try {
      const data = await ArticleService.postArticle(params);
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
export const getArticlesApi = createAsyncThunk(
  "auth/getArticlesApi",
  async (params, thunkAPI) => {
    try {
      const data = await ArticleService.getArticles(params);
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
export const getSingleArticleApi = createAsyncThunk(
  "auth/getSingleArticleApi",
  async (params, thunkAPI) => {
    try {
      const data = await ArticleService.getSingleArticle(params);
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

export const editArticleApi = createAsyncThunk(
  "auth/editArticleApi",
  async (params, thunkAPI) => {
    try {
      const data = await ArticleService.editArticle(params);
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

export const deleteArticleApi = createAsyncThunk(
  "auth/deleteArticleApi",
  async (params, thunkAPI) => {
    try {
      const data = await ArticleService.deleteArticle(params);
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

export const getCategoryArticleApi = createAsyncThunk(
  "auth/getSingleArticleApi",
  async (params, thunkAPI) => {
    try {
      const data = await ArticleService.getCategoryArticle(params);
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

export const searchArticlesApi = createAsyncThunk(
  "auth/searchArticlesApi",
  async (params, thunkAPI) => {
    try {
      const data = await ArticleService.searchArticles(params);
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

const initialState = {
  article: null,
  articles: [],
};

const articleSlice = createSlice({
  name: "article",
  initialState,
  extraReducers: {
    [postArticleApi.fulfilled]: (state, action) => {
      if (action.payload.user) {
        state.article = action.payload.user.user;
      }
    },
    [getArticlesApi.fulfilled]: (state, action) => {
      if (action.payload.user) {
        if ("all" in action.payload.user) {
        } else {
          state.articles = action.payload.user;
        }
      }
    },
  },
});
const { reducer } = articleSlice;
export default reducer;
