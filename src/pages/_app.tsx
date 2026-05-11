import type { AppProps } from "next/app";
import Head from "next/head";
import { Provider } from "react-redux";

import { wrapper } from "@/store/store";

import "@/styles/globals.css";

function App(props: AppProps) {
  const { Component, pageProps } = props;
  const { store } = wrapper.useWrappedStore(props);

  return (
    <Provider store={store}>
      <Head>
        <title>Manuela Ferraz</title>
        <meta
          name="description"
          content="Portfólio de Manuela Ferraz, desenvolvedora Front-End."
        />
      </Head>

      <Component {...pageProps} />
    </Provider>
  );
}

export default App;
