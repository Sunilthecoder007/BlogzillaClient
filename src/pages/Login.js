import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaArrowCircleRight, FaSearch } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { loginApi } from "../app/slices/AuthSlice";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const dispatch = useDispatch();
  const initialValues = {
    email: "",
    password: "",
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  const onSubmit = (values) => {
    setSaving(true);
    dispatch(loginApi(values))
      .unwrap()
      .then((res) => {
        if (res.user) {
          toast.success("Login successfully!");
          navigate("/admin");
        }
        setSaving(false);
      });
  };

  return (
    <div className="flex w-full items-center justify-center  max-[640px]:px-4">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h1 className="mt-16 text-center text-3xl font-bold text-gray-900">
            Sign in to continue writing
          </h1>
          <h2 className="mt-2 text-center text-lg  text-gray-500">
            Welcome back to our writing network!
          </h2>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form className="mt-8 space-y-6">
            <div className="bg-white shadow-md rounded-md p-6">
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Email address
                </label>
                <Field
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="appearance-none  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Password
                </label>
                <Field
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="mb-4">
                <button
                  disabled={saving}
                  type="submit"
                  className={
                    "group relative w-full flex justify-center py-3 px-4 border border-transparent text-lg font-medium rounded-full text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" +
                    (saving ? " bg-blue-400" : " bg-blue-600 hover:bg-blue-700")
                  }
                >
                  <FaArrowCircleRight className="mt-1 mr-3" />
                  {saving ? "Please wait..." : "Login"}
                </button>
              </div>
            </div>
            <div className="text-center  text-gray-600">
              Don't have an account yet?{" "}
              <Link className="font-bold text-blue-600" to="/create-account">
                Create new Account
              </Link>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Login;
