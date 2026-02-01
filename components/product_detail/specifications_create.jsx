import Slider from "../slider";
import styles from "../../styles/components/product_detail/specifications.module.css";
import InlineEdit from "../customs/InlineEdit";
import { useMemo } from "react";

const mockData = {
  name: "Tên sản phẩm",
  descriptionShort: "Mô tả ngắn",
  specs: [
    { label: "Công suất", value: "0" },
    { label: "Quãng đường", value: "0" }, 
    { label: "Tốc độ tối đa", value: "0" },
    { label: "Tốc độ tối đa", value: "0" },
  ],
};

export default function Specifications_Create({
  silder = [],
  data = mockData,
  handleUpdateSpecs = () => {},
  handleUpdateDeps = ()=>{}
}) {
  const formdata = useMemo(() => {
    if(data.specs.length == 0){
        return {...data, specs:[...mockData.specs]}
    }
    return data;
  }, [data]);

  return (
    <section>
      <Slider style={{ maxHeight: 500, minHeight: 300 }} listString={silder} />
      <h4 className={styles.main_title}>{formdata.name}</h4>

      <div className={styles.stats_container}>
        {formdata.specs.map((item, index) => (
          <div key={index} className={styles.stat_box}>
            <span className={styles.stat_number}>
              <InlineEdit
                value={item.value}
                variant="span"
                sx={{ fontWeight: "bold", mb: 1 }}
                onSave={(val) => handleUpdateSpecs("value", val, index)}
                convertNumber={false}
              />
            </span>
            <span className={styles.stat_label}>
              <InlineEdit
                value={item.label}
                variant="span"
                sx={{ fontWeight: "bold", mb: 1 }}
                convertNumber={false}
                onSave={(val) => handleUpdateSpecs("label", val, index)}
              />
            </span>
          </div>
        ))}
      </div>

      <div className={styles.desc_section}>
        <InlineEdit
          value={formdata.descriptionShort}
          variant="p"
          sx={{ mb: 1 }}
          onSave={(val) => {handleUpdateDeps(val)}}
        />
      </div>
    </section>
  );
}
