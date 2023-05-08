import React, { useEffect, useRef, useState } from "react";
import logo from "../assets/logo.svg";
import {
  FaBars,
  FaBlog,
  FaCaretDown,
  FaSearch,
  FaTimes,
  FaUserCircle,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import constData from "../utils/constants";

function Header() {
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [showSubMenu, setShowSubMenu] = useState(false);
  const [menuItems, setMenuItems] = useState(
    constData.topBlogCategories.slice(0, 5)
  );
  const submenuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    window.addEventListener("resize", handleResize, false);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (submenuRef.current && !submenuRef.current.contains(event.target)) {
      setShowSubMenu(false);
    }
  };

  const handleResize = () => {
    if (window.innerWidth < 1020) {
      setMenuItems(constData.topBlogCategories.slice(0, 2));
    } else if (window.innerWidth < 1080) {
      setMenuItems(constData.topBlogCategories.slice(0, 3));
    } else if (window.innerWidth < 1185) {
      setMenuItems(constData.topBlogCategories.slice(0, 4));
    } else {
      setMenuItems(constData.topBlogCategories.slice(0, 5));
    }
  };

  return (
    <>
      <header className="bg-white border-b h-20 flex max-[420px]:shadow-lg">
        <div className="container max-w-7xl flex m-auto bg-yellow-0 h-12 max-[1320px]:px-3">
          <button
            onClick={() => navigate("/")}
            className="h-3/4 my-auto flex max-[600px]:my-0"
          >
            <img
              className="w-8 h-8 float-left max-[600px]:w-12 max-[600px]:h-12"
              src={logo}
            />
            <span className="my-auto ml-2 text-blue-600 text-2xl logoFont max-[520px]:hidden">
              Blogzilla
            </span>
          </button>
          <div className="h-12 relative mx-auto flex max-[1030px]:hidden">
            {menuItems.map((category, index) => {
              return (
                <Link
                  to={"/category/" + category.key + ""}
                  className="my-auto ml-6 text-lg text-gray-700 hover:text-blue-700 font-medium"
                >
                  {category.name}
                </Link>
              );
            })}
            <button
              onClick={() => setShowSubMenu(!showSubMenu)}
              className="relative my-auto ml-6 text-lg text-gray-700 hover:text-blue-700 font-medium"
            >
              More{" "}
              <FaCaretDown
                style={{ right: "-20px", top: "5px" }}
                className="text-gray-700 absolute"
              />
            </button>

            {isLoggedIn ? (
              <Link
                to="/admin"
                className="my-auto relative ml-10 bg-blue-600 text-md text-white rounded-full px-5 py-1 hover:bg-blue-600 font-medium"
              >
                <FaUserCircle
                  style={{ left: "16px", top: "8px" }}
                  className="text-white absolute"
                />
                <span className="ml-6">{user.name}</span>
              </Link>
            ) : (
              <Link
                to="/login"
                className="my-auto relative ml-10 bg-blue-600   text-md text-white rounded-full px-5 py-1 hover:bg-blue-700 font-medium"
              >
                <FaBlog
                  style={{ left: "16px", top: "8px" }}
                  className="text-white absolute"
                />
                <span className="ml-5">Login/Signup</span>
              </Link>
            )}

            {showSubMenu && (
              <div
                ref={submenuRef}
                className="bg-white w-auto h-auto flex flex-col  border rounded-lg absolute top-16 right-32 z-10"
              >
                {constData.topBlogCategories
                  .slice(5, 10)
                  .map((category, index) => {
                    return (
                      <Link
                        to={"/category/" + category.key + ""}
                        className="text-md text-gray-700 hover:text-blue-700 hover:bg-gray-100 px-8 cursor-pointer py-2 font-medium"
                      >
                        {category.name}
                      </Link>
                    );
                  })}
              </div>
            )}
          </div>
          <div
            onClick={() => navigate("search")}
            className="relative my-auto max-[1030px]:mx-auto max-[640px]:mx-8"
          >
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <FaSearch className="text-gray-400" />
            </span>
            <input
              readOnly
              type="text"
              placeholder="Search"
              className="block w-full pl-10 pr-3 py-2  border  rounded-full focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
            />
          </div>
          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="w-12 h-10 my-auto bg-gray-100 rounded-lg  min-[1031px]:hidden flex"
          >
            {mobileMenu ? (
              <FaTimes className="text-gray-600 m-auto" />
            ) : (
              <FaBars className="text-gray-600 m-auto" />
            )}
          </button>

          <button
            onClick={() => {
              if (isLoggedIn) {
                navigate("admin");
              } else {
                navigate("login");
              }
            }}
            className="w-12 h-10 my-auto bg-blue-500 ml-2 rounded-lg  min-[1031px]:hidden flex"
          >
            <FaUserCircle className="text-white m-auto" />
          </button>
        </div>
      </header>
      {mobileMenu && (
        <div className="top-20 flex text-center left-0 w-full min-h-screen bg-white absolute z-10">
          <ul className="mx-auto mt-8">
            {constData.topBlogCategories.map((category, index) => {
              return (
                <li
                  onClick={() => {
                    setMobileMenu(!mobileMenu);
                    navigate("/category/" + category.key);
                  }}
                  className="text-lg text-gray-700 hover:text-blue-700 mt-5 font-medium"
                >
                  {category.name}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
}

export default Header;
