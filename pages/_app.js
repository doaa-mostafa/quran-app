import "tailwindcss/tailwind.css";
import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import "../styles/fonts.css";
import { QueryClientProvider, QueryClient } from "react-query";

import { Provider } from "react-redux";
import { ThemeProvider } from "next-themes";

// create a client
const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider enableSystem={true} attribute="class">
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={pageProps.session}>
        {/* <Provider store={store}> */}
          <Component {...pageProps} />
        {/* </Provider> */}
      </SessionProvider>
    </QueryClientProvider>
    </ThemeProvider>
  );
}

export default MyApp;
