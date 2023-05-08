import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import Protected from "../utils/Protected";
import { useSelector } from "react-redux";
import ArticleDetail from "../pages/ArticleDetail";
import Category from "../pages/Category";
import Author from "../pages/Author";
import Search from "../pages/Search";
import Admin from "../layouts/Admin";
import Page404 from "../pages/Page404";
const AppRoutes = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  return (
    <>
      <Routes>
        <Route element={<Protected isLoggedIn={isLoggedIn ? false : true} />}>
          <Route path="/create-account" exact element={<Signup />} />
          <Route path="/login" exact element={<Login />} />
        </Route>
        <Route element={<Protected isLoggedIn={isLoggedIn} />}>
          <Route path="/admin" exact element={<Admin />} />
        </Route>
        <Route path="/" exact element={<Home />} />
        <Route path="/article/:slug" exact element={<ArticleDetail />} />
        <Route path="/category/:category" exact element={<Category />} />
        <Route path="/author/:authorId" exact element={<Author />} />
        <Route path="/search" exact element={<Search />} />
        <Route path="/*" exact element={<Page404 />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
