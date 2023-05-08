import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppHeading from "../components/AppHeading";
import ArticleItem from "../components/ArticleItem";
import { useDispatch } from "react-redux";
import { searchArticlesApi } from "../app/slices/ArticleSlice";
import Loader from "../components/Loader";

const Search = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [articles, setArticles] = useState();
  const searchArticles = (query) => {
    if (query == "") {
      setLoader(false);
      setArticles([]);
    } else {
      setLoader(true);
      dispatch(searchArticlesApi({ query: query }))
        .unwrap()
        .then((res) => {
          setArticles(res.user);
          setLoader(false);
        });
    }
  };
  return (
    <>
      <div className="w-full bg-gray-100 py-16 max-[640px]:py-8">
        <div className="container max-w-7xl mx-auto flex">
          <div className="mb-4 text-center  w-1/3 mx-auto max-[640px]:w-full  max-[640px]:mx-12">
            <h2 className=" text-4xl text-center max-[640px]:text-2xl">
              Search Articles
            </h2>
            <p className="mt-2 text-gray-500">Find what you're looking for</p>
            <input
              onChange={(e) => {
                searchArticles(e.target.value);
              }}
              className="mt-8 border-2 rounded-full w-full h-12 px-8"
              placeholder="Search for articles..."
            />
          </div>
        </div>
      </div>

      {loader ? (
        <Loader />
      ) : (
        <div className="container max-w-7xl mt-8 mx-auto">
          {articles?.length > 0 ? (
            <div className="max-[640px]:mx-4">
              <AppHeading title={"Search results"} />
              <div class="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-4">
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
              </div>
            </div>
          ) : (
            <div className="bg-gray-100 border py-2 px-5 w-fit rounded-md text-gray-600 mx-auto mt-24 text-md">
              <strong className="text-gray-900">Info:</strong> No Search results
              found
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Search;
