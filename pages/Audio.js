import Head from "next/head";
import BookScreen from "../components/BookScreen";
import styles from "../styles/BookScreen.module.css";
import Header from "../components/Header";
import ButtonBook from "../components/ButtonBook";
import Image from "next/image";
import Nav from "../components/Nav";
import { useSession, getSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState, useRef } from "react";
import MainHeader from "../components/MainHeader";

const Audio = () => {
  const audioRef = useRef(null);
  const [isPlaying, setPlaying] = useState(false);

  const [pagenumber, setPagenumber] = useState(1);

  const handleButtonClick = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
      setPlaying(true);
    } else {
      audioRef.current.pause();
      setPlaying(false);
    }
  };

  useEffect(() => {
    audioRef.current.src =
      "https://download.quranicaudio.com/qdc/abdul_baset/mujawwad/1.mp3";
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  return (
    <div className="bg-white">
      <Head>
        <title>استماع</title>
      </Head>
      <MainHeader />

      <BookScreen page={pagenumber} setPage={setPagenumber} />

      <audio ref={audioRef}>
        Your browser does not support the audio element.
      </audio>

      <button
        onClick={handleButtonClick}
        className="bottom-10 right-20  absolute bg-[#6875b3] rounded-full p-2  "
      >
        {isPlaying ? (
          <Image src="/pause.png" alt="pause" width={60} height={60} />
        ) : (
          <Image src="/play.png" alt="play" width={60} height={60} />
        )}
      </button>
    </div>
  );
};

export default Audio;

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
