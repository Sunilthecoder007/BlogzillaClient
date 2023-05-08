import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import constData from "../utils/constants";
import AppHeading from "../components/AppHeading";
import FeatureItem from "../components/FeatureItem";
import ArticleItem from "../components/ArticleItem";
import { useDispatch, useSelector } from "react-redux";
import { getCategoryArticleApi } from "../app/slices/ArticleSlice";
import Loader from "../components/Loader";

const Category = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(true);
  const [articles, setArticles] = useState();
  const params = useParams();
  const category = constData.topBlogCategories.find(
    (o) => o.key === params.category
  );
  useEffect(() => {
    setLoader(true);
    dispatch(getCategoryArticleApi(category.key))
      .unwrap()
      .then((res) => {
        setArticles(res.user);
        setLoader(false);
      });
  }, [dispatch, category.key]);
  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <>
          <div className="w-full bg-gray-100 py-16 max-[640px]:py-8">
            <div className="container max-w-7xl mx-auto flex">
              <img
                src={category.img}
                className="w-56 h-auto max-[640px]:w-24 max-[640px]:ml-4 rounded-xl object-fill"
              />
              <div className="ml-5 my-auto">
                <div className="text-blue-700 text-sm">RECENT IN</div>
                <div className="mt-3 text-5xl max-[640px]:text-3xl max-[640px]:mt-1 font-bold text-gray-800">
                  {category.name}
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
                    <AppHeading title={"Most read in " + category.name} />
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

export default Category;
