import { server } from "../../../../config/index";
import { useRouter } from "next/router";
import { useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import Mic from "../../../../components/Mic";
import Tasmia from "../../../../components/Tasmia";
import { toArabic } from "arabic-digits";
import Header from "../../../../components/Header";
import Sidebar from "../../../../components/Sidebar";
import { getSession } from "next-auth/react";
import Head from "next/head";

const Verseid = ({ Data, Name }) => {
  const router = useRouter();
  const { verseid } = router.query;
  let Aya = Data[verseid - 1].text_imlaei;
  const [EyeIcon, setEyeIcon] = useState("/view.png");
  const [showSidebar, setShowSidebar] = useState(false);
  const [showNavbar, setshowNavbar] = useState(false);
  function toggleSidebar() {
    setShowSidebar(!showSidebar);
  }

  function toggleNavbar() {
    setshowNavbar(!showNavbar);
  }

  // let SurahName = names.chapters[verseid].name_arabic
  const versenumber = toArabic(parseInt(verseid));
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  // speech recognition Algorithm -------------------------------------------------

  const AyaChunks = Aya.split(" ");
  const CleanTrans = transcript.replace(/\./g, "");
  const Trans = CleanTrans.split(" ");

  // ------------------------------------------------------------------------------
  return (
    <div className="">
      <Head>
        <title>تسميع</title>
      </Head>
      <Header
        EyeIcon={EyeIcon}
        setEyeIcon={setEyeIcon}
        toggleSidebar={toggleSidebar}
        toggleNavbar={toggleNavbar}
      />
      <main>
        <div className="flex ">{showSidebar && <Sidebar />}</div>
        <div className="">
          <div className="text-black-100 text-3xl  mt-5 p-5">
            <div className="mt-10">
              {Name.name_arabic}
              <div className="inline-block ml-10 mr-2">
                {" "}
                اية {toArabic(verseid)}
              </div>
            </div>
          </div>

          <div className="mt-20 text-center pr-52 pl-52">
            <Tasmia
              EyeIcon={EyeIcon}
              setEyeIcon={setEyeIcon}
              AyaChunks={AyaChunks}
              Trans={Trans}
              Aya={Aya}
              versenumber={versenumber}
            />
          </div>

          {/* Rest of the code */}
        </div>
      </main>
      <div className="">
        <Mic />
      </div>
    </div>
  );
};

export default Verseid;

//-----------------------------------------------------------------------

export async function getServerSideProps(context) {
  const chapterid = context.params.id;

  const [data1Res, data2Res] = await Promise.all([
    fetch(`${server}quran/verses/imlaei?chapter_number=${chapterid}`),
    fetch(`${server}chapters/${chapterid}?language=en`),
  ]);

  const Data = await data1Res.json();
  const name = await data2Res.json();

  const req = context.req;
  // const session = await getSession({ req });

  // if (!session) {
  //   return {
  //     redirect: {
  //       destination: "/login",
  //       permanent: false,
  //     },
  //   };
  // }

  return {
    props: {
      Data: Data.verses,
      Name: name.chapter,
      // session,
    },
  };
}
