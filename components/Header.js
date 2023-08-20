import Link from "next/link";
import React from "react";
import styles from "../styles/Header.module.css";
import { useState, useEffect } from "react";
import Image from "next/image";
import { SearchIcon } from "@heroicons/react/outline";
import HeaderIcon from "./HeaderIcon";
import { AiOutlineClose } from "react-icons/ai";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";

const Header = ({
  imageUrl,
  setImageUrl,
  toggleSidebar,
  toggleNavbar,
  error,
  setError,
}) => {
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  const currentTheme = theme === "system" ? systemTheme : theme;

  const ToggleEye = () => {
    if (imageUrl === "/view.png") {
      setImageUrl("/hide.png");
    } else {
      setImageUrl("/view.png");
    }
  };

  const handleShowDropdown = () => setShowDropdown((prev) => true);

  const handleHideDropdown = () => setShowDropdown((prev) => false);

  return (
    <div className=" pb-4 top-0 z-50 bg-white flex flex-row p-2 lg:px-5 shadow-md pt-4 dark:bg-[#1b1c1e] dark:text-white">
      <div className="cursor-pointer ">
        <Image
          src={"/hamburger.png"}
          alt="menu"
          width={35}
          height={35}
          onClick={handleShowDropdown}
        />
      </div>

      {showDropdown && (
        <div className={styles.dropdown}>
          <AiOutlineClose
            className={styles.closeIcon + "dark:bg-black"}
            onClick={handleHideDropdown}
          />

          <div className={styles.container}>
            <div className=" border-[2px]  bg-gray-50 rounded-full flex  p-1 cursor-pointer">
              {currentTheme === "dark" ? (
                <button onClick={() => setTheme("light")}>
                  {" "}
                  <Image src={"/sun.png"} alt="sun" width={20} height={20} />
                </button>
              ) : (
                <button onClick={() => setTheme("dark")}>
                  <Image src={"/moon.png"} alt="moon" width={20} height={20} />
                </button>
              )}
            </div>

            <Link href={"/Surahistory"}>
              <div className=" border-[2px] mr-5 bg-gray-50 rounded-full  p-1 cursor-pointer ">
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
              className=" border-[2px] mr-5 bg-gray-50 rounded-full  p-1 cursor-pointer "
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

          <div className="py-4  ">
            <div>
              <Link
                href={"/Tasmie"}
                className={`rounded-full py-2 px-11 text-lg  dark:text-white dark:bg-black ${
                  router.pathname === "/Tasmie"
                    ? "bg-white font-bold border-gray-400 border-[1px] "
                    : "bg-gray-200 border border-gray-400"
                }  `}
              >
                بالصفحة
              </Link>
            </div>

            <div className="mt-7">
              <Link
                href={"/"}
                className={` rounded-full py-2 px-12 text-lg  dark:text-black ${
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

        //-------------------------------------------------------------------------------------------
      )}

      {/* Right */}
      <div className="flex items-center sm:space-x-2 justify-end lg:mr-10">
        {/* Profile Picture */}
        <div className={styles.sidebarbutton}>
          <div onClick={toggleSidebar}> أخطاء </div>
        </div>
        {/* <p className="whitespace-nowrap font-semibold pr-3 ">Doaa Mostafa</p> */}
        <div className="dark:bg-white dark:rounded-full">
          <Image
            src={imageUrl}
            width={25}
            height={25}
            alt="viewicon"
            className={styles.eye}
            onClick={() => ToggleEye()}
          />
        </div>
      </div>
      {/* Center */}
      <div className="flex justify-center flex-grow  ">
        <div className="flex space-x-6 md:space-x-2">
          <HeaderIcon />
        </div>
      </div>
      {/* Left */}
      <div className="flex items-center ">
        <div className="flex ml-2 items-center rounded-full bg-gray-100 p-1.5 dark:bg-[#282c2f]">
          <SearchIcon className="h-5 text-gray-600 " />
          <input
            type="text"
            className="hidden md:inline-flex  ml-2 items-center bg-transparent outline-none placeholder-gray-500 flex-shrink "
            placeholder="بحث"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
