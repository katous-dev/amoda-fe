"use Client";
import { usePathname, useRouter } from "next/navigation";
import Footer from "../components/footer";
import Header from "../components/header";
import { useEffect } from "react";

const deny = ["admin", "login"];

export default function MainLayout({ children }) {
  const pathName = usePathname() || "";
  const router = useRouter();

  const hidden =  deny.some((item) => pathName.includes(item));
  useEffect(() => {
    if (pathName.includes("admin")) {
      if (!localStorage.getItem("accessToken")) {
        router.push("/login");
      }
    }
  }, [pathName,router]);
  return (
    <>
      {!hidden && <Header />}
      <main>{children}</main>
      {!hidden && <Footer />}
    </>
  );
}
