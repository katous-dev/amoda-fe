import Image from "next/image";
import styles from "../../styles/components/item_price.module.css";
export default function SectionItem({ item }) {
  return (
    <section className={styles.price_section}>
      <h3>Chương trình ưu đãi xe Omoda C5</h3>
      <table className={styles.price_table}>
        <thead>
          <tr>
            <th>PHIÊN BẢN</th>
            <th>GIÁ BÁN SAU ƯU ĐÃI (VNĐ)</th>
          </tr>
        </thead>
        <tbody>
          {item.option.map((option, index) => (
            <tr key={index}>
              <td className={styles.version_name}>{option.name}</td>
              <td>
                <span className={styles.price}>{option.price}</span>{" "}
                <span className={styles.highlight_red}>{item.note}</span>
                {option.contents.map((detail, i) => (
                  <div key={i} className={styles.sub_detail}>
                    {detail}
                  </div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.layout_image}>
        <Image
          width={1000}
          height={1000}
          src={item.image}
          loading="lazy"
          alt={item.name}
          objectFit="cover"
        />
      </div>
    </section>
  );
}
