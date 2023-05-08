import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaArrowCircleRight } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { SignUpApi } from "../app/slices/AuthSlice";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [saving, setSaving] = useState(false);
  const dispatch = useDispatch();
  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Required"),
  });

  const onSubmit = (values) => {
    if (!acceptTerms) {
      toast.error("Please agree to our terms and conditions to continue.");
    } else {
      setSaving(true);
      let data = JSON.parse(JSON.stringify(values));
      delete data.confirmPassword;
      dispatch(SignUpApi(data))
        .unwrap()
        .then((res) => {
          if (res.data) {
            toast.success("Registration successfully done!");
            navigate("/admin");
          }
          setSaving(false);
        });
    }
  };

  return (
    <div className="flex w-full items-center justify-center max-[640px]:px-4">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h1 className="mt-16 text-center text-3xl font-bold text-gray-900">
            Join Our Writing Network
          </h1>
          <h2 className="mt-2 text-center text-lg  text-gray-500">
            Connect with fellow writers and grow your skills
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
                  htmlFor="name"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Name
                </label>
                <Field
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  className="appearance-none  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Name"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
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
                  className="appearance-none  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="confirmPassword"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Confirm Password
                </label>
                <Field
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="current-password"
                  className="appearance-none  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Confirm Password"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="acceptTerms"
                  className="inline-flex items-center"
                >
                  <input
                    type="checkbox"
                    name="acceptTerms"
                    id="acceptTerms"
                    checked={acceptTerms}
                    onChange={(event) => {
                      setAcceptTerms(event.target.checked);
                    }}
                    className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                  />
                  <span className="ml-2 text-gray-700">
                    I accept the{" "}
                    <a href="#" className="text-blue-600 hover:underline">
                      Terms and Conditions
                    </a>
                  </span>
                </label>
              </div>
              <div className="mb-4">
                <button
                  disabled={saving}
                  type="submit"
                  className={
                    "group relative w-full flex justify-center py-3 px-4 border border-transparent text-lg font-medium rounded-full text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" +
                    (saving ? " bg-blue-400" : " bg-blue-600 hover:bg-blue-700")
                  }
                >
                  <FaArrowCircleRight className="mt-1 mr-3" />
                  {saving ? "Please wait..." : "Sign up"}
                </button>
              </div>
            </div>
            <div className="text-center  text-gray-600">
              Already have a account ?{" "}
              <Link className="font-bold text-blue-600" to="/login">
                Login here
              </Link>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Signup;
