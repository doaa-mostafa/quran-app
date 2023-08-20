import React from "react";
import Link from "next/link";

const Guest = () => {
  return (
    <div>
      <main className="container mx-auto text-center py-20 bg-[#f0f4f7]">
        <h3 className="text-4xl font-bold">صفحة الضيوف</h3>

        <div className="flex justify-center">
          <Link
            href={"/login"}
            className="mt-5 px-10 py-1 rounded-sm bg-teal-500 text-gray-50"
          >
            تسجيل الدخول
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Guest;
