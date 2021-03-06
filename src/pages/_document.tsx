import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";
import { createGenerateId, JssProvider, SheetsRegistry } from "react-jss";

// This is a very dumb solution to prevent console.warn position with incorrect messages from react-jss
// Currently we are working with jss team to fix this warning, meanwhile place consider leaving this code
// This warning has no effect on react-jss styles and would not impact your components
// You can learn more about the issue here – https://github.com/cssinjs/jss/issues/1492
/* eslint-disable no-console */
if (typeof window === "undefined") {
  const originalWarn = console.warn;
  console.warn = (...args: any) => {
    if (
      args[0] !==
      'Warning: [JSS] Rule is not linked. Missing sheet option "link: true".'
    ) {
      originalWarn(...args);
    }
  };
}
/* eslint-enable no-console */

export default class _Document extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const registry = new SheetsRegistry();
    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () =>
      originalRenderPage({
        // eslint-disable-next-line react/display-name
        enhanceApp: (App) => (props) =>
          (
            <JssProvider registry={registry} generateId={createGenerateId()}>
              <App {...props} />
            </JssProvider>
          ),
      });

    const initialProps = await Document.getInitialProps(ctx);

    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          <style id="mantine-ssr-styles">{registry.toString()}</style>
        </>
      ),
    };
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="icon" href="link to favicon" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
