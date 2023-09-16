import Head from "next/head";
import Guest from "../components/Guest";
import User from "../components/User";
import { useSession, getSession, signOut } from "next-auth/react";
// import { useQuranQuery } from './api/quran'

export default function Home() {
  const { data: session } = useSession();
  return (
    <div>
      <Head>
        <title>الرئيسية</title>
      </Head>

      <User />
      {/* {session ? <User session={session} /> : <Guest />} */}
    </div>
  );
}

// export async function getServerSideProps({ req }) {
//   const session = await getSession({ req });

//   if (!session) {
//     return {
//       redirect: {
//         destination: "/login",
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: { session },
//   };
// }
