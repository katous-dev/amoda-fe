import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import styles from "../styles/components/silder_banner.module.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import imageDefault from "../public/image/default-placeholder.png";

const BannerSlider = ({ data = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const listBanner = useMemo(()=>{return data},[data])

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === data.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? data.length - 1 : prevIndex - 1,
    );
  };

  return (
    <section className={styles.bannerWrapper}>
      <div
        className={styles.sliderContent}
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {listBanner.map((banner) => (
          <div key={banner._id} className={styles.bannerItem}>
            <Image
              src={banner.imgLink || imageDefault}
              alt={banner.nameTitle}
              fill
              priority={banner.order === 1}
              className={styles.image}
              sizes="100vw"
            />
          </div>
        ))}
      </div>

      <button className={`${styles.navBtn} ${styles.prev}`} onClick={prevSlide}>
        <IoIosArrowBack />
      </button>
      <button className={`${styles.navBtn} ${styles.next}`} onClick={nextSlide}>
        <IoIosArrowForward />
      </button>

      <div className={styles.pagination}>
        {data.map((_, index) => (
          <span
            key={index}
            className={currentIndex === index ? styles.dotActive : styles.dot}
            onClick={() => setCurrentIndex(index)}
          ></span>
        ))}
      </div>
    </section>
  );
};

export default BannerSlider;
