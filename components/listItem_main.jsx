import Image from "next/image";
import styles from "@/styles/components/listItem_main.module.css";
import { formatNumber } from "../utils/formartNumber";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import FormBuyCar from "@/components/dialogs/form_buy_car";
import imageDefault from "@/public/image/default-placeholder.png";

const mockData = [
  {
    _id: "",
    name: "Tên sản phẩm",
    slug: "ten-san-pham",
    price: null,
    avatarImage: "",
    galleryImages: [],
    detailBlocks: [
      {
        title: "Thông số kỹ thuật",
        title_2: "Chi tiết",
        description: "Mô tả chi tiết về sản phẩm.",
        images: [],
      },
    ],
    createdAt: "2026-01-28T08:58:26.429Z",
    updatedAt: "2026-01-28T08:58:26.429Z",
    __v: 0,
  },
];

function ListItem_Main({ listData = mockData }) {
  const router = useRouter();
  const [list, setList] = useState(listData);
  const [openRegister, setOpenRegister] = useState(false);
  useEffect(() => {
    setList(listData);
  }, [listData]);
  return (
    <div className={styles.container_wrapper}>
      <h1 className={styles.main_title}>XE Ô TÔ OMODA & JAECOO</h1>
      <div className={styles.car_grid}>
        {list.map((car, index) => (
          <div key={index} className={`pointer`}>
            <div key={car._id} className={styles.car_card}   onClick={() => router.push(`/products/${car.slug}`)}>
              <div className={styles.card_header}>
                <h2
                  className={styles.car_name}
                  style={{ cursor: "pointer" }}
                
                >
                  {car.name}
                </h2>
                <p className={styles.car_price}>
                  GIÁ ƯU ĐÃI:{" "}
                  <span>
                    {formatNumber(car.price) != "NaN"
                      ? formatNumber(car.price)
                      : car.price}{" "}
                    VNĐ
                  </span>
                  
                </p>
                <p className={styles.car_promo}>{car?.promotionHome || ""}</p>
              </div>

              <div className={styles.card_image}>
                <Image
                  src={car.avatarImage || imageDefault}
                  alt={car.name}
                  width={1000}
                  height={1000}
                />
              </div>
            </div>
            <div className={styles.card_actions}>
              <Link href="/register" className={styles.btn_action}>
                ĐĂNG KÝ LÁI THỬ {">"}
              </Link>
              <div className={styles.btn_action} onClick={() => setOpenRegister(true)}>
                MUA XE {">"}
              </div>
            </div>
          </div>
        ))}
      </div>
      <FormBuyCar open={openRegister} handleClose={() => setOpenRegister(false)}/>
    </div>
  );
}

export default ListItem_Main;
