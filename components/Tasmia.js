import React, { useEffect, useState } from "react";
import styles from "../styles/Tasmia.module.css";

const Tasmia = ({ Trans, AyaChunks, versenumber, id,  EyeIcon }) => {
  return (
    <div className="text-4xl  cursor-pointer ">
      <span
        className={`${
          EyeIcon === "/hide.png" ? styles.hidden : "font-indopak"
        }`}
      >
        {AyaChunks.map((chunk, i) => {
          let classNames = "font-indopak ";
          if (id == 1) {
            if (chunk === Trans[i]) {
              classNames += `bg-slate-200 `;
            }

            if (Trans[i] && chunk !== Trans[i]) {
              classNames += `text-red-200 `;
            }
            if (!Trans[i]) {
              classNames += `text-gray-800 `;
            }
          }

          return (
            <span key={i} className={classNames}>
              {chunk}{" "}
            </span>
          );
        })}
      </span>
      <div className={styles.container}>
        <div className={styles.border}>
          <span className={styles.versenumber}> {versenumber}</span>
        </div>
      </div>
    </div>
  );
};

export default Tasmia;
