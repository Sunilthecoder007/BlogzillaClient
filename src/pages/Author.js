import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import constData from "../utils/constants";
import AppHeading from "../components/AppHeading";
import FeatureItem from "../components/FeatureItem";
import ArticleItem from "../components/ArticleItem";
import { useDispatch } from "react-redux";
import { getArticlesApi } from "../app/slices/ArticleSlice";
import Loader from "../components/Loader";

const Author = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(true);
  const [articles, setArticles] = useState();
  const { state } = useLocation();
  const { author } = state;
  useEffect(() => {
    setLoader(true);
    dispatch(getArticlesApi(author?.id))
      .unwrap()
      .then((res) => {
        setArticles(res.user);
        setLoader(false);
      });
  }, [dispatch, author?.id]);
  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <>
          <div className="w-full bg-gray-100 py-16 max-[640px]:py-8">
            <div className="container max-w-7xl mx-auto flex">
              <img
                src={constData.getUserAvatar(author?.avatar)}
                className="w-24 h-24 max-[640px]:w-20 max-[640px]:h-20 max-[640px]:ml-4 rounded-full object-fill"
              />
              <div className="ml-5 my-auto">
                <div className="text-blue-700 text-sm">RECENT IN</div>
                <div className="mt-1 text-3xl font-bold text-gray-800">
                  {author?.name}
                </div>
              </div>
            </div>
          </div>
          <div className="max-[640px]:mx-4">
            <div className="container max-w-7xl mt-8 mx-auto">
              {articles?.length > 0 ? (
                <div class="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-4">
                  <div class="md:col-span-2 lg:col-span-2">
                    {articles?.map((article, index) => {
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
                    class="bg-white border rounded-md  md:col-span-1 lg:col-span-1 p-8"
                  >
                    <AppHeading title={"Most read in " + author.name} />
                    {articles
                      ?.slice(0, 4)
                      .sort((a, b) => 0.5 - Math.random())
                      .map((article, index) => {
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
              ) : (
                <div className="bg-gray-100 border py-2 px-5 w-fit rounded-md text-gray-600 mx-auto mt-24 text-sm">
                  <strong className="text-gray-900">Info:</strong> No articles
                  found for this category!
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Author;
