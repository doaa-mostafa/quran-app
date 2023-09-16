import styles from "../styles/layout.module.css";

function Layout({ children }) {
  return (
    <>
      <div className=" mt-16 dark:text-black ">
        <div className="m-auto  bg-slate-50 rounded-md  lg:w-2/4 h-3/4 grid lg:grid-cols-2">
          <div className={styles.imgStyle}>
            <div className={styles.Img}></div>
          </div>
          <div className="right flex flex-col justify-evently bg-white-200">
            <div className="text-center py-10 ">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Layout;
