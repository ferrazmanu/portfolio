import type { AppProps } from "next/app";
import Head from "next/head";

import { GlobalStyles } from "@/components/globalstyles";
import { wrapper } from "@/store/store";
import { FloatingCat } from "@/components/FloatingCat";
import { Header } from "@/components/Header";
import { TranslationButton } from "@/components/TranslationButton";
import { Button } from "@/components/Button";
import { SlytherinSnake } from "@/components/SlytherinSnake";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyles />
      <Head>
        <title>Manuela Ferraz | Portfolio</title>
      </Head>

      <SlytherinSnake />

      <TranslationButton />
      <Header />

      <Component {...pageProps} />
    </>
  );
}

export default wrapper.withRedux(App);
