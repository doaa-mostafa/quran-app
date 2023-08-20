import { server } from "../../../config/index";
import Verselist from "../../../components/Verselist";
import { useState, useEffect } from "react";
import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";
import Nav from "../../../components/Nav";
import { useSession, getSession } from "next-auth/react";
import Head from "next/head";
import Loading from "../../../components/Loading";

const SingleChapter = ({ chapters, Name }) => {
  const [imageUrl, setImageUrl] = useState("/view.png");
  const [showSidebar, setShowSidebar] = useState(false);
  const [showNavbar, setshowNavbar] = useState(false);
  const [loading, setLoading] = useState(true); // Added loading state

  function toggleSidebar() {
    setShowSidebar(!showSidebar);
  }

  function toggleNavbar() {
    setshowNavbar(!showNavbar);
  }

  useEffect(() => {
    setLoading(false); // Simulating the loading completion
  }, []); // Empty dependency array to run the effect only once

  return (
    <>
      <Head>
        <title>{Name.name_arabic}</title>
      </Head>
      <div className="dark:bg-[#282c2f]">
        <Header
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
          toggleSidebar={toggleSidebar}
          toggleNavbar={toggleNavbar}
        />
        <main className="flex">
          <div className="flex">
            {showNavbar && <Nav />}
            {showSidebar && <Sidebar />}
          </div>
          <div className="">
            {loading ? (
              <Loading /> // Render the loading component while loading
            ) : (
              <>
                <Verselist
                  chapters={chapters}
                  Name={Name}
                  imageUrl={imageUrl}
                  setImageUrl={setImageUrl}
                />
              </>
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export async function getServerSideProps({ req, params }) {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const chapterid = params.id;

  const [data1Res, data2Res] = await Promise.all([
    fetch(
      `${server}quran/verses/imlaei?chapter_number=${chapterid}&sort=page_number`
    ),
    fetch(`${server}chapters/${chapterid}?language=en`),
  ]);

  const chapters = await data1Res.json();
  const name = await data2Res.json();

  return {
    props: {
      session,
      chapters: chapters.verses,
      Name: name.chapter,
    },
  };
}

export default SingleChapter;
