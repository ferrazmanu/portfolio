import type { AppProps } from "next/app";
import Head from "next/head";

import { GlobalStyles } from "@/components/globalstyles";
import { wrapper } from "@/store/store";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyles />
      <Head>
        <title>Manuela Ferraz | Portfólio</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default wrapper.withRedux(MyApp);
