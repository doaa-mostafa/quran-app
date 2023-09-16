import Image from "next/image";
import styles from "../styles/VerseCard.module.css";
import { useState, useEffect } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const Mic = () => {
  const [micToggle, setMicToggle] = useState(false);

  const {
    listening,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const toggleHandler = () => {
    if (!micToggle) {
      setMicToggle(
        SpeechRecognition.startListening({
          language: "ar-EG",
          //  continuous: true,
        })
      );
    } else {
      setMicToggle(SpeechRecognition.stopListening);
    }
    setMicToggle(!micToggle);
  };

  useEffect(() => {
    if (!browserSupportsSpeechRecognition) {
      return <div>Speech recognition is not supported by your browser.</div>;
    }
  }, [browserSupportsSpeechRecognition]);

  return (
    <div>
      <div className="fixed w-fit bottom-0 left--10 p-4 flex  cursor-pointer">
        <Image
          className={`${listening ? styles.micOn : styles.micOf} `}
          src={"/mic2.png"}
          width={50}
          height={50}
          alt="mic"
          onClick={() => {
            toggleHandler();
          }}
        />
      </div>
    </div>
  );
};

export default Mic;
