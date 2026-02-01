"use Client";
import { usePathname, useRouter } from "next/navigation";
import Footer from "../components/footer";
import Header from "../components/header";
import { useEffect, useState } from "react";
import ContactFloats from "../components/dialogs/float_button";
import FormBuyCar from "../components/dialogs/form_buy_car";

const deny = ["admin", "login"];

export default function MainLayout({ children }) {
  const pathName = usePathname() || "";
  const router = useRouter();
  const [openForm, setOpenForm] = useState(false)
  const [count, setCount] = useState(10); 

  const hidden =  deny.some((item) => pathName.includes(item));
  useEffect(() => {
    if (pathName.includes("admin")) {
      if (!localStorage.getItem("accessToken")) {
        router.push("/login");
      }else{
        router.push(pathName);
      }
    }
  }, [pathName,router]);

  useEffect(() => {
    if (count <= 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setOpenForm(true);
      return;
    }

    const timer = setInterval(() => {
      setCount((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [count]);
  return (
    <>
      {!hidden && <Header />}
      <main>{children}</main>
      {!hidden && <ContactFloats/>}
      {!hidden && <Footer />}
      {!hidden && <FormBuyCar open={openForm} handleClose={()=>setOpenForm(false)}/>}
    </>
  );
}
