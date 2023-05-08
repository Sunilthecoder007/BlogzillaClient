import React from "react";
import { Link, useNavigate } from "react-router-dom";

const TrendingCategory = ({ category }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        navigate("/category/" + category.key);
      }}
      class="relative rounded-lg flex shadow-md cursor-pointer hover:shadow-xl"
    >
      <img src={category.img} className="rounded-2xl " />
      <Link
        to={"/category/" + category.key + ""}
        className=" bg-white/75 rounded-full text-sm font-semibold px-4 py-1 mx-auto bottom-4 absolute left-0 right-0 w-min"
      >
        {category.name}
      </Link>
    </div>
  );
};

export default TrendingCategory;
