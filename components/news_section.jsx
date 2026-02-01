import React, { useEffect, useState } from "react";
import styles from "../styles/components/news_section.module.css";
import Image from "next/image";
import Link from "next/link";
import defaultImage from "@/public/image/default-placeholder.png";
import defaultImgageSection from "@/public/image/img-section-news.jpg";
import styles_image from "@/styles/ImageNext.module.css";
import { useRouter } from "next/navigation";

const BE_URL = process.env.NEXT_PUBLIC_BE_URL;
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const NewsSection = () => {
  const route = useRouter();
  const [listNews, setListNews] = useState([]);
  const sideNews = [
    {
      id: 1,
      title:
        "Lì Xì Đầu Xuân: Giá Lăn Bánh Omoda C5 & Jaecoo J7 Tháng 1/2026 – Ưu Đãi Lớn Nhất Năm",
      img: "/news1.jpg",
    },
    {
      id: 2,
      title:
        "Khám phá Jaecoo J5: Thiết kế, động cơ và lý do SUV B+ này đáng chờ nhất 2026",
      img: "/news2.jpg",
    },
  ];

  const fetchNews = () => {
    fetch(`${BE_URL}/news?limit=3`, {
      method: "GET",
      headers: myHeaders,
    })
      .then((res) => res.json())
      .then((res) => {
        setListNews(res.blogs);
      });
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <section className={styles.container}>
      <div className={styles.layout}>
        <div className={styles.header}>
          <div className={styles.titleSection}>
            <h2>Tin tức & Sự kiện</h2>
            <p>
              Những mẫu xe ô tô Omoda & Jaecoo hoàn toàn mới, sự kết hợp tinh
              hoa giữa công nghệ tối tân và thiết kế sang trọng.
            </p>
            <p>
              Cập nhật thông tin ưu đãi và bảng giá sản phẩm mới nhất từ Omoda &
              Jaecoo Bình Chánh - TP.HCM
            </p>
          </div>
          <Link href="/news" className={styles.btnMore}>
            Xem thêm
          </Link>
        </div>

        <div className={styles.newsGrid}>
          <div className={styles.mainPost}>
            <div className={styles.videoWrapper}>
              <div className={`${styles_image.image_container}`}>
                <Image
                  src={defaultImgageSection}
                  alt="Omoda C7"
                  className={`${styles_image.custom_news_image}`}
                  priority
                  fill
                />
              </div>
            </div>
          </div>
          <div className={styles.sidePosts}>
            {listNews.length > 0 &&
              listNews.map((item, i) => (
                <div
                  key={i}
                  className={styles.newsItem}
                  onClick={() => route.push(`/news/${item.slug}`)}
                >
                  <div className={styles.thumb}>
                    <Image
                      src={item.imagesAvt || defaultImage}
                      alt={item.nameNews}
                      width={1000}
                      height={1000}
                    />
                  </div>
                  <div className={styles.info}>
                    <h3>{item.nameNews}</h3>
                    <div className={styles.viewMoreLink}>Xem thêm</div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
