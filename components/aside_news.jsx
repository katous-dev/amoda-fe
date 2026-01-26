import Link from "next/link";
import styles from '../styles/components/aside_news.module.css'

const sidebar_news = [
  "Lì Xì Đầu Xuân: Giá Lăn Bánh Omoda C5 & Jaecoo J7 Tháng 1/2026",
  "Khám phá Jaecoo J5: Thiết kế, động cơ và lý do SUV B+ này đáng chờ nhất 2026",
  "Giá lăn bánh Omoda C5 & Jaecoo J7 tháng 12/2025",
  "Omoda 4 Giá Bao Nhiêu? Lý Do Khi Xuất Hiện Tại Việt Nam Sẽ Gây Bão",
  "Omoda & Jaecoo Việt Nam Kỷ Niệm 1 Năm: Hành Trình Tri Ân",
];

export default function AsideNews() {
  return (
    <aside className={styles.sidebar_area}>
      <h3 className={styles.sidebar_heading}>BÀI VIẾT MỚI</h3>
      <ul className={styles.sidebar_list}>
        {sidebar_news.map((title, index) => (
          <li key={index} className={styles.sidebar_item}>
            <Link href={`/news/${1}`} className={styles.sidebar_link}>
              {title}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
