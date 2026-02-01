import { useMemo } from "react";
import Slider from "../../components/slider";
import styles from "../../styles/components/product_detail/specifications.module.css";

const mockData = {
  name: "Tên sản phẩm",
  specs: [
    { label: "Công suất", value: "0" },
    { label: "Quãng đường", value: "0" },
    { label: "Tốc độ tối đa", value: "0" },
    { label: "Tiêu thụ nhiên liệu", value: "0" },
  ],
  descriptionShort: "Mô tả ngắn về sản phẩm",
};

export default function Specifications({ silder = [], data = mockData }) {
  const curnentData = useMemo(()=>{
    if(data.specs.length == 0){
      return {...data, specs: mockData.specs}
    }
    return data
  },[data])
  return (
    <section>
      <Slider listString={silder} />
      <h4 className={styles.main_title}>{data.name}</h4>
      <div className={styles.stats_container}>
        {curnentData.specs.map((item, index) => (
          <div key={index} className={styles.stat_box}>
            <span className={styles.stat_number}>{item.value}</span>
            <span className={styles.stat_label}>{item.label}</span>
          </div>
        ))}
      </div>

      <div className={styles.desc_section}>
        <p>{curnentData.descriptionShort || mockData.descriptionShort}</p>
      </div>
    </section>
  );
}
