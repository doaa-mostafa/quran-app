import Head from "next/head";
import Layout from "../components/Layout";
import Link from "next/link";
import styles from "../styles/Form.module.css";
import Image from "next/image";
import { useSession, signIn, signout } from "next-auth/react";
import { useFormik } from "formik";
import login_validate from "../lib/validate";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: login_validate,
    onSubmit,
  });

  async function onSubmit(values) {
    const status = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
      callbackUrl: "/",
    });

    if (status.ok) router.push(status.url);
  }

  // Google Handler function
  async function handleGoogleSignin() {
    signIn("google", { callbackUrl: "http://localhost:3000" });
  }

  return (
    <Layout>
      <Head>
        <title>تسجيل الدخول</title>
      </Head>

      <section className="w-3/4 mx-auto flex flex-col gap-10">
        <div className="title">
          <h1 className="text-gray-800 text-4xl font-bold py-4">
            تسجيل الدخول
          </h1>
        </div>

        {/* form */}
        <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>
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
              تسجيل الدخول
            </button>
          </div>

          <div className="input-button">
            <button
              type="button"
              onClick={handleGoogleSignin}
              className={styles.button_custom}
            >
              سجل باستخدام جوجل{" "}
              <Image
                src={"/google.svg"}
                width="20"
                height={20}
                alt="googleicon"
              ></Image>
            </button>
          </div>
        </form>

        {/* bottom */}
        {/* bottom */}
        <p className="text-center text-gray-400 ">
          ليس لديك حساب بعد؟{" "}
          <Link href="/signup" className="text-teal-500">
            انشاء حساب{"  "}
          </Link>
        </p>
      </section>
    </Layout>
  );
}
