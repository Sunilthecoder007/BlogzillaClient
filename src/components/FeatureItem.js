import React from "react";
import constData from "../utils/constants";
import { Link } from "react-router-dom";

const FeatureItem = ({ article, navigate }) => {
  return (
    <div className="py-5">
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
              <Link
                to={"/article/" + article.slug + ""}
                className="mb-3 text-lg line-clamp-3  font-medium hover:underline cursor-pointer"
              >
                {article.title}
              </Link>
              <div className="flex">
                <div className="text-sm text-gray-500 semibold">
                  By{" "}
                  <Link
                    to={"/author/" + article.userId.id + ""}
                    state={{ author: article.userId }}
                    className="text-gray-500 font-bold hover:underline cursor-pointer"
                  >
                    {article.userId.name}
                  </Link>{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureItem;
