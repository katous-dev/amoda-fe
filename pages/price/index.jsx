import SectionItem from "../../components/price/item";
import styles from "../../styles/price.module.css";
import Image from "next/image";

const mockDataProgram = [
  {
    program: "Chương trình ưu đãi Omoda C5",
    option: [
      {
        name: "Omoda C5 Luxury",
        price: "479.100.000",
        note: "",
        contents: ["Miễn phí bảo dưỡng 5 năm / 50.000 Km", "LSƯĐ 0% trong 12 tháng"],
      },
      {
        name: "Omoda C5 Premium",
        price: "559.550.000",
        note: "",
        contents: ["Miễn phí bảo dưỡng 5 năm / 50.000 Km"],
      },
      {
        name: "Omoda C5 Flagship",
        price: "602.100.000",
        note: "",
        contents: [],
      },
    ],
    image: "https://omodajaecoohcm.vn/wp-content/uploads/2026/01/1.jpg",
  },
];

export default function Index() {
  return (
    <div className={styles.promotion_container}>
      <div className={styles.price_header}>
        <h1>BẢNG GIÁ XE THÁNG 1/2026</h1>
        <h2>OMODA C5 & JAECOO J7</h2>
        <p className={styles.description}>
          Bảng giá xe và ưu đãi các dòng xe ô tô Omoda & Jaecoo mới nhất: Omoda
          C5 Luxury, Omoda C5 Premium, Omoda C5 Flagship, Jaecoo J7 Flagship,
          Jaecoo J7 Flagship AWD, Jaecoo J7 PHEV Flagship ...
        </p>
      </div>

      <div className={styles.main_banner}>
        <Image
          width={1000}
          height={1000}
          src="https://omodajaecoohcm.vn/wp-content/uploads/2026/01/1.jpg"
          alt="Cars"
          className={styles.hero_image}
          loading="lazy"
        />
      </div>
      <div>
        {mockDataProgram.map((value, i)=><SectionItem key={i} item={value}/>)}
      </div>
    </div>
  );
}
