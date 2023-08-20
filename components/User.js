import React from "react";
import { useState, useEffect } from "react";
import { useSession, getSession, signOut } from "next-auth/react";
import MainHeader from "./MainHeader";
import { server } from "../config/index";
import axios from "axios";
import ChapterCard from "./ChapterCard";


const User = ({ session }) => {
  const [chapters, setChapters] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredSurah, setFilteredSurah] = useState([]);
  const [showNavbar, setshowNavbar] = useState(false);
  function toggleNavbar() {
    setshowNavbar(!showNavbar);
  }

  const fetchChapters = async () => {
    const res = await axios.get(`${server}chapters?language=en`);
    setChapters(res.data.chapters);
  };
  useEffect(() => {
    fetchChapters();
  }, []);

  useEffect(() => {
    // Filter the data based on the search query
    const filteredResults = chapters.filter((chapter) => {
      // Perform the filtering based on your specific criteria
      // For example, if you want to search by item name:
      return chapter.name_arabic.includes(searchQuery);
    });

    // Update the filteredData state variable with the filtered results
    setFilteredSurah(filteredResults);
    console.log(filteredResults);
  }, [searchQuery, chapters]);

  function handleSignOut() {
    signOut();
  }

  return (
    <>
      <main className="">
        <MainHeader
          setSearchQuery={setSearchQuery}
          SearchQuery={searchQuery}
          session={session}
        />

        <div>
          <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-20 p-5  m-5  ">
            {filteredSurah.map((chapter, id) => (
              <div key={id}>
                <ChapterCard chapter={chapter} chapters={chapters} />
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default User;
