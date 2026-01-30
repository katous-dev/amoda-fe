import PriceTable from "../../components/price/price_table";
import styles from "../../styles/price.module.css";
import PromotionBanner from "../../components/promotio_banner.jsx";
import Image from "next/image";

const mockDataProgram = [
  {
    data: [
      {
        version: "Omoda C5 Luxury",
        price: "479.100.000",
        promo: "Hỗ trợ 110% LPTB",
        details: [
          "Miễn phí bảo dưỡng 5 năm / 50.000 Km",
          "LSƯĐ 0% trong 12 tháng",
        ],
      },
      {
        version: "Omoda C5 Premium",
        price: "558.558.000",
        promo: "Hỗ trợ 50% LPTB",
        details: ["Miễn phí bảo dưỡng 5 năm / 50.000 Km"],
      },
      {
        version: "Omoda C5 Flagship",
        price: "622.100.000",
        promo: "Hỗ trợ 100% LPTB",
        details: [],
      },
    ],
    title: "Chương trình ưu đãi Omoda C5",
    image: "https://omodajaecoohcm.vn/wp-content/uploads/2026/01/3.jpg",
  },
  {
    data: [
      {
        version: "Jaecoo J7 Flagship",
        price: "729.000.000",
        promo: "Hỗ trợ 90% LPTB",
        details: ["LSƯĐ 0% trong 12 tháng"],
      },
      {
        version: "Jaecoo J7 Flagship AWD",
        price: "819.000.000",
        promo: "Ưu đãi giảm 30 Triệu",
        details: [],
      },
      {
        version: "Jaecoo J7 PHEV Flagship",
        price: "879.000.000",
        promo: "Hỗ trợ 90% LPTB",
        details: ["LSƯĐ 0% trong 12 tháng", "BHTV 2 năm (*có điều kiện)"],
      },
    ],
    title: "Chương trình ưu đãi xe Jaecoo J7 ",
    image: "https://omodajaecoohcm.vn/wp-content/uploads/2026/01/2.jpg",
  },
];

export default function Index() {
  return (
    <>
    <div className={styles.container}>
      <header>
        <title>Bảng giá OMODA & JAECOO 01/2026</title>
      </header>

      <header className={styles.header}>
        <h1>BẢNG GIÁ XE THÁNG 1/2026</h1>
        <h2>OMODA C5 & JAECOO J7</h2>
      </header>

      <div className={styles.bannerContainer}>
        <Image
          src="https://omodajaecoohcm.vn/wp-content/uploads/2026/01/1.jpg"
          alt="Promotion Banner"
          className={styles.banner}
          width="1200"
          height="1200"
        />
      </div>

      <main className={styles.mainContent}>
        {mockDataProgram.map((program, idx) => (
          <PriceTable key={idx} item={program} />
        ))}

        <div className={styles.noteSection}>
          <i>Lưu ý: Bảng giá có thể thay đổi theo từng thời điểm, Quý khách hàng vui lòng liên hệ Hotline: 0928788889 để nhận thông tin ưu đãi chi tiết và báo giá lăn bánh xe ô tô Omoda & Jaecoo mới nhất!</i>
        </div>
         
      </main>

    
    </div>
     <PromotionBanner/>
    </>
  );
}
