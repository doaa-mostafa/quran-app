import React from "react";

const Sidebar = ({ error, setError }) => {
  return (
    // {error.length}

    <div className="w-64 pb-5 top-0  bg-white  p-2 lg:px-5 shadow-md dark:bg-[#1b1c1e] ">
      {/* section one */}
      <div className="fixed w-48 ">
        <div className="text-2xl pt-10 pb-7 ">الأخطاء الجلية</div>
        <div className="border border-gray-300 rounded-md">
          <div className="p-2">
            <span dangerouslySetInnerHTML={{ __html: error }} />
          </div>
          <div className=" bg-gray-200 dark:text-black text-center p-1 ">
            الكلمات
          </div>
        </div>
      </div>
      {/* section two */}
    </div>
  );
};

export default Sidebar;
