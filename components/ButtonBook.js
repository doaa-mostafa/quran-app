import Link from "next/link";
import React from "react";
import Image from "next/image";

const ButtonBook = ({ page, setPage }) => {
  const handlePrevAyah = () => {
    setPage(page - 2);
  };

  const handleNextAyah = () => {
    setPage(page + 2);
  };

  return (
    <div className="   shadow-sm flex   justify-center ">
      <div className="inline-flex ">
        <button
          onClick={handlePrevAyah}
          disabled={page === 1}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-full rounded-l"
        >
          <Image src="/next.png" alt="next ayah" width={20} height={20} />
        </button>
        <button
          onClick={handleNextAyah}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-full rounded-r"
        >
          <Image
            src="/left-chevron.png"
            alt="prev ayah"
            width={20}
            height={20}
          />
        </button>
      </div>
    </div>
  );
};

export default ButtonBook;
