import Link from "next/link";
import React from "react";
import Tasmia from "./Tasmia";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { toArabic } from "arabic-digits";

const VerseCard = ({ chapter,  EyeIcon, setEyeIcon }) => {
  const Chapter = chapter.verse_key.split(":")[0];
  const Verse = chapter.verse_key.split(":")[1];

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  let Aya = chapter.arabic;
  const versenumber = toArabic(parseInt(Verse));

  const AyaChunks = Aya.split(" ");
  const CleanTrans = transcript.replace(/\./g, "");
  const Trans = CleanTrans.split(" ");

  return (
    <Link href={`/chapter/${Chapter}/${Verse}`}>
      <div className=" ">
        <Tasmia
          AyaChunks={AyaChunks}
          Trans={Trans}
          Aya={Aya}
          versenumber={versenumber}
          chapter={chapter}
          EyeIcon={EyeIcon}
          Verse={Verse}
          Chapter={Chapter}
          setEyeIcon={setEyeIcon}
        />
      </div>
    </Link>
  );
};

export default VerseCard;
