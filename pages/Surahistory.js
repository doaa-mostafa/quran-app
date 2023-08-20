import React from "react";
import History from "../components/History";
import MainHeader from "../components/MainHeader";
import Head from "next/head";

const Surahistory = () => {
  return (
    <>
      <Head>
        <title>history</title>
      </Head>
      <MainHeader />

      <div className="">
        <History />
      </div>
    </>
  );
};

export default Surahistory;
