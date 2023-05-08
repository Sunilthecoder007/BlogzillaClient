import React from "react";
import {
  FaEdit,
  FaExclamationTriangle,
  FaEye,
  FaPlusCircle,
  FaTrash,
} from "react-icons/fa";
import constData from "../utils/constants";
import moment from "moment";
import { Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import { deleteArticleApi } from "../app/slices/ArticleSlice";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

const MyArticles = ({ articles, parentAction }) => {
  const dispatch = useDispatch();
  const deleteArticle = (article) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div class="bg-white shadow-lg rounded-lg md:max-w-md md:mx-auto p-4 fixed inset-x-0 bottom-0 z-50 mb-4 mx-4 md:relative">
            <div class="md:flex items-center">
              <div class="rounded-full border border-gray-300 flex items-center justify-center w-16 h-16 flex-shrink-0 mx-auto">
                <FaExclamationTriangle className="bx bx-error text-3xl text-blue-600" />
              </div>
              <div class="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
                <p class="font-bold">Delete {article.title} ?</p>
                <p class="text-sm text-gray-700 mt-1">
                  You will lose all of your data by deleting your article. This
                  action cannot be undone.
                </p>
              </div>
            </div>

            <div class="text-center md:text-right mt-4 md:flex md:justify-end">
              <button
                onClick={() => {
                  dispatch(deleteArticleApi(article.id))
                    .unwrap()
                    .then((res) => {
                      onClose();
                      parentAction(2, null);
                      toast.success("Deleted successfully!");
                    });
                }}
                className="bg-white border border-gray-300 rounded-md shadow-sm py-1 px-3 text-sm font-medium text-blue-500 ml-2"
              >
                Delete
              </button>
              <button
                onClick={() => onClose()}
                className="bg-white border border-gray-300 rounded-md shadow-sm py-1 px-3 text-sm font-medium text-blue-500 ml-2"
              >
                Cancel
              </button>
            </div>
          </div>
        );
      },
    });
  };
  return (
    <>
      <div className="">
        {articles.length == 0 ? (
          <div className="text-center my-32">
            <div className="bg-orange-50 px-4 text-orange-900 py-2 rounded-md border border-orange-100 w-fit mx-auto mt-16">
              <strong>Info:</strong> You haven't published any article yet!
            </div>
            <button
              onClick={() => parentAction(0, null)}
              className="bg-blue-600 text-lg text-white rounded-md border  px-5 py-1 mt-8 hover:bg-blue-700 font-medium"
            >
              <FaPlusCircle className="float-left mt-1 mr-2" /> Create Article
            </button>
          </div>
        ) : (
          <>
            <div className="h-16 w-full">
              <button
                onClick={() => parentAction(0, null)}
                className="bg-white border border-gray-300 rounded-md shadow-sm py-2 px-4 text-sm font-medium text-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <FaPlusCircle className="float-left mt-1 mr-2" /> Add New
              </button>
            </div>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Image
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Title
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Category
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Created At
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {articles?.map((article) => (
                  <tr key={article.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <img
                        src={constData.getArticleThumbUrl(article.image)}
                        alt={article.title}
                        className="h-10 w-10 rounded-md"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-bold text-gray-900">
                        {article.title}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500 capitalize">
                        {article.category}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {moment(article.createdAt).format("MMM D YYYY")}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <Link
                        target="_blank"
                        to={"/article/" + article.slug + ""}
                        title="View Article"
                        className="bg-white border inline-flex border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm font-medium text-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        <FaEye />
                      </Link>
                      <button
                        onClick={() => parentAction(1, article)}
                        title="Edit Article"
                        className="bg-white ml-2 border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm font-medium text-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => deleteArticle(article)}
                        title="Delete Article"
                        className="bg-white ml-2 border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm font-medium text-red-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </>
  );
};

export default MyArticles;
