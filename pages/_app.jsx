// import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';
// import 'boxicons/css/boxicons.min.css';
import MainLayout from "../layouts/mainLayout";

import { useEffect } from "react";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    import("../utils/bootstrap");
  }, []);
const getLayout = Component.getLayout || ((page) => page);
  return (
    <MainLayout suppressHydrationWarning={true}>
      {getLayout(<Component {...pageProps} />)}
    </MainLayout>
  );
}
