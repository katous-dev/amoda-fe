"use client"
import Slider from "@/components/slider";
import ListItem_Main from "@/components/listItem_main";
import RegisterForm from "@/components/register_form";
import PromotionBanner from "@/components/promotio_banner";
import styles from "@/styles/index.module.css";
import { useEffect, useState } from "react";

const BE_URL = process.env.NEXT_PUBLIC_BE_URL;
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");


export default function Index() {
  const [listBanner, setListBanner] = useState([]);
  const [listProduct, setListProduct] = useState([]);
  const fecthBanner = () => {
    fetch(`${BE_URL}/bannerHome `, {
      method: "GET",
      headers: myHeaders,
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setListBanner(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fecthProducts = () => {
    fetch(`${BE_URL}/products `, {
      method: "GET",
      headers: myHeaders,
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setListProduct(res.products);
      });
  };

  useEffect(() => {
    try {
      Promise.all([fecthBanner(), fecthProducts()]).catch((err) => console.log(err))
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <>
      <Slider listSilder={listBanner}  />
      <div className={styles.content_main}>
        <ListItem_Main listData={listProduct} />
        <RegisterForm />
      </div>
      <PromotionBanner />
    </>
  );
}
