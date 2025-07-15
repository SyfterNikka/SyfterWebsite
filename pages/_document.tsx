import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* CountUp.js via CDN */}
        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/countup.js/2.6.2/countUp.umd.min.js"
          async
        ></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
