import React from "react";
import styles from "../../styles/components/price_table.module.css";
import Image from "next/image";

const pricingData = {
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
};
export default function PriceTable({ item = pricingData }) {
  return (
    <div className={styles.wrapper}>
      <h3 className={styles.tableHeading}>Chương trình ưu đãi xe Omoda C5</h3>
      <div className={styles.tableResponsive}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>PHIÊN BẢN</th>
              <th>GIÁ BÁN SAU ƯU ĐÃI (VND)</th>
            </tr>
          </thead>
          <tbody>
            {item.data.map((item, index) => (
              <tr key={index}>
                <td className={styles.versionColumn}>{item.version}</td>
                <td>
                  <div className={styles.priceRow}>
                    <span className={styles.mainPrice}>{item.price}</span>
                    <span className={styles.promoTag}>({item.promo})</span>
                  </div>
                  {item.details.map((detail, idx) => (
                    <p key={idx} className={styles.subDetail}>
                      {detail}
                    </p>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className={styles.imageContainer}>
          <Image
            src={item.image}
            alt={item.title}
            width="1200"
            height="1200"
            className={styles.image}
          />
        </div>
      </div>
    </div>
  );
}
