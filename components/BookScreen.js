import React from "react";
import RightPage from "./RightPage";
import LeftPage from "./LeftPage";
import styles from "../styles/BookScreen.module.css";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";


const BookScreen = ({
  page,
  setPage,
  EyeIcon,
  setEyeIcon,
  error,
  setError,
  listening,
  serverMessage,
}) => {
  // {console.log(lastMessage,'lastMessage')}
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <>
      <div className="container mx-auto  ">
        <div className="flex flex-col lg:flex-row ">
          <div
            className={`${
              currentTheme === "dark" ? styles.darkshadow : styles.shadowmd
            }`}
          >
            <RightPage
              page={page}
              setPage={setPage}
              EyeIcon={EyeIcon}
              error={error}
              setError={setError}
            />
          </div>
          <div
            className={` ${
              currentTheme === "dark" ? styles.darkshadow2 : styles.shadowmd2
            }`}
          >
            <LeftPage
              page={page}
              setPage={setPage}
              EyeIcon={ EyeIcon}
              error={error}
              setError={setError}
              serverMessage={serverMessage}
              listening={listening}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(BookScreen);
