import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";

const MainHeaderIcon = () => {
  const router = useRouter();

  return (
    <div className="flex items-center cursor-pointer py-2 px-2 bg-gray-100 rounded-full   dark:bg-[#282c2f]">
      <div className="inline-block">
        <Link
          href="/Tasmie"
          className={`rounded-full py-1 px-5 text-lg ${
            router.pathname === "/Tasmie"
              ? "bg-white font-bold  dark:bg-[#1b1c1e]"
              : "bg-gray-200 dark:bg-[#282c2f]"
          }`}
        >
          تسميع
        </Link>
      </div>
      <div className="inline-block ml-4">
        <Link
          href="/Audio"
          className={`rounded-full py-2 px-5 text-lg ${
            router.pathname === "/Audio"
              ? "bg-white font-bold dark:bg-[#1b1c1e]"
              : "bg-gray-100  dark:bg-[#282c2f]"
          }`}
        >
          استماع
        </Link>
      </div>

      {/* Responsive styles for mobile */}
    </div>
  );
};

export default MainHeaderIcon;
