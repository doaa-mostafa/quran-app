import BookScreen from "../components/BookScreen";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import ButtonBook from "../components/ButtonBook";
import Mic from "../components/Mic";
import Sidebar from "../components/Sidebar";
import Nav from "../components/Nav";
import { useSession, getSession, signOut } from "next-auth/react";
// import { io } from "socket.io-client";
// const socket = io("ws://localhost:50000");
import Head from "next/head";
import { useRouter } from "next/router";

const Tasmie = () => {
  const router = useRouter();

  const [page, setPage] = useState(() => {
    if (typeof window !== "undefined") {
      // Retrieve the value from localStorage or set it to 1 if not found
      const storedPage = localStorage.getItem("page");
      return storedPage ? parseInt(storedPage) : 1;
    }
    return 1;
  });
  // ... other state variables and useEffect

  // Update the localStorage value whenever the page changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("page", page.toString());
    }
  }, [page]);

  const [imageUrl, setImageUrl] = useState("/view.png");
  const [error, setError] = useState("");
  const [showNavbar, setshowNavbar] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  // const [serverMessage, setServerMessage] = useState([""]);
  // const [messages, setMessages] = useState([]);
  // const [listening, setListening] = useState(false);

  // socket.on("from-server", (message) => {
  //   if (message.end) setListening(false);
  //   setMessages([...messages, message]);
  // });

  // Find the last result value for each set of objects
  // let lastMessage = "";
  // const lastResults = [];
  // let currentResult = null;
  // // let lastMessage = null;
  // //-------------------get last obj--------------------------------------------
  // messages.forEach((obj) => {
  //   if (obj.result) {
  //     currentResult = obj.result.toString();
  //   } else if (obj.end) {
  //     if (currentResult) {
  //       lastResults.push(currentResult);
  //       currentResult = null;
  //     }
  //   }
  // });

  // useEffect(() => {
  //   setServerMessage(lastMessage);
  // });
  // console.log(serverMessage, "serverMessage");

  //--------------------------------------------------------------------

  // Get the last result
  // if (lastResults.length > 0) {
  //   lastMessage = lastResults[lastResults.length - 1];
  // }

  // {
  //   console.log(lastMessage, "lastMessage");
  // }

  // {
  //   console.log(messages, "message");
  // }

  //---------------------------------------------------------------------------
  // socket.on("youCanSpeak", (message) => {
  //   setListening(true);
  // });

  // const sendToServer = () => {
  //   // setListening(true);
  //   socket.emit("to-server", "hello");
  // };

  function toggleSidebar() {
    setShowSidebar(!showSidebar);
  }

  function toggleNavbar() {
    setshowNavbar(!showNavbar);
  }

  return (
    <div className="bg-white dark:bg-[#282c2f]">
      <Head>
        <title>تسميع</title>
      </Head>
      <Header
        imageUrl={imageUrl}
        setImageUrl={setImageUrl}
        toggleSidebar={toggleSidebar}
        toggleNavbar={toggleNavbar}
        error={error}
        setError={setError}
      />
      <main className="flex ">
        {showNavbar && <Nav />}
        {showSidebar && <Sidebar error={error} setError={setError} />}

        <BookScreen
          page={page}
          setPage={setPage}
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
          error={error}
          setError={setError}
        />

        <div className="fixed w-fit bottom-0  right-52 p-4 flex  cursor-pointer"></div>
      </main>

      {/* mic for message come from server */}

      <Mic />

      <ButtonBook page={page} setPage={setPage} />
    </div>
  );
};

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

export default React.memo(Tasmie);
