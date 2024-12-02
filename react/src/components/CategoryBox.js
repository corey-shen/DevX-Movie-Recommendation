import React from "react";
import { IconType } from "react-icons";

const CategoryBox = ({ icon: Icon, label, selected, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`
        flex
        flex-col
        items-center
        justify-center
        gap-2
        p-3
        border-b-2
        hover:text-blue-800
        transition
        cursor-pointer
        ${selected ? "border-b-blue-800" : "border-transparent"}
        ${selected ? "text-blue-800" : "text-gray-500"}
      `}
    >
      <Icon size={30} />
      <div className="font-medium text-sm">{label}</div>
    </div>
  );
};

export default CategoryBox;
