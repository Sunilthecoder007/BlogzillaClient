import React from "react";
import BottomBorder from "./BottomBorder";

const AppHeading = ({ title }) => {
  return (
    <>
      <h2 className="text-2xl max-[1024px]:text-xl max-[420px]:text-lg font-semibold text-gray-800">
        {title}
      </h2>
      <BottomBorder />
    </>
  );
};

export default AppHeading;
