import Link from "next/link";
import React from "react";
import styles from "../styles/MainHeader.module.css";
import { useState, useEffect } from "react";
import Image from "next/image";
import { AiOutlineClose } from "react-icons/ai";
import { SearchIcon } from "@heroicons/react/outline";
import MainHeaderIcon from "./MainHeaderIcon";
import { signIn, signOut, useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
const MainHeader = ({
  imageUrl,
  setImageUrl,
  toggleSidebar,
  toggleNavbar,
  setSearchQuery,
  searchQuery,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { data: session } = useSession();
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  const currentTheme = theme === "system" ? systemTheme : theme;

  const handleShowDropdown = () => setShowDropdown((prev) => true);

  const handleHideDropdown = () => setShowDropdown((prev) => false);

  const loggedIn = false;

  const ToggleEye = () => {
    if (imageUrl === "/view.png") {
      setImageUrl("/hide.png");
    } else {
      setImageUrl("/view.png");
    }
  };

  return (
    <div className="pb-4 top-0 z-50 bg-white flex flex-row items-center p-2 lg:px-5 shadow-md pt-5 dark:bg-[#1b1c1e]">
      {/* Right */}

      <div className="cursor-pointer flex flex-col items-center justify-end">
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
            className={styles.closeIcon}
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
                className={`rounded-full py-2 px-11 text-lg  dark:text-black ${
                  router.pathname === "/Tasmie"
                    ? "bg-white font-bold  border-gray-400 border-[1px] "
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
      )}

      {/* Profile Picture */}
      {/* <div className="flex flex-col items-center sm:flex-row sm:items-center sm:space-x-2 justify-end">
        
        <div className="flex items-center cursor-pointer mr-7 ml-7 mb-1.5">
          <Image
            onClick={handleShowDropdown}
            className=""
            src="/user.png"
            alt="user"
            width={50}
            height={50}
          />
          {showDropdown && (
            <div className={styles.dropdown}>
              <AiOutlineClose
                className={styles.closeIcon}
                onClick={handleHideDropdown}
              />
              <button
                onClick={() => {
                  signOut();
                  handleHideDropdown();
                }}
                className={styles.logout}
              >
                تسجيل الخروج
              </button>
            </div>
          )}
        </div>
        <h5 className=" mt-2 sm:mt-0 ">
          {session.user.email && session.user.email.split("@")[0]}
        </h5>
      </div> */}

      {/* Center */}
      <div className="flex justify-center flex-grow lg:mr-56   ">
        <div className="flex items-center ">
          <MainHeaderIcon />
        </div>
      </div>
      {/* Left */}
      <div className="flex items-center lg:mt-0 lg:ml-5">
        <div className="flex items-center rounded-full bg-gray-100 p-2 dark:bg-[#282c2f]">
          <SearchIcon className="h-6 text-gray-600" />
          <input
            type="text"
            className="hidden md:inline-flex ml-2 items-center bg-transparent outline-none placeholder-gray-500 flex-shrink"
            placeholder="بحث"
            // value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      {/* Responsive styles for mobile */}
    </div>
  );
};

export default MainHeader;
