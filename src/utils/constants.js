import moment from "moment";
import React from "react";
import { SERVER_URL, apiPath } from "../app/services/ApiPath";
import cat1 from "../assets/category/cat1.jpg";
import cat2 from "../assets/category/cat2.jpg";
import cat3 from "../assets/category/cat3.jpg";
import cat4 from "../assets/category/cat4.jpg";
import cat5 from "../assets/category/cat5.jpg";
import cat6 from "../assets/category/cat6.jpg";
import cat7 from "../assets/category/cat7.jpg";
import cat8 from "../assets/category/cat8.jpg";
import cat9 from "../assets/category/cat9.jpg";
import cat10 from "../assets/category/cat10.jpg";

export const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 6,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const getBorderColor = (touched, hasError) => {
  return touched && hasError ? "#f65157" : "";
};

const checkError = (name) => {
  return name ? (
    <div className="error" style={{ color: "#f65157" }}>
      {name}
    </div>
  ) : (
    ""
  );
};

const checkErrorFloat = (name) => {
  return name ? (
    <div
      className="error"
      style={{
        color: "#f65157",
        position: "absolute",
        top: "67px",
        left: "108px",
      }}
    >
      {name}
    </div>
  ) : (
    ""
  );
};

let token = localStorage.getItem("tokens");

if (token) {
  console.log(token);
  token = JSON.parse(token);
  token = "Bearer " + token.access.token;
}

const headerData = {
  Authorization: token && token,
  "Accept-Language": "HINDI",
  // "x-rentaguard-version": "1.0.0",
  // "x-rentaguard-platform": "web",
};

const checkPasswordStrength = (password) => {
  var password_strength = document.getElementById("password-text");

  //TextBox left blank.
  if (password.length === 0) {
    password_strength.innerHTML = "";
    return;
  }

  //Regular Expressions.
  var regex = [];
  regex.push("[A-Z]"); //Uppercase Alphabet.
  regex.push("[a-z]"); //Lowercase Alphabet.
  regex.push("[0-9]"); //Digit.
  regex.push("[$@$!%*#?&]"); //Special Character.

  var passed = 0;

  //Validate for each Regular Expression.
  for (var i = 0; i < regex.length; i++) {
    if (new RegExp(regex[i]).test(password)) {
      passed++;
    }
  }

  //Display status.
  var strength = "";
  switch (passed) {
    case 0:
    case 1:
    case 2:
      strength =
        "<small class='progress-bar bg-danger' style='width: 100%;border-radius:20px'>Weak</small>";
      break;
    case 3:
      strength =
        "<small class='progress-bar bg-warning' style='width: 100%;border-radius:20px'>Medium</small>";
      break;
    case 4:
      strength =
        "<small class='progress-bar bg-success' style='width: 100%;border-radius:20px'>Strong</small>";
      break;
    default:
      strength = "";
      break;
  }
  password_strength.innerHTML = strength;
};

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const reload = () => {
  setTimeout(() => {
    window.location.reload();
  }, 1500);
};

const validateUrl = (value) => {
  return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(
    value
  );
};

const diff_hours = (current, dt2, dt1) => {
  var currentDate = moment(current).format("L");
  var timeStart = new Date(currentDate + " " + dt1).getHours();
  var timeEnd = new Date(currentDate + " " + dt2).getHours();
  var hourDiff = timeEnd - timeStart;

  return hourDiff;
};

const getTimeDiffrence = (start, end) => {
  let gap = 12 * 60 * 60 * 1000;
  let date = "2023-02-10";

  let startDate = new Date(`${date} ${start}`);
  let endDate = new Date(`${date} ${end}`);
  let startDateHours = startDate.getHours();
  let endDateHours = endDate.getHours();

  if (startDateHours > endDateHours) {
    endDate.setDate(startDate.getDate() + 1);
  }

  let diff = endDate.getTime() - startDate.getTime();
  if (diff > gap) {
    return true;
  } else {
    return true;
  }
};

let postcode;
const locationHandler = (place) => {
  // console.log(place);
  for (const component of place.address_components) {
    // @ts-ignore remove once typings fixed
    const componentType = component.types[0];
    // eslint-disable-next-line default-case
    switch (componentType) {
      case "postal_code": {
        postcode = `${component.long_name}${postcode}`;
        document.querySelector("#postcode").value = component.long_name;
        break;
      }
      case "postal_code_suffix": {
        postcode = `${postcode}-${component.long_name}`;
        break;
      }
      case "locality":
        document.querySelector("#locality").value = component.long_name;
        break;

      case "country":
        document.querySelector("#country").value = component.long_name;
        break;
    }
  }
};

const getArticleThumbUrl = (fileName) => {
  return SERVER_URL + "article_thumbs/" + fileName;
};
const getUserAvatar = (fileName) => {
  return SERVER_URL + "avatars/" + fileName;
};

const topBlogCategories = [
  { name: "Technology", key: "technology", img: cat1 },
  { name: "Business", key: "business", img: cat2 },
  { name: "Marketing", key: "marketing", img: cat3 },
  { name: "Health", key: "health", img: cat4 },
  { name: "Travel", key: "travel", img: cat5 },
  { name: "Food", key: "food", img: cat6 },
  { name: "Fashion", key: "fashion", img: cat7 },
  { name: "Entertainment", key: "entertainment", img: cat8 },
  { name: "Sports", key: "sports", img: cat9 },
  { name: "Politics", key: "politics", img: cat10 },
];

let constData = {
  getUserAvatar,
  getArticleThumbUrl,
  getBorderColor,
  checkError,
  checkErrorFloat,
  phoneRegExp,
  headerData,
  checkPasswordStrength,
  reload,
  validateUrl,
  diff_hours,
  getTimeDiffrence,
  locationHandler,
  topBlogCategories,
};

export default constData;
