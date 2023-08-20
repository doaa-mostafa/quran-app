import Head from "next/head";
import Layout from "../components/Layout";
import Link from "next/link";
import styles from "../styles/Form.module.css";
import { useState } from "react";
import { useFormik } from "formik";
import { registerValidate } from "../lib/validate";
import { useRouter } from "next/router";

export default function Signup() {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validate: registerValidate,
    onSubmit,
  });

  async function onSubmit(values) {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    };

    await fetch("http://localhost:3000/api/auth/signup", options)
      .then((res) => res.json())
      .then((data) => {
        if (data) router.push("http://localhost:3000");
      });
  }

  return (
    <>
      <Layout>
        <Head>
          <title>انشاء حساب</title>
        </Head>

        <section className="w-3/4 mx-auto flex flex-col gap-10">
          <div className="title">
            <h1 className="text-gray-800 text-4xl font-bold py-4">
              انشاء حساب
            </h1>
          </div>

          {/* form */}
          <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>
            <div
              className={`${styles.input_group} ${
                formik.errors.username && formik.touched.username
                  ? "border-rose-600"
                  : ""
              }`}
            >
              <input
                type="text"
                name="username"
                placeholder="الأسم"
                className={styles.input_text}
                {...formik.getFieldProps("username")}
              />
            </div>

            <div
              className={`${styles.input_group} ${
                formik.errors.email && formik.touched.email
                  ? "border-rose-600"
                  : ""
              }`}
            >
              <input
                type="email"
                name="email"
                placeholder="البريد الألكترونى"
                className={styles.input_text}
                {...formik.getFieldProps("email")}
              />
            </div>
            <div
              className={`${styles.input_group} ${
                formik.errors.password && formik.touched.password
                  ? "border-rose-600"
                  : ""
              }`}
            >
              <input
                type="password"
                name="password"
                placeholder="كلمة المرور"
                className={styles.input_text}
                {...formik.getFieldProps("password")}
              />
            </div>

            {/* login buttons */}
            <div className="input-button">
              <button type="submit" className={styles.button}>
                انشاء حساب
              </button>
            </div>
          </form>

          {/* bottom */}
          <p className="text-center text-gray-400 ">
            لديك حساب بالفعل ؟{" "}
            <Link href="/login" className="text-teal-500">
              تسجيل الدخول{" "}
            </Link>
          </p>
        </section>
      </Layout>
    </>
  );
}
