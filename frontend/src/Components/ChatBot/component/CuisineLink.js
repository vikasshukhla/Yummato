import React from "react";

const CuisineLink = ({ payload }) => {
  return (
    <div className="custom-link">
      <a
        href={`http://localhost:3000/shoppingcart?cuisine=${payload.selectedCuisine}`}
      >
        Click Here
      </a>
    </div>
  );
};

export default CuisineLink;
