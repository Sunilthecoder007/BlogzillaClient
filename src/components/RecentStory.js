import React from "react";
import constData from "../utils/constants";
import moment from "moment";
import { Link } from "react-router-dom";

const RecentStory = ({ article, navigate }) => {
  return (
    <div className="py-5 border-b">
      <div class="flex flex-row w-full">
        <div className="flex-1 w-40">
          <img
            onClick={() => navigate("/article/" + article.slug)}
            className="cursor-pointer rounded-2xl w-full"
            src={constData.getArticleThumbUrl(article.image)}
            alt="Blog thumbnail"
          />
        </div>
        <div className="flex-1 w-60 pl-4">
          <div className="flex w-full h-full">
            <div className="my-auto">
              <div>
                <Link
                  to={"/category/" + article.category + ""}
                  class="text-sm font-semibold text-blue-700 uppercase cursor-pointer hover:text-blue-500"
                >
                  {article.category}
                </Link>
              </div>
              <Link
                to={"/article/" + article.slug + ""}
                className="my-4 max-[420px]:my-1 text-lg max-[1024px]:text-lg max-[420px]:text-md  font-medium hover:underline cursor-pointer"
              >
                {article.title}
              </Link>
              <div className="flex mt-3">
                <img
                  onClick={() =>
                    navigate("/author/" + article.userId.id, {
                      state: { author: article.userId },
                    })
                  }
                  className="rounded-full w-5 h-5 cursor-pointer"
                  src={constData.getUserAvatar(article.userId.avatar)}
                  alt="Author avatar"
                />
                <div className="ml-2 text-sm text-gray-500 semibold">
                  By{" "}
                  <Link
                    to={"/author/" + article.userId.id + ""}
                    state={{ author: article.userId }}
                    className="text-gray-700 font-bold hover:underline cursor-pointer"
                  >
                    {article.userId.name}
                  </Link>{" "}
                  <span className="max-[420px]:hidden">
                    {moment(article.createdAt).format("MMM DD, YYYY")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentStory;
