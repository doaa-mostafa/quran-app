import React from "react";
import { AiOutlineHeart } from "react-icons/ai";

const HeartButton = () => {
  const hasFavourite = false;
  const toggleFavourite = () => {};
  return (
    <div
      onClick={toggleFavourite}
      className="
    relative hover:opacity-80 transition cursor-pointer"
    >
      <AiOutlineHeart
        size={20}
        className="fill-gray-400 absolute  -right-[25px]"
      />
    </div>
  );
};

export default HeartButton;
