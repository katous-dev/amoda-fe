// pages/_document.js
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="vi">
      <Head>
        <meta charSet="UTF-8" />
        <meta
          name="description"
          content="Mẫu xe ô tô Amoda  hoàn toàn mới, sự kết hợp tinh hoa giữa công nghệ tối tân và thiết kế sang trọng."
        />
        <meta name="keywords" content="omodajaecoo" />

        <meta name="author" content="Htech Software" />

        <link
          href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
          rel="stylesheet"
        />

        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />

        <script
          src="https://unpkg.com/boxicons@2.1.4/dist/boxicons.js"
          defer
        ></script>
        <script src="https://unpkg.com/scrollreveal" defer></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
