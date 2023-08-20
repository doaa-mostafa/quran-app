import React from "react";
import styles from "../styles/ColorVerse.module.css";
import { useEffect, useState } from "react";
import { toArabic } from "arabic-digits";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import "@fontsource/amiri-quran"; // Defaults to weight 400.

const ColorVerse = ({ text, imageUrl, scrollRef, error, setError }) => {
  const versenumber = toArabic(parseInt(text.id));
  const [highlightedText, setHighlightedText] = useState("");
  const [unhighlightedText, setunHighlightedText] = useState("");

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();
  //  console.log(text.text_uthmani_simple.split(' '))
  const Aya = text.text_uthmani_simple;
  const AyaChunks = Aya.split(" ");
  const CleanTrans = transcript.replace(/\./g, "");
  const Trans = CleanTrans.split(" ");

  useEffect(() => {
    if (!listening) {
      console.log("not listening");
    } else {
      setCounter((prevCounter) => prevCounter + 1);
    }
  }, [listening]);

  const [counter, setCounter] = useState(0);

  // const [counter, setCounter] = useState(() => {
  //   // Retrieve the value from localStorage or set it to 12 if not found
  //   const storedCounter = localStorage.getItem("counter");
  //   return storedCounter ? parseInt(storedCounter) : 0;
  // });

  // Update the localStorage value whenever the counter changes
  useEffect(() => {
    localStorage.setItem("counter", counter.toString());
  }, [counter]);

  useEffect(() => {
    let highlighted = "";

    if (text.id === counter) {
      let highlighted = "";

      let error = [];
      for (let i = 0; i < AyaChunks.length; i++) {
        // let indexInArr2 = Trans.indexOf(AyaChunks[i]);

        if (AyaChunks[i] === Trans[i]) {
          highlighted += `<span class="bg-green-200 text-black font-indopak">${AyaChunks[i]} </span>`;
          setHighlightedText(highlighted);
        } else if (Trans[i] && AyaChunks[i] !== Trans[i]) {
          highlighted += `<span class="bg-red-200 text-black font-indopak">${AyaChunks[i]} </span>`;
          error += AyaChunks[i];
          setHighlightedText(highlighted);
          setError(error);

          // console.log(error)
        } else {
          highlighted += `<span class="">${AyaChunks[i]} </span>`;

          setHighlightedText(highlighted);
        }
      }
    } else {
      highlighted += `<span class="">${Aya} </span>`;

      setHighlightedText(highlighted);
    }
  }, [Trans, AyaChunks, Aya]);

  return (
    <span>
      <span
        className={`${
          imageUrl === "/hide.png" ? styles.hidden : "font-indopak"
        }`}
      >
        <span
          dangerouslySetInnerHTML={{
            __html: highlightedText,
          }}
        />
      </span>
      <div className={styles.container}>
        <div className={styles.border}>
          {"  "}
          <div className={styles.versenumber}>
            <span className="dark:text-white">{versenumber}</span>
          </div>
          {"  "}
        </div>
      </div>
      {/* {console.log(scrollRef)} */}
    </span>
  );
};

export default ColorVerse;
