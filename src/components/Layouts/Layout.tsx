import Head from "next/head";
import React, { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
  title?: string | undefined;
};

export default function Layout({ children, title }: LayoutProps): JSX.Element {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <div>{children}</div>
      <style global jsx>{`
        html,
        body,
        body > div:first-child,
        div#__next,
        div#__next > div {
          height: 100%;
        }
      `}</style>
    </>
  );
}
