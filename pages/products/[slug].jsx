import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import styles from "../../styles/product_detail.module.css";
import { FaFire } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";
import Tabs from "../../components/product_detail/tabs";

const BE_URL = process.env.NEXT_PUBLIC_BE_URL;

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


export default function ProuctDetail() {
  const router = useRouter();
  const { slug } = router.query;
  const [activeTab, setActiveTab] = useState(false);
  const [mainDisplayImage, setMainDisplayImage] = useState(
    productData.mainImage,
  );

  const fecthData = async () => {
    const result = await fetch(`${BE_URL}/products`);
  };

  useEffect(() => {
    if (slug) {
      fecthData();
    }
  }, [slug]);

  return (
    <div className={styles.product_detail_container}>
      <div className={styles.product_grid}>
        <div className={styles.image_gallery_column}>
          <div className={styles.discount_badge}>Giảm giá!</div>
          <div className={styles.main_image_wrapper}>
            <Image
              width={1000}
              height={1000}
              src={mainDisplayImage}
              alt={productData.name}
              className={styles.current_product_image}
            />
            <div className={styles.zoom_icon}>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                <line x1="8" y1="11" x2="14" y2="11"></line>
                <line x1="11" y1="8" x2="11" y2="14"></line>
              </svg>
            </div>
          </div>
          <div className={styles.thumbnail_gallery}>
            {productData.galleryImages.map((imgSrc, index) => (
              <Image
                width={1000}
                height={1000}
                key={index}
                src={imgSrc}
                alt={`${productData.name} - Thumbnail ${index + 1}`}
                className={`${styles.thumbnail_image} ${mainDisplayImage === imgSrc ? styles.active : ""}`}
                onClick={() => setMainDisplayImage(imgSrc)}
              />
            ))}
          </div>
        </div>

        <div className={styles.info_and_promo_column}>
          <p className={styles.product_category}>{productData.category}</p>
          <h1 className={styles.product_name}>{productData.name}</h1>
          <div className={styles.price_section}>
            <span className={styles.old_price}>{productData.oldPrice}</span>
            <span className={styles.current_price}>{productData.newPrice}</span>
          </div>

          <div className={styles.highlight_box}>
            <h3 className={styles.box_title}>
              GIÁ XE {productData.name.replace("PHEV", "FLAGSHIP")} SAU ƯU ĐÃI
            </h3>
            <ul className={styles.price_details_list}>
              {productData.priceDetails.map((item, index) => (
                <li key={index}>
                  • {item.model}: <strong>{item.price}</strong>
                </li>
              ))}
            </ul>
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
            <button className={`${styles.btn_action} ${styles.primary_btn}`}>
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                stroke="none"
                strokeWidth="2"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"></path>
              </svg>
              BÁO GIÁ LĂN BÁNH
            </button>
            <a
              href={`tel:${productData.hotline}`}
              className={`${styles.btn_action} ${styles.secondary_btn}`}
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                stroke="none"
                strokeWidth="2"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              {productData.hotline}
            </a>
          </div>
        </div>
      </div>

      <div className={styles.product_depscription}>
              <Tabs activeTab={activeTab}/>
      </div>
    </div>
  );
}
