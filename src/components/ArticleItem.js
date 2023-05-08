import React from "react";
import constData from "../utils/constants";
import moment from "moment";
import { Link } from "react-router-dom";

const ArticleItem = ({ article, navigate }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 mb-4 bg-white border rounded-lg p-4 max-[420px]:shadow-lg">
      <div className="md:col-span-1 lg:col-span-1">
        <img
          onClick={() => navigate("/article/" + article.slug)}
          className="cursor-pointer rounded-2xl w-full "
          src={constData.getArticleThumbUrl(article.image)}
          alt="Blog thumbnail"
        />
      </div>

      <div className="md:col-span-2 lg:col-span-2 flex w-full h-full ml-5 max-[640px]:ml-0">
        <div className="my-auto max-[640px]:mt-4">
          <Link
            to={"/category/" + article.category + ""}
            class="text-sm font-semibold text-blue-700 uppercase cursor-pointer hover:text-blue-500 "
          >
            {article.category}
          </Link>
          <div className="my-1">
            <Link
              to={"/article/" + article.slug + ""}
              className=" text-2xl  font-semimedium hover:underline cursor-pointer"
            >
              {article.title}
            </Link>
          </div>
          <p className="text-md text-gray-500 line-clamp-2 pr-8">
            {" "}
            {article.description}
          </p>
          <div className="flex mt-4">
            <img
              onClick={() =>
                navigate("/author/" + article.userId.id, {
                  state: { author: article.userId },
                })
              }
              className="rounded-full w-6 h-6 cursor-pointer"
              src={constData.getUserAvatar(article.userId.avatar)}
              alt="Author avatar"
            />
            <div className="ml-2 text-md text-gray-500 semibold">
              By{" "}
              <Link
                to={"/author/" + article.userId.id + ""}
                state={{ author: article.userId }}
                className="text-gray-700 font-bold hover:underline cursor-pointer"
              >
                {article.userId.name}
              </Link>{" "}
              {moment(article.createdAt).format("MMM DD, YYYY")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleItem;
