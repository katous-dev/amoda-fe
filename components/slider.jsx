'use client'
import { useState, useEffect } from "react";
import styles from "@/styles/components/silder.module.css";
import { FaCircleArrowLeft, FaCircleArrowRight } from "react-icons/fa6";
import Image from "next/image";

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const sliderItems = [
    {
      id: 1,
      img: "https://omodajaecoohcm.vn/wp-content/uploads/2026/01/CSBH-T1.2026-1536x585.jpg",
      title: "SĂN LỘC ƯU ĐÃI",
      subTitle: "RƯỚC XẾ PHÁT TÀI",
    },
    {
      id: 2,
      img: "https://omodajaecoohcm.vn/wp-content/uploads/2025/07/z6779652207246_cbac4cf70342d5fbf6703338bc88fd56.jpg",
      title: "KHUYẾN MÃI THÁNG 1",
      subTitle: "NHẬN QUÀ KHỦNG",
    },
    {
      id: 3,
      img: "https://omodajaecoohcm.vn/wp-content/uploads/2025/07/z6779652207246_cbac4cf70342d5fbf6703338bc88fd56.jpg",
      title: "OMODA C5 MỚI",
      subTitle: "TRẢI NGHIỆM ĐẲNG CẤP",
    },
    {
      id: 4,
      img: "https://omodajaecoohcm.vn/wp-content/uploads/2026/01/CSBH-T1.2026-1536x585.jpg",
      title: "JAECOO J7 AWD",
      subTitle: "CHINH PHỤC MỌI ĐỊA HÌNH",
    },
    {
      id: 5,
      img: "https://omodajaecoohcm.vn/wp-content/uploads/2026/01/CSBH-T1.2026-1536x585.jpg",
      title: "ƯU ĐÃI 110% LỆ PHÍ",
      subTitle: "TRƯỚC BẠ CỰC HẤP DẪN",
    },
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === sliderItems.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? sliderItems.length - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  return (
    <div className={styles.slider_wrapper}>
      <div
        className={styles.slider_container}
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {sliderItems.map((item) => (
          <div className={styles.slider_item} key={item.id}>
            <Image
              src={item.img}
              width={1000}
              height={1000}
              alt={item.title}
              className={styles.slider_image}
              loading="lazy"
            />
            <div className={styles.slider_overlay}>
              <div className={styles.content_box}>
                <h2 className={styles.main_title}>{item.title}</h2>
                <h1 className={styles.sub_title}>{item.subTitle}</h1>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        className={`${styles.nav_btn} ${styles.prev_btn}`}
        onClick={prevSlide}
      >
        <FaCircleArrowLeft size={35} />
      </button>
      <button
        className={`${styles.nav_btn} ${styles.next_btn}`}
        onClick={nextSlide}
      >
        <FaCircleArrowRight size={35} />
      </button>

      <div className={styles.pagination_dots}>
        {sliderItems.map((_, index) => (
          <span
            key={index}
            className={`dot ${currentIndex === index ? styles.active_dot : ""}`}
            onClick={() => setCurrentIndex(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Slider;
