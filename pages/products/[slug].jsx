"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles_image from "../../styles/ImageNext.module.css";
import Image from "next/image";
import styles from "../../styles/product_detail.module.css";
import { FaFire } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";
import Tabs from "../../components/product_detail/tabs";
import Specifications from "../../components/product_detail/specifications";
import ImageSection from "../../components/product_detail/imageSection";
import Slider from "../../components/slider";
import FormRegister from "../../components/dialogs/form_register"
import { AiOutlineZoomIn } from "react-icons/ai";
import { CiGift } from "react-icons/ci";
import { FaPhone } from "react-icons/fa6";
import { formatNumber } from "../../utils/formartNumber";
import { FaFacebookF } from "react-icons/fa";
import { CiMail } from "react-icons/ci";

const BE_URL = process.env.NEXT_PUBLIC_BE_URL;
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const productData = {
  category: "Ô TÔ JAECOO",
  name: "JAECOO J7 PHEV",
  oldPrice: "969.000.000 VNĐ",
  newPrice: "879.000.000 VNĐ",
  priceDetails: [
    { model: "Jaecoo J7 Xăng FWD", price: "729.000.000 VNĐ" },
    { model: "Jaecoo J7 Xăng AWD", price: "819.000.000 VNĐ" },
    { model: "Phev SHS", price: "879.000.000 VNĐ" },
  ],
  promotions: [
    { text: "Jaecoo J7 Xăng FWD (Niêm yết 799 Triệu)", type: "hot" },
    { text: "Giảm 90% LPTB trừ trực tiếp giá bán xe", type: "checkmark" },
    { text: "Hỗ trợ lãi suất 0% 12 tháng đầu", type: "checkmark" },
    { text: "Jaecoo J7 Xăng AWD (Niêm yết 849 Triệu)", type: "hot" },
    { text: "Ưu đãi giảm 30 Triệu chỉ còn 819 Triệu", type: "checkmark" },
    { text: "Jaecoo J7 Phev (Niêm yết 969 Triệu)", type: "hot" },
    { text: "Giảm 90% LPTB trừ trực tiếp giá bán xe", type: "checkmark" },
    { text: "Hỗ trợ lãi suất 0% 12 tháng đầu", type: "checkmark" },
    {
      text: "Tặng app quản lý điều khiển xe từ xa T-Box trị giá ",
      type: "checkmark",
    },
    { text: "Tặng BHTV 2 năm (*có điều kiện)", type: "checkmark" },
  ],
  mainImage:
    "https://omodajaecoohcm.vn/wp-content/uploads/2025/01/j7-phev-trang.png",
  galleryImages: [
    "https://omodajaecoohcm.vn/wp-content/uploads/2025/01/j7-phev-trang.png",
    "https://omodajaecoohcm.vn/wp-content/uploads/2025/01/j7-phev-trang.png",
    "https://omodajaecoohcm.vn/wp-content/uploads/2025/01/j7-phev-trang.png",
    "https://omodajaecoohcm.vn/wp-content/uploads/2025/01/j7-phev-trang.png",
  ],
  hotline: "0928788889",
};

const detailBlock = {
  title: "",
  title_2: "",
  description: "",
  images: [],
};

const mockData = {
  avatarImage: "",
  createdAt: "",
  detailBlocks: [detailBlock],
  galleryImages: [],
  name: "",
  price: 0,
  slug: "",
  updatedAt: "",
  __v: 0,
  _id: "",
};

export default function ProuctDetail() {
  const router = useRouter();
  const { slug } = router.query;
  const [activeTab, setActiveTab] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const [mainDisplayImage, setMainDisplayImage] = useState(
    productData.mainImage,
  );
  const [currentProduct, setCurrentProduct] = useState(mockData);
  const [currentIndex, setCurrentIndex] = useState(0);

  const fecthBanner = () => {
    fetch(`${BE_URL}/products/${slug} `, {
      method: "GET",
      headers: myHeaders,
    })
      .then((res) => {
        if (!res.ok) {
          router.replace("/");
          return;
        }
        return res.json();
      })
      .then((res) => {
        setCurrentProduct(res);
        setCurrentIndex(0);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (slug) {
      fecthBanner(slug);
    }
  }, [slug]);

  return (
    <div className={styles.product_detail_container}>
      <div className={styles.product_grid}>
        <div className={styles.image_gallery_column}>
          <div className={styles.discount_badge}>Giảm giá!</div>
          <div className={styles.main_image_wrapper}>
            <Slider
              size={300}
              listString={currentProduct.galleryImages}
              index={currentIndex}
            />
            <div className={styles.zoom_icon}>
              <AiOutlineZoomIn />
            </div>
          </div>
          <div className={styles.thumbnail_gallery}>
            {currentProduct.galleryImages.map((imgSrc, index) => (
              <div
                className={styles_image.image_container}
                key={index}
                onClick={() => setCurrentIndex(index)}
              >
                <Image
                  src={imgSrc}
                  alt={`${styles_image.custom_news_image} ${productData.name} - Thumbnail ${index + 1}`}
                  className={`${styles.thumbnail_image} ${mainDisplayImage === imgSrc ? styles.active : ""}`}
                  onClick={() => setMainDisplayImage(imgSrc)}
                  priority
                  fill
                />
              </div>
            ))}
          </div>
        </div>

        <div className={styles.info_and_promo_column}>
          <h1 className={styles.product_name}>{currentProduct.name}</h1>
          <div className={styles.price_section}>
            <span className={styles.old_price}>
              {formatNumber(currentProduct.price) + " vnđ"}
            </span>
            <span className={styles.current_price}>
              {formatNumber(currentProduct.price) + " vnđ"}
            </span>
          </div>

          <div className={styles.promotion_box}>
            <h3 className={styles.promo_title}>KHUYẾN MÃI & ƯU ĐÃI THÁNG 1</h3>
            <ul className={styles.promo_list}>
              {productData.promotions.map((promo, index) => (
                <li
                  key={index}
                  className={`${styles.promo_item} styles.promo_${promo.type}`}
                >
                  {promo.type === "hot" ? <FaFire /> : <FaCircleCheck />}
                  &nbsp;
                  {promo.text}
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.action_buttons}>
            <button className={`${styles.btn_action} ${styles.primary_btn}`} onClick={() => setOpenRegister(true)}>
              <CiGift />
              BÁO GIÁ LĂN BÁNH
            </button>
            <a
              href={`tel:${productData.hotline}`}
              className={`${styles.btn_action} ${styles.secondary_btn}`}
            >
              <FaPhone />
              {productData.hotline}
            </a>
          </div>

          <div className={styles.social_icons}>
            <a href="#" className={styles.icon_circle}>
              <FaFacebookF />
            </a>
            <a href="#" className={styles.icon_circle}>
              <CiMail />
            </a>
            <a href="#" className={styles.icon_circle}>
              <FaPhone />
            </a>
          </div>
        </div>
      </div>

      <div className={styles.product_depscription}>
        <Tabs activeTab={activeTab} func={() => setActiveTab((pre) => !pre)} />
        <Specifications silder={currentProduct.galleryImages} />
        {currentProduct.detailBlocks.map((value, index) => (
          <ImageSection key={index} item={value} />
        ))}
      </div>

      <FormRegister open={openRegister} handleClose={() => setOpenRegister(false)} />
    </div>
  );
}
