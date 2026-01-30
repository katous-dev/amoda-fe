import Image from "next/image";
import styles from "../../styles/components/product_detail/imageSection.module.css";
import styles_image from "../../styles/ImageNext.module.css";
import defaultImage from "../../public/image/default-placeholder.png";
const detailBlock = {
  title: "",
  title_2: "",
  description: "",
  images: [],
};

export default function ImageSection({ item = detailBlock }) {
  return (
    <section className={styles.image_product_container}>
      <div className={styles.header_section}>
        <span className={styles.sub_title}>{item.title}</span>
        <h2 className={styles.main_title}>{item.title_2}</h2>
        <p className={styles.description_text}>{item.description}</p>
      </div>

      <div className={styles.main_image_wrapper}>
        <div className={` ${styles_image.auto_height_container}`}>
          <Image
            src={item.images[0] || defaultImage}
            alt={item.title}
            className={`${styles_image.custom_news_image}`}
            priority
            width={1200} 
            height={450}
            sizes="100vw"
            // style={{borderRadius:10}}

          />
        </div>
      </div>

      <div className={styles.features_grid}>
        {item.images.map((value, index) => (
          <div key={index} className={styles.feature_item}>
            <div
              className={` ${styles_image.image_container} ${styles.image_box}`}
            >
              <Image
                src={value || defaultImage}
                alt={item.title + index}
                className={`${styles_image.custom_news_image}`}
                priority
                fill
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
