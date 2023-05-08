import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getArticlesApi } from "../app/slices/ArticleSlice";
import RecentStory from "../components/RecentStory";
import constData from "../utils/constants";
import TrendingCategory from "../components/TrendingCategory";
import moment from "moment";
import ArticleItem from "../components/ArticleItem";
import FeatureItem from "../components/FeatureItem";
import AppHeading from "../components/AppHeading";
import Loader from "../components/Loader";

const Home = () => {
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(true);
  const randomCategories = constData.topBlogCategories
    ? [...constData.topBlogCategories]
        .sort(() => 0.5 - Math.random())
        .slice(0, 6)
    : [];

  useEffect(() => {
    dispatch(getArticlesApi())
      .unwrap()
      .then((res) => {
        setArticles(res.user);
        setLoader(false);
      });
  }, [dispatch]);

  return (
    <div className="container mx-auto  max-w-7xl">
      {loader ? (
        <Loader />
      ) : (
        <div className="max-[1320px]:px-3">
          <div class="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-5 mt-16 max-[1320px]:mt-8 gap-24 md:gap-8 lg:gap-8">
            <div class="md:col-span-3 lg:col-span-3">
              <img
                onClick={() => navigate("/article/" + articles?.newest?.slug)}
                src={constData.getArticleThumbUrl(articles?.newest?.image)}
                class="object-cover h-auto rounded-3xl w-full cursor-pointer"
              />

              <div className="mt-5">
                <Link
                  to={"/category/" + articles?.newest?.category + ""}
                  class="text-md font-semibold text-blue-700 uppercase hover:text-blue-500 cursor-pointer"
                >
                  {articles?.newest?.category}
                </Link>
              </div>
              <div className="my-5">
                <Link
                  to={"/article/" + articles?.newest?.slug + ""}
                  className="text-4xl  max-[1024px]:text-3xl max-[420px]:text-2xl font-semibold hover:underline cursor-pointer"
                >
                  {articles?.newest?.title}
                </Link>
              </div>
              <p className="">{articles?.newest?.description}</p>

              <li class="flex py-4 first:pt-0 last:pb-0">
                <img
                  onClick={() =>
                    navigate("/author/" + articles?.newest?.userId.id, {
                      state: { author: articles?.newest?.userId },
                    })
                  }
                  class="h-10 w-10 rounded-lg cursor-pointer"
                  src={constData.getUserAvatar(articles?.newest?.userId.avatar)}
                  alt=""
                />
                <div class="ml-3 overflow-hidden">
                  <Link
                    to={"/author/" + articles?.newest?.userId.id + ""}
                    state={{ author: articles?.newest?.userId }}
                    class="text-sm  text-slate-800 hover:underline cursor-pointer font-semibold"
                  >
                    {articles?.newest?.userId.name}
                  </Link>
                  <p class="text-sm text-slate-500">
                    {moment(articles?.newest?.createdAt).format("MMM DD, YYYY")}
                  </p>
                </div>
              </li>
            </div>
            <div class="md:col-span-2 lg:col-span-2 ">
              <AppHeading title={"Recent stories"} />
              {articles?.recent?.map((article, index) => {
                return (
                  <RecentStory
                    navigate={navigate}
                    key={index}
                    article={article}
                  />
                );
              })}
            </div>
          </div>

          <div className="w-full mt-12">
            <AppHeading title={"Trending topics"} />
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {randomCategories.map((category, index) => {
                return <TrendingCategory category={category} />;
              })}
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-4 mt-16">
            <div class="md:col-span-2 lg:col-span-2">
              {articles?.all?.map((article, index) => {
                return (
                  <ArticleItem
                    navigate={navigate}
                    key={index}
                    article={article}
                  />
                );
              })}
            </div>
            <div
              style={{ height: "fit-content" }}
              class="bg-white border rounded-md  md:col-span-1 lg:col-span-1 p-8 py-6"
            >
              <AppHeading title={"Featured"} />
              {articles?.featured?.map((article, index) => {
                return (
                  <FeatureItem
                    navigate={navigate}
                    key={index}
                    article={article}
                  />
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
