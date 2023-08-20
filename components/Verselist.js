import React from "react";
import VerseCard from "./VerseCard";
import Image from "next/image";
import styles from "../styles/verselist.module.css";
import { useEffect, useState } from "react";

const Verselist = ({ chapters, Name, imageUrl, setImageUrl }) => {
  const [chapterDetail, setChapterDetail] = useState([]);
  const [surahName, setSurahName] = useState("");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false); // New state to track button disable status

  const handleRemoveBookmark = async () => {
    console.log("Removing bookmark");
  };

  const handleAddBookmark = () => {
    const data = {
      Surah_name: Name.name_arabic,
    };
    setIsButtonDisabled(true); // Disable the button after it is clicked

    fetch("http://localhost:3000/api/historys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Data sent to the database:", result);
        setIsBookmarked(true);
      })
      .catch((error) => {
        console.error("Error sending data to the database:", error);
      });
  };

  useEffect(() => {
    let detailArabic = [];
    chapters.map((item, index) =>
      detailArabic.push({
        id: index + 1,
        arabic: item.text_imlaei,
        verse_key: item.verse_key,
      })
    );
    setChapterDetail(detailArabic);
  }, []);

  return (
    <>
      <div className="">
        <div>
          <div className="font-indopak mb-7 text-xl ">
            <div className={styles.surahName}>سورة {Name.name_arabic} </div>
          </div>
        </div>
        <div className="fixed left-10 border-[2px] bg-gray-50 rounded-full flex  p-2 cursor-pointer ">
          {isBookmarked ? (
            <button onClick={() => handleRemoveBookmark()}>
              <Image
                src="/ic_bookmark_filled.svg"
                alt="bookmark"
                className=""
                width={35}
                height={35}
              />
            </button>
          ) : (
            <button
              onClick={() => handleAddBookmark()}
              disabled={isButtonDisabled}
            >
              <Image
                src="/ic_bookmark_outline.svg"
                alt="bookmark"
                className=""
                width={35}
                height={35}
              />
            </button>
          )}
        </div>
        {Name.bismillah_pre && (
          <div className="flex justify-center ">
            <Image
              src="/bismillah.svg"
              alt="Bismillahirrahmanirrahim"
              width={300}
              height={300}
            />
          </div>
        )}
        <div className=" rounded-xl ml-20  ">
          {chapterDetail.map((item, index) => (
            <div
              key={index}
              className=" flex-col gap-4 p-20 text-right  border-b  border-zinc-200 flex justify-start items-start  text-black-100 rounded-xl cursor-pointer   text-3xl "
            >
              <VerseCard
                chapter={item}
                key={index}
                imageUrl={imageUrl}
                setImageUrl={setImageUrl}
                Name={Name}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Verselist;
