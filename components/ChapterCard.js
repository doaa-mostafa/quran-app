import Link from "next/link";
import HeartButton from "./HeartButton";

const ChapterCard = ({ chapter }) => {
  const revelationPlace =
    chapter.revelation_place === "makkah" ? "مكية" : "مدنية";
  return (
    <Link href={`/chapter/${chapter.id}`}>
      <div
        className={`shadow-md rounded-xl text-right  ${
          chapter.name_arabic === "الفاتحة"
            ? " dark:bg-[#1b1c1e]  text-[27px] lg:py-5  px-5 cursor-pointer bg-white border-[#19a16e] border-[5px] font-bold  "
            : " dark:bg-[#1b1c1e]  text-[27px] lg:py-5  px-4 cursor-pointer  bg-white font-bold "
        }`}
      >
        <div className="flex justify-between ">
          <div className="bg-[#d9fdf4] rounded-full px-2 py-1 dark:bg-[#e9fdfa]  ">
            <div className="text-[10px] text-right text-green-600">
              {chapter.id}
            </div>
          </div>

          <div className="">
            <HeartButton />
          </div>
        </div>
        {chapter.name_arabic}
        <div
          className={`${
            chapter.name_arabic === "الفاتحة"
              ? "text-green-500 text-[15px] font-bold"
              : "text-gray-400 text-[15px]  "
          }`}
        >
          {revelationPlace}
        </div>
      </div>
    </Link>
  );
};

export default ChapterCard;
