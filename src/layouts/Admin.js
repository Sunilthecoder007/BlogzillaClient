import React, { useEffect, useRef, useState } from "react";
import logo from "../assets/logo.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  FaHome,
  FaNewspaper,
  FaPlusSquare,
  FaSignOutAlt,
  FaUserEdit,
} from "react-icons/fa";
import constData from "../utils/constants";
import { getArticlesApi } from "../app/slices/ArticleSlice";
import MyArticles from "../components/MyArticles";
import NewArticle from "../pages/NewArticle";
import UpdateUserInfo from "../components/UpdateUserInfo";
import { UpdateUserApi, logoutApi } from "../app/slices/AuthSlice";
import { toast } from "react-toastify";
import EditArticle from "../pages/EditArticle";
import { Link } from "react-router-dom";

const Admin = () => {
  const [fragment, setFragment] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { tokens, user } = useSelector((state) => state.auth);
  const { articles } = useSelector((state) => state.article);
  const dispatch = useDispatch();
  const [userDropdown, setUserDropdown] = useState(false);
  const [editArticle, setEditArticle] = useState();
  const [avatar, setAvatar] = useState(
    user?.avatar
      ? constData.getUserAvatar(user?.avatar)
      : constData.getUserAvatar("default.jpg")
  );
  const submenuRef = useRef(null);
  useEffect(() => {
    dispatch(getArticlesApi(user?.id));
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dispatch]);

  const handleClickOutside = (event) => {
    if (submenuRef.current && !submenuRef.current.contains(event.target)) {
      setUserDropdown(false);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const refreshData = () => {
    dispatch(getArticlesApi(user?.id));
  };
  const handleUpdateUser = (data) => {
    let fData = {
      form: data,
      userId: user?.id,
    };
    dispatch(UpdateUserApi(fData))
      .unwrap()
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message);
          setFragment(0);
        } else {
          toast.error(res.data.message);
        }
      });
  };
  function handleNewArticle() {
    refreshData();
    setFragment(0);
  }
  function handleMyArticles(type, article) {
    if (type == 0) {
      setFragment(1);
    } else if (type == 1) {
      setFragment(5);
      setEditArticle(article);
    } else {
      refreshData();
    }
  }

  return (
    <>
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <button
                onClick={toggleMenu}
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clip-rule="evenodd"
                    fill-rule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </button>
              <Link to="/" className="flex ml-2 md:mr-24">
                <img src={logo} className="h-8 mr-3" alt="FlowBite Logo" />
                <span className="self-center text-blue-700  logoFont text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                  Blogzilla
                </span>
              </Link>
            </div>
            <div className="flex items-center">
              <div className="flex items-center ml-3">
                <div>
                  <button
                    onClick={() => setUserDropdown(!userDropdown)}
                    type="button"
                    className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                    aria-expanded="false"
                    data-dropdown-toggle="dropdown-user"
                  >
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="w-8 h-8 rounded-full"
                      src={avatar}
                      alt="user photo"
                    />
                  </button>
                </div>
                {userDropdown && (
                  <div
                    ref={submenuRef}
                    className="z-50 absolute top-12 right-4 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600"
                    id="dropdown-user"
                  >
                    <div className="px-6 py-3" role="none">
                      <p
                        className="text-md font-bold text-gray-900 dark:text-white"
                        role="none"
                      >
                        {user?.name}
                      </p>
                      <p
                        className="text-xs font-medium text-gray-600 truncate dark:text-gray-300"
                        role="none"
                      >
                        {user?.email}
                      </p>
                    </div>
                    <ul className="py-1" role="none">
                      <li>
                        <a
                          onClick={() => {
                            setUserDropdown(false);
                            setFragment(2);
                          }}
                          className="block px-4 cursor-pointer py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                          role="menuitem"
                        >
                          Update Profile
                        </a>
                      </li>
                      <li>
                        <a
                          onClick={() => {
                            setUserDropdown(false);
                            dispatch(
                              logoutApi({
                                refreshToken: tokens?.refresh?.token,
                              })
                            );
                          }}
                          className="block px-4 cursor-pointer py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                          role="menuitem"
                        >
                          Sign out
                        </a>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <aside
        id="logo-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          <ul className="space-y-2 font-medium" onClick={toggleMenu}>
            <li>
              <button
                onClick={() => setFragment(0)}
                className={
                  "w-full text-left flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700" +
                  (fragment == 0 && " text-blue-700")
                }
              >
                <FaNewspaper
                  className={
                    "text-lg " +
                    (fragment == 0 ? "text-blue-700" : "text-gray-700")
                  }
                />
                <span className="flex-1 ml-3 whitespace-nowrap">
                  {" "}
                  My Articles
                </span>
                <span className="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                  {articles.length}
                </span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setFragment(1)}
                className={
                  "w-full text-left flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700" +
                  (fragment == 1 && " text-blue-700")
                }
              >
                <FaPlusSquare
                  className={
                    "text-lg " +
                    (fragment == 1 ? "text-blue-700" : "text-gray-700")
                  }
                />
                <span className="flex-1 ml-3 whitespace-nowrap">
                  Add new Article
                </span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setFragment(2)}
                className={
                  "w-full text-left flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700" +
                  (fragment == 2 && " text-blue-700")
                }
              >
                <FaUserEdit
                  className={
                    "text-lg " +
                    (fragment == 2 ? "text-blue-700" : "text-gray-700")
                  }
                />
                <span className="flex-1 ml-3 whitespace-nowrap">
                  Edit Profile
                </span>
              </button>
            </li>

            <li>
              <Link
                to="/"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <FaHome className="text-gray-700 text-lg" />
                <span className="flex-1 ml-3 whitespace-nowrap">Home</span>
              </Link>
            </li>
            <li>
              <button
                onClick={() =>
                  dispatch(logoutApi({ refreshToken: tokens?.refresh?.token }))
                }
                className="w-full text-left flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <FaSignOutAlt className="text-gray-700 text-lg" />
                <span className="flex-1 ml-3 whitespace-nowrap">Sign Out</span>
              </button>
            </li>
          </ul>
        </div>
      </aside>

      <div className="p-4 sm:ml-64 bg-gray-100 min-h-screen">
        <div className="p-8 bg-white shadow-md rounded-md dark:border-gray-700 mt-20 mx-4 max-[640px]:my-16 max-[640px]:mx-0">
          {(() => {
            switch (fragment) {
              case 0:
                return (
                  <MyArticles
                    articles={articles}
                    parentAction={handleMyArticles}
                  />
                );
                break;
              case 1:
                return <NewArticle parentAction={handleNewArticle} />;
                break;
              case 2:
                return (
                  <UpdateUserInfo
                    parentAction={handleNewArticle}
                    updateUser={handleUpdateUser}
                    user={user}
                  />
                );
                break;
              case 5:
                return (
                  <EditArticle
                    parentAction={handleNewArticle}
                    article={editArticle}
                  />
                );
                break;
              default:
                return null;
            }
          })()}
        </div>
      </div>
    </>
  );
};

export default Admin;
