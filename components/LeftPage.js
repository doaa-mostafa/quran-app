import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import styles from "../styles/BookScreen.module.css";
import ColorVerse from "./ColorVerse";

const LeftPage = ({
  EyeIcon,
  page,
  setServerMessage,
  error,
  setError,
  listening,
  serverMessage,
}) => {
  const [verses2, setVerses2] = useState([]);

  const fetchVerses2 = async () => {
    const res = await axios.get(
      `
      https://api.quran.com/api/v4/quran/verses/uthmani_simple?page_number=${
        page + 1
      }`
    );
    setVerses2(res.data.verses);
  };

  useEffect(() => {
    // Fetch verses when the page changes
    fetchVerses2();
  }, [page]);

  return (
    <div className={styles.container}>
      {verses2.map((verse, id) => (
        <ColorVerse
          key={verse.id}
          error={error}
          setError={setError}
          text={verse}
          EyeIcon={EyeIcon}
          serverMessage={serverMessage}
          listening={listening}
          setServerMessage={setServerMessage}
        />
      ))}
    </div>
  );
};

export default React.memo(LeftPage);
