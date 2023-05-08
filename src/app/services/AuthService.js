import axios from "axios";
import storage from "redux-persist/lib/storage";
import constData from "../../utils/constants";
import { apiPath, API_URL } from "./ApiPath";
import { toast } from "react-toastify";

const signUp = (params) => {
  return axios
    .post(API_URL + apiPath.signUp, params, {
      headers: constData.headerData,
    })
    .then((response) => {
      if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("tokens", JSON.stringify(response.data.tokens));
      }
      return response.data;
    })
    .catch((error) => {
      toast.error(error.response.data.message);
    });
};
const login = (params) => {
  return axios
    .post(API_URL + apiPath.login, params, {
      headers: constData.headerData,
    })
    .then((response) => {
      if (response.user) {
        localStorage.setItem("user", JSON.stringify(response.user.user));
        localStorage.setItem("tokens", JSON.stringify(response.user.tokens));
      }
      return response.data;
    })
    .catch((error) => {
      toast.error(error.response.data.message);
    });
};
const forgotPassword = (email) => {
  return axios
    .post(API_URL + apiPath.forgotPassword, {
      email,
    })
    .then((response) => {
      return response.data;
    });
};
const resetPassword = (params) => {
  return axios
    .post(API_URL + apiPath.resetPassword, params, {
      headers: constData.headerData,
    })
    .then((response) => {
      return response.data;
    });
};

const logout = (params) => {
  return axios
    .post(API_URL + apiPath.logout, params, {
      headers: constData.headerData,
    })
    .then((response) => {
      localStorage.removeItem("user");
      localStorage.removeItem("tokens");
      localStorage.clear();
      storage.removeItem("persist:root");
    })
    .catch((error) => {
      toast.error(error.response.data.message);
    });
};

const checkSocialApi = (params) => {
  return axios
    .post(API_URL + apiPath.checkSocial, params, {
      headers: constData.headerData,
    })
    .then((response) => {
      return response.data;
    });
};

const updateUser = (params) => {
  return axios
    .patch(API_URL + apiPath.user + "" + params.userId, params.form, {
      headers: constData.headerData,
    })
    .then((response) => {
      return response.data;
    });
};
const authService = {
  signUp,
  login,
  logout,
  forgotPassword,
  resetPassword,
  checkSocialApi,
  updateUser,
};
export default authService;
