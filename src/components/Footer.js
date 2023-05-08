import React from "react";
import newsletterImg from "../assets/newsletter.png";
import logo from "../assets/logo.svg";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
function Footer() {
  return (
    <>
      <div className="bg-stone-100 relative border-t py-8 flex text-center">
        <div className="m-auto w-full">
          <img src={newsletterImg} className="w-16 h-16 mx-auto mb-4" />
          <h4 className="text-2xl font-semibold text-gray-600 max-[420px]:text-lg">
            Get the most talked about <br /> stories directly in your inbox
          </h4>
          <input
            type="email"
            placeholder="Enter your email"
            className="h-12 w-1/4 mt-4 border rounded-full px-6 text-center max-[420px]:w-3/4"
          />

          <p className="text-sm text-gray-400 mt-4 max-[420px]:px-20">
            Your privacy is important to us. We promise not to send you spam!
          </p>
        </div>
      </div>
      <footer className="bg-white-100 relative pb-16 max-[420px]:px-4">
        <div className="max-w-7xl mx-auto flex pt-8">
          <div className="w-full border-b  pb-4">
            <img src={logo} className="w-8 h-8 float-left" />
            <span className=" ml-2 text-xl mt-1 text-blue-700 logoFont float-left">
              Blogzilla
            </span>
            <div className="flex space-x-4 float-right">
              <button className="text-blue-700 bg-blue-50 rounded-lg p-2">
                <FaFacebook size={20} />
              </button>
              <button className="text-blue-700 bg-blue-50 rounded-lg p-2">
                <FaTwitter size={20} />
              </button>
              <button className="text-blue-700 bg-blue-50 rounded-lg p-2">
                <FaInstagram size={20} />
              </button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-2 max-[420px]:text-center">
          <div className="text-grey-500 text-sm font-medium max-[420px]:text-xs">
            <div className="flex items-center float-left space-x-4 max-[420px]:float-none">
              <a href="#" className="hover:text-gray-700">
                Home
              </a>
              <a href="#" className="hover:text-gray-700">
                About
              </a>
              <a href="#" className="hover:text-gray-700">
                Contact
              </a>
              <a href="#" className="hover:text-gray-700">
                Privacy policy
              </a>
              <a href="#" className="hover:text-gray-700">
                Terms & Conditions
              </a>
            </div>
            <div className="float-right max-[420px]:float-none max-[420px]:mt-2">
              <p className="text-gray-600 ">
                © 2023 Blogzilla LLC. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
