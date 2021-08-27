import { GlobalStyles, MantineProvider, NormalizeCSS } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { AppProps } from "next/app";
import Head from "next/head";
import { useEffect } from "preact/hooks";
import { createGenerateId, JssProvider } from "react-jss";

export default function MyApp(props: AppProps) {
  const { Component, pageProps } = props;

  useEffect(() => {
    const jssStyles = document.getElementById("mantine-ssr-styles");
    if (jssStyles) {
      jssStyles?.parentElement?.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <JssProvider generateId={createGenerateId()}>
        <Head>
          <title>Mantine next example</title>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />
        </Head>

        <MantineProvider
          theme={{
            colorScheme: "light",
            primaryColor: "primary", // colors[5]
            colors: {
              // Add your color
              primary: [
                "#FEE7EE",
                "#FBBBD0",
                "#F990B1",
                "#F76493",
                "#F43974",
                "#F20D56",
                "#C10B45",
                "#910834",
                "#610522",
                "#300311",
              ],
              // or replace default theme color
              blue: ["#E9EDFC", "#C1CCF6", "#99ABF0" /* ... */],
            },

            shadows: {
              // other shadows (xs, sm, lg) will be merged from default theme
              md: "1px 1px 3px rgba(0,0,0,.25)",
              xl: "5px 5px 3px rgba(0,0,0,.25)",
            },

            headings: {
              fontFamily: "Roboto, sans-serif",
              sizes: {
                h1: { fontSize: 30 },
              },
            },
          }}
        >
          <NormalizeCSS />
          <GlobalStyles />
          <NotificationsProvider>
            <Component {...pageProps} />
          </NotificationsProvider>
        </MantineProvider>
      </JssProvider>
    </>
  );
}
