import React from "react";

function TopProductCategory({ props }) {
  return props.map(({ name, category, soldItem }) => {
    return (
      <div className="flex flex-row bg-gray-200 text-black justify-between mx-32 py-3">
        <div className="pl-5 font-roboto">{name}</div>
        <div className="pr-24">{soldItem}</div>
      </div>
    );
  });
}

export default TopProductCategory;
