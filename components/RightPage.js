import React from "react";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import styles from "../styles/BookScreen.module.css";
import ColorVerse from "./ColorVerse";
import { useRouter } from "next/router";

const RightPage = ({
  imageUrl,
  error,
  setError,
  page,
  setPage,
  serverMessage,
  listening,
  setServerMessage,
}) => {
  const [verses, setVerses] = useState([]);
  const router = useRouter();

  const fetchVerses = async () => {
    const res = await axios
      .get(
        `
        https://api.quran.com/api/v4/quran/verses/uthmani_simple?page_number=${page}`
      )
      .then((response) => {
        const data = response.data.verses;

        setVerses(data);
      });
  };

  useEffect(() => {
    // Fetch verses when the page changes
    fetchVerses();
  }, [page]);

  return (
    <div className={styles.container}>
      {verses.map((verse, id) => (
        <ColorVerse
          key={verse.id}
          error={error}
          setError={setError}
          text={verse}
          imageUrl={imageUrl}
          serverMessage={serverMessage}
          listening={listening}
          setServerMessage={setServerMessage}
        />
      ))}
    </div>
  );
};

export default React.memo(RightPage);
