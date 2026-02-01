"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles_image from "../../styles/ImageNext.module.css";
import Image from "next/image";
import styles from "../../styles/product_detail.module.css";
import Tabs from "../../components/product_detail/tabs";
import Specifications from "../../components/product_detail/specifications";
import ImageSection from "../../components/product_detail/imageSection";
import Slider from "../../components/slider";
import FormBuyCar from "../../components/dialogs/form_buy_car"
import { AiOutlineZoomIn } from "react-icons/ai";
import { CiGift } from "react-icons/ci";
import { FaPhone } from "react-icons/fa6";
import { formatNumber } from "../../utils/formartNumber";
import { FaFacebookF } from "react-icons/fa";
import { CiMail } from "react-icons/ci";
import PopupImage from "../../components/dialogs/popup_img";
import Link from "next/link";
import defaultImage from "../../public/image/default-placeholder.png";
import { useRouter as useRouterNavigate } from "next/navigation";

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
  variants: [],
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
  const routerNavigate = useRouterNavigate();
  const { slug } = router.query;
  const [activeTab, setActiveTab] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const [openPopupImage, setOpenPopupImage] = useState(false);
  const [mainDisplayImage, setMainDisplayImage] = useState(
    productData.mainImage,
  );
  const [currentProduct, setCurrentProduct] = useState(mockData);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [realTimeIndex, setRealTimeIndex] = useState(0);

  const fetchBanner = async () => {
    try {
      const res = await fetch(`${BE_URL}/products/${slug}`, {
        method: "GET",
        headers: myHeaders,
      });

      if (!res.ok) {
        console.log("Fetch failed, redirecting to home...");
        setCurrentProduct(mockData);
        await routerNavigate.push("/");
        return; 
      }

      const data = await res.json();
      setCurrentProduct(data);
      setCurrentIndex(0);
    } catch (err) {
      console.error("Lỗi kết nối hoặc hệ thống:", err);
    }
  };

  useEffect(() => {
    if (slug) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      fetchBanner(slug);
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
              listString={
                currentProduct?.galleryImages != undefined
                  ? currentProduct.galleryImages
                  : []
              }
              index={currentIndex}
              setIndex={(index) => setRealTimeIndex(index)}
            />
            <div
              className={styles.zoom_icon}
              onClick={() => setOpenPopupImage(true)}
            >
              <AiOutlineZoomIn />
            </div>
          </div>
          <div className={styles.thumbnail_gallery}>
            {currentProduct?.galleryImages != undefined &&
              currentProduct.galleryImages.map((imgSrc, index) => (
                <div
                  className={styles_image.image_container}
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                >
                  <Image
                    src={imgSrc || defaultImage}
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

          <div className={styles.variants_section}>
            <h3 className={styles.promo_title}>
              Bảng giá xe ô tô {currentProduct.name} SAU ƯU ĐÃI
            </h3>
            <div className={styles.variants_list}>
              <ul className={styles.variants_ul}>
                {currentProduct?.variants != undefined &&
                  currentProduct.variants.map((variant_item, index) => (
                    <li
                      key={variant_item.name + index}
                      className={styles.variants_item}
                    >
                      <span>{variant_item.name || "Name"} :</span>
                      <span className="text-primary">
                        {formatNumber(variant_item.price) != "NaN"
                          ? formatNumber(variant_item.price)
                          : variant_item.price}{" "}
                        vnđ{" "}
                      </span>
                    </li>
                  ))}
              </ul>
            </div>
          </div>

          <div className={styles.promotion_box}>
            <div className={styles.promo_list}>{currentProduct.promotion}</div>
          </div>

          <div className={styles.action_buttons}>
            <button
              className={`${styles.btn_action} ${styles.primary_btn}`}
              onClick={() => setOpenRegister(true)}
            >
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
            <Link
              href="https://www.facebook.com/share_channel/#"
              className={styles.icon_circle}
            >
              <FaFacebookF />
            </Link>
            <Link href="mailto:hotro@vidu.com" className={styles.icon_circle}>
              <CiMail />
            </Link>
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

      <FormBuyCar
        open={openRegister}
        handleClose={() => setOpenRegister(false)}
      />
      <PopupImage
        open={openPopupImage}
        handleClose={() => setOpenPopupImage(false)}
        imageUrl={currentProduct.galleryImages[realTimeIndex]}
        altText={currentProduct.name}
      />
    </div>
  );
}
