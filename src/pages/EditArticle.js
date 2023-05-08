import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaImage } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { editArticleApi } from "../app/slices/ArticleSlice";
import { toast } from "react-toastify";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import constData from "../utils/constants";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const validationSchema = Yup.object().shape({
  image: Yup.mixed(),
  title: Yup.string().required("Please enter a title"),
  description: Yup.string().required("Please enter a description"),
  body: Yup.string().required("Please enter the article body"),
  category: Yup.string().required("Please select a category"),
});

const EditArticle = ({ article, parentAction }) => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [image, setImage] = useState(
    constData.getArticleThumbUrl(article?.image)
  );
  const dispatch = useDispatch();
  const htmlDecode = (content) => {
    let e = document.createElement("div");
    e.innerHTML = content;
    return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
  };
  const initialValues = {
    image: "",
    title: article.title,
    description: article.description,
    body: htmlDecode(article?.body),
    category: article.category,
  };

  const handleSubmit = (values) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("body", values.body);
    formData.append("category", values.category);
    formData.append("image", values.image);
    formData.append("id", article.id);
    dispatch(editArticleApi(formData))
      .unwrap()
      .then((res) => {
        if (res.user.success) {
          toast.success(res.user.message);
          parentAction();
        } else {
          toast.error(res.user.message);
        }
      });
  };

  return (
    <div className="w-full">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, isSubmitting, setFieldValue }) => (
          <Form>
            {/* Article image input */}
            <div className="mb-4">
              <label
                htmlFor="image"
                className="block text-gray-700 font-bold mb-2 text-sm"
              >
                Article Image
              </label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col rounded-lg border-4 border-dashed w-full h-32 hover:bg-gray-100 hover:border-blue-500 group">
                  <div className="relative flex flex-col items-center justify-center pt-7">
                    {image && (
                      <div
                        style={{ height: "120px" }}
                        class="absolute top-0 left-0 w-full"
                      >
                        <img
                          style={{ width: "inherit" }}
                          class="h-full object-contain bg-gray-50"
                          src={image}
                          alt="Article Thumb image"
                        />
                      </div>
                    )}
                    <FaImage className="w-8 h-8  text-gray-500" />
                    <p className="lowercase text-sm text-gray-400 group-hover:text-blue-500 pt-1 tracking-wider">
                      {values?.image?.name
                        ? values?.image?.name
                        : "Select a file"}
                    </p>
                  </div>
                  <input
                    type="file"
                    name="image"
                    accept="image/png, image/gif, image/jpeg"
                    onChange={(event) => {
                      setFieldValue("image", event.currentTarget.files[0]);
                      setImage(
                        URL.createObjectURL(event.currentTarget.files[0])
                      );
                    }}
                    onBlur={() => setFieldValue("image", values.image)}
                    className="hidden"
                  />
                </label>
              </div>
              <ErrorMessage
                name="image"
                component="div"
                className="text-red-500 text-sm mt-2"
              />
            </div>

            {/* Title input */}
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-gray-700 font-bold mb-2 text-sm"
              >
                Title
              </label>
              <Field
                type="text"
                name="title"
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <ErrorMessage
                component="div"
                name="title"
                className="text-red-500 text-sm mt-2"
              />
            </div>

            {/* Description input */}
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-gray-700 font-bold mb-2 text-sm"
              >
                Description
              </label>
              <Field
                as="textarea"
                name="description"
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <ErrorMessage
                component="div"
                name="description"
                className="text-red-500 text-sm mt-2"
              />
            </div>

            {/* Category select input */}
            <div className="mb-4">
              <label
                htmlFor="category"
                className="block text-gray-700  font-bold mb-2 text-sm"
              >
                Category
              </label>
              <Field
                as="select"
                name="category"
                className="form-select block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="">Select a category</option>
                {constData.topBlogCategories.map((category, index) => {
                  return <option value={category.key}>{category.name}</option>;
                })}
              </Field>
              <ErrorMessage
                component="div"
                name="category"
                className="text-red-500 text-sm mt-2"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="body"
                className="block text-gray-700 font-bold mb-2 text-sm"
              >
                Body
              </label>
              <CKEditor
                editor={ClassicEditor}
                name="body"
                data={values.body}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setFieldValue("body", data);
                }}
              />
              {errors.body && touched.body && (
                <div className="text-blue-500 text-sm mt-2">{errors.body}</div>
              )}
            </div>

            {/* Submit button */}
            <div className="">
              <button
                type="submit"
                //disabled={isSubmitting}
                className="bg-blue-600 text-lg text-white rounded-md border  px-5 py-1 mt-8 hover:bg-blue-700 font-medium"
              >
                {isSubmitting ? "Updating..." : "Update"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditArticle;
