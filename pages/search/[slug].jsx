// SearchPage.js
import styles from "../../styles/search.module.css";
import ProductCard from "../../components/search/product_card";
import NewsCard from "../../components/search/new_card";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const BE_URL = process.env.NEXT_PUBLIC_BE_URL;
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

export default function SearchPage() {
  const router = useRouter();
  const { slug } = router.query;
  const [products, setProducts] = useState([]);
  const [newsList, setNews] = useState([]);

  useEffect(() => {
    try {
      fetch(`${BE_URL}/search `, {
        method: "POST",
        body: JSON.stringify({ q: slug }),
        headers: myHeaders,
      })
        .then((res) => {
          if (!res.ok) return;
          return res.json();
        })
        .then((res) => {
          if (res.products && res.news) {
            setProducts(res.products);
            setNews(res.news);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  }, [slug]);

  return (
    <div className={styles.search_container}>
      <nav className={styles.breadcrumb}>
        SẢN PHẨM / <strong>KẾT QUẢ TÌM KIẾM</strong>
      </nav>

      <section className={styles.section_wrapper}>
        <div className={styles.grid_layout}>
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section className={styles.section_wrapper}>
        <h2 className={styles.section_title}>BÀI VIẾT ĐÃ TÌM THẤY</h2>
        <div className={styles.grid_layout_news}>
          {newsList.map((n) => (
            <NewsCard key={n.id} news={n} />
          ))}
        </div>
      </section>
    </div>
  );
}
