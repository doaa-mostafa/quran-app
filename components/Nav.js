import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

const Nav = () => {
  const router = useRouter();
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <div className=" w-54 pb-5 top-0  p-2 shadow-md bg-white dark:bg-[#1b1c1e] ">
      <div className="flex items-center mr-14 mt-11">
        <div className="  border-[2px] flex bg-gray-50 rounded-full p-1 cursor-pointer">
          {currentTheme === "dark" ? (
            <button onClick={() => setTheme("light")}>
              {" "}
              <Image src={"/sun.png"} alt="logo" width={20} height={20} />
            </button>
          ) : (
            <button onClick={() => setTheme("dark")}>
              <Image src={"/moon.png"} alt="logo" width={20} height={20} />
            </button>
          )}
        </div>
        <Link href={"/Surahistory"}>
          <div className=" border-[2px] mr-1 bg-gray-50 rounded-full   p-1 cursor-pointer ">
            <Image
              src="/ic_bookmark_filled.svg"
              alt="bookmark"
              className=""
              width={20}
              height={20}
            />
          </div>
        </Link>
        <div
          className=" border-[2px] mr-1 bg-gray-50 rounded-full p-1 cursor-pointer "
          onClick={() => {
            signOut();
          }}
        >
          <Image
            src="/logout.png"
            alt="logout"
            className=""
            width={20}
            height={20}
          />
        </div>
      </div>

      <div className="py-4 px-8  ">
        <div>
          <Link
            href={"/Tasmie"}
            className={`rounded-full py-2 px-11 text-lg  dark:bg-[#282c2f]${
              router.pathname === "/Tasmie"
                ? "bg-white font-bold border-gray-400 border-[1px]"
                : "bg-gray-200 border border-gray-400"
            }  `}
          >
            بالصفحة
          </Link>
        </div>

        <div className="mt-7">
          <Link
            href={"/"}
            className={` rounded-full py-2 px-12 text-lg dark:bg-[#282c2f] ${
              router.pathname === "/"
                ? "bg-white font-bold border-gray-400 border-[1px]"
                : "bg-gray-200  border border-gray-400"
            }`}
          >
            بالسورة
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Nav;
