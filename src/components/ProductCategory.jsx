import React from "react";

function ProductCategory(props) {
  const { name } = props;
  return (
    <option value={name} className="text-black">
      {name}
    </option>
  );
}

export default ProductCategory;
