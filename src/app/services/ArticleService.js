import axios from "axios";
import constData from "../../utils/constants";
import { apiPath, API_URL } from "./ApiPath";
import { toast } from "react-toastify";

const postArticle = (params) => {
  return axios
    .post(API_URL + apiPath.postArticle, params, {
      headers: constData.headerData,
    })
    .then((response) => {
      if (response.data) {
      }
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      toast.error(error.response.data.message);
    });
};

const getArticles = (id) => {
  return axios
    .get(API_URL + apiPath.postArticle, {
      headers: { ...constData.headerData, USERID: id },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      toast.error(error.response.data.message);
    });
};
const getSingleArticle = (id) => {
  return axios
    .get(API_URL + apiPath.postArticle + "/" + id, {
      headers: constData.headerData,
    })
    .then((response) => {
      return response.data[0];
    })
    .catch((error) => {
      toast.error(error.response.data.message);
    });
};
const getCategoryArticle = (id) => {
  return axios
    .get(API_URL + apiPath.categoryArticle + "/" + id, {
      headers: constData.headerData,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      toast.error(error.response.data.message);
    });
};

const deleteArticle = (id) => {
  return axios
    .delete(API_URL + apiPath.postArticle + "/" + id, {
      headers: constData.headerData,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      toast.error(error.response.data.message);
    });
};

const editArticle = (params) => {
  return axios
    .patch(API_URL + apiPath.postArticle, params, {
      headers: constData.headerData,
    })
    .then((response) => {
      if (response.data) {
      }
      return response.data;
    })
    .catch((error) => {
      toast.error(error.response.data.message);
    });
};

const searchArticles = (params) => {
  return axios
    .post(API_URL + apiPath.searchArticles, params, {
      headers: constData.headerData,
    })
    .then((response) => {
      if (response.data) {
      }
      return response.data;
    })
    .catch((error) => {
      toast.error(error.response.data.message);
    });
};

const authService = {
  getSingleArticle,
  postArticle,
  getArticles,
  editArticle,
  deleteArticle,
  getCategoryArticle,
  searchArticles,
};
export default authService;
