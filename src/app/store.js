import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import authReducer from "./slices/AuthSlice";
import articleReducer from "./slices/ArticleSlice";
const persistConfig = {
  key: "root",
  storage,
  blacklist: ["auth"],
};

const authConfig = {
  key: "auth",
  storage,
  blacklist: ["isGoogleExist"],
  whitelist: ["user", "isLoggedIn"],
};

const reducer = {
  auth: persistReducer(authConfig, authReducer),
  article: persistReducer(authConfig, articleReducer),
};
const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({ ...reducer })
);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
});
export const persistor = persistStore(store);
