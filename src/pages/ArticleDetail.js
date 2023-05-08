import React, { useEffect, useState } from "react";
import constData from "../utils/constants";
import moment from "moment";
import { FaCalendar, FaEdit, FaStar } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleArticleApi } from "../app/slices/ArticleSlice";
import Loader from "../components/Loader";

const ArticleDetail = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const params = useParams();
  const [article, setArticle] = useState();
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(true);
  const htmlDecode = (content) => {
    let e = document.createElement("div");
    e.innerHTML = content;
    return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
  };

  useEffect(() => {
    setLoader(true);
    dispatch(getSingleArticleApi(params.slug))
      .unwrap()
      .then((res) => {
        setArticle(res.user);
        setLoader(false);
      });
  }, [dispatch, params]);

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <>
          {window.innerWidth > 400 ? (
            <div
              style={{
                backgroundImage: `url(${constData.getArticleThumbUrl(
                  article?.image
                )})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                height: "65vh",
              }}
              className="w-full bg-gray-400"
            ></div>
          ) : (
            <img
              onClick={() => navigate("/article/" + article?.id)}
              className="cursor-pointer  w-full "
              src={constData.getArticleThumbUrl(article?.image)}
              alt="Blog thumbnail"
            />
          )}

          <div className="max-[640px]:mx-4 ">
            <div className="max-w-3xl mx-auto pt-8">
              <Link
                to={"/category/" + article?.category + ""}
                class="text-md font-semibold text-blue-700 uppercase cursor-pointer hover:text-blue-500"
              >
                {article?.category}
              </Link>

              <h1 className="text-4xl font-bold my-8 max-[640px]:text-2xl max-[640px]:my-4">
                {article?.title}
              </h1>

              <p className="text-lg  leading-tight font-medium text-gray-700 mb-4 max-[640px]:text-sm">
                {article?.description}
              </p>

              <div className="flex border-b mb-8 py-8 w-full relative max-[640px]:py-4">
                <img
                  onClick={() =>
                    navigate("/author/" + article?.userId.id, {
                      state: { author: article?.userId },
                    })
                  }
                  className="rounded-lg w-8 h-8 cursor-pointer"
                  src={constData.getUserAvatar(article?.userId?.avatar)}
                  alt="Author avatar"
                />
                <div className="ml-2 mt-1 text-md text-gray-500 semibold">
                  By{" "}
                  <Link
                    to={"/author/" + article?.userId?.id + ""}
                    state={{ author: article?.userId }}
                    className="text-gray-700 font-bold hover:underline cursor-pointer"
                  >
                    {article?.userId?.name}
                  </Link>{" "}
                  <FaCalendar
                    className="inline-block mx-2"
                    style={{ marginTop: "-4px" }}
                  />
                  {moment(article?.createdAt).format("MMM DD, YYYY")}
                </div>

                {user?.id == article?.userId?.id && (
                  <div className=" absolute right-0">
                    <button
                      onClick={() => {
                        navigate("/article-edit", {
                          state: { article: article },
                        });
                      }}
                      className="bg-white border border-gray-300 rounded-md shadow-sm py-1 px-3 text-md font-medium text-blue-500 ml-2"
                    >
                      <FaEdit
                        style={{ marginTop: "-4px" }}
                        className="inline-block max-[640px]:hidden"
                      />{" "}
                      Edit
                    </button>
                  </div>
                )}
              </div>

              <div className="mb-8">
                <div
                  dangerouslySetInnerHTML={{
                    __html: htmlDecode(article?.body),
                  }}
                ></div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ArticleDetail;
