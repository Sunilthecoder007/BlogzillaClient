import React, { useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import constData from "../utils/constants";
import { UpdateUserApi } from "../app/slices/AuthSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const UpdateUserInfo = ({ updateUser, parentAction, user }) => {
  const dispatch = useDispatch();
  const [isUploading, setIsUploading] = useState(false);
  const [avatar, setAvatar] = useState(
    user?.avatar
      ? constData.getUserAvatar(user.avatar)
      : constData.getUserAvatar("default.jpg")
  );
  const inputFile = useRef(null);
  const handleSubmit = (values, { setSubmitting }) => {
    updateUser(values);
  };
  const updateAvatar = (file) => {
    const formData = new FormData();
    formData.append("avatar", file);
    let fData = {
      form: formData,
      userId: user.id,
    };
    dispatch(UpdateUserApi(fData))
      .unwrap()
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message);
          //parentAction();
        } else {
          toast.error(res.data.message);
        }
      });
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
  });

  const initialValues = {
    name: user.name,
    email: user.email,
  };

  return (
    <>
      <div className="flex mb-4 pt-4">
        <img
          className="rounded-full h-24 w-24 border-2 border-gray-300 mx-auto"
          src={constData.getUserAvatar(user.avatar)}
          alt="Profile"
        />
        <input
          ref={inputFile}
          type="file"
          name="image"
          accept="image/png, image/gif, image/jpeg"
          onChange={(event) => {
            updateAvatar(event.currentTarget.files[0]);
            setAvatar(URL.createObjectURL(event.currentTarget.files[0]));
          }}
          className="hidden"
        />
      </div>
      <div className="text-center mb-12">
        <h2 className="text-xl font-bold">{user.name}</h2>
        <p className="text-gray-500">{user.email}</p>

        <button
          onClick={() => {
            inputFile.current.click();
          }}
          className="bg-white border mt-3 border-gray-300 rounded-md shadow-sm py-2 px-2 text-sm font-medium text-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          disabled={isUploading}
        >
          {isUploading ? "Uploading..." : "Change Avatar"}
        </button>
      </div>

      <div className="flex items-center justify-center mt-8">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className=" w-full">
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="name"
                >
                  Name
                </label>
                <Field
                  type="text"
                  name="name"
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <Field
                  type="email"
                  name="email"
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              <button
                type="submit"
                className="bg-blue-600 text-lg text-white rounded-md border  px-5 py-1 mt-8 hover:bg-blue-700 font-medium"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Updating..." : "Update"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default UpdateUserInfo;
