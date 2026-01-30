"use client";
import { useState, useEffect, useMemo } from "react";
import styles from "@/styles/components/silder.module.css";
import { FaCircleArrowLeft, FaCircleArrowRight } from "react-icons/fa6";
import Image from "next/image";
import defaultImage from "../public/image/default-placeholder.png";
import styles_image from "@/styles/ImageNext.module.css";
import { IoIosArrowDropright, IoIosArrowDropleft } from "react-icons/io";

const init = [
  {
    imgLink: "",
    nameTitle: "Banner Xuân 1",
    order: 1,
    __v: 0,
    _id: "6979d7e1961ab27a439942bc",
  },
];

const Slider = ({
  listSilder = [],
  listString = [],
  style = {
    maxHeight: 550,
    minHeight: 200,
  },
  index = 0,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentList = useMemo(() => {
    return listString.length > 0 ? listString : listSilder;
  }, [listString, listSilder]);

  useEffect(() => {
    setCurrentIndex(index);
  }, [index]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === currentList.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? currentList.length - 1 : prev - 1));
  };

  useEffect(() => {
    if (currentList.length != 0) {
      const timer = setInterval(nextSlide, 5000);
      return () => clearInterval(timer);
    }
  }, [currentIndex]);

  return (
    <div className={styles.slider_wrapper} style={style}>
      <div
        className={styles.slider_container}
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {listString.length == 0 &&
          currentList.map((item, index) => (
            <div
              className={`${styles.slider_item} ${styles_image.image_container}`}
              key={item.order}
            >
              <Image
                src={currentList.length > 0 ? item.imgLink : defaultImage}
                alt={item.nameTitle || index}
                className={`${styles.slider_image} ${styles_image.custom_news_image}`}
                priority
                fill
              />

              <div className={styles.slider_overlay}>
                <div className={styles.content_box}>
                  <h2 className={styles.main_title}>{item.title}</h2>
                  <h1 className={styles.sub_title}>{item.subTitle}</h1>
                </div>
              </div>
            </div>
          ))}

        {currentList != 0 &&
          currentList.map((item, index) => (
            <div
              className={`${styles.slider_item} ${styles_image.image_container}`}
              key={index}
            >
              <Image
                src={item || defaultImage}
                alt={"đây là ảnh " + index}
                className={`${styles.slider_image} ${styles_image.custom_news_image}`}
                priority
                fill
              />
            </div>
          ))}
      </div>

      <button
        className={`${styles.nav_btn} ${styles.prev_btn}`}
        onClick={prevSlide}
      >
        <IoIosArrowDropleft size={40} color="#919191" />
      </button>
      <button
        className={`${styles.nav_btn} ${styles.next_btn}`}
        onClick={nextSlide}
      >
        <IoIosArrowDropright size={40} color="#919191" />
      </button>

      <div className={styles.pagination_dots}>
        {currentList.map((_, index) => (
          <span
            key={index}
            className={`${styles.dot} ${currentIndex === index ? styles.active_dot : ""}`}
            onClick={() => setCurrentIndex(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Slider;
