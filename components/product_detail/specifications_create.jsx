import Slider from "../slider";
import styles from "../../styles/components/product_detail/specifications.module.css";
import InlineEdit from "../customs/InlineEdit";
import { useState } from "react";

const mockData = {
  title: "OMODA C5",
  stat: [
    { num: "145", text: "Công suất, mã lực" },
    { num: "210", text: "Mô men xoắn, Nm" },
    { num: "9.9", text: "Tăng tốc lên 100 km/h, giây" },
    { num: "7.85", text: "Tiêu thụ nhiên liệu (l/100km)" },
  ],
  desc: "Lấy cảm hứng từ triết lý <strong>Art In Motion</strong>, OMODA C5 là sự hòa quyện táo bạo giữa ý tưởng, màu sắc và ngôn ngữ thiết kế độc đáo. Không chỉ dừng lại ở tính năng, mỗi đường nét của OMODA C5 đềumang giá trị thẩm mỹ vượt thời gian. Những chiếc xe được kiến tạo từ tư duy tiên phong này không chỉ quyến rũ về thị giác, mà còn khơi dậy cảm xúc khi chạm vào và mang đến những hành trình đầy cảm hứng.",
};

export default function Specifications_Create({
  silder = [],
  data = mockData,
}) {
  const [formdata, setFormData] = useState(data);
  return (
    <section>
      <Slider style={{ maxHeight: 500, minHeight: 300 }} listString={silder} />
      <h4 className={styles.main_title}>
        <InlineEdit
          value={data.title}
          variant="span"
          sx={{ fontWeight: "bold", mb: 1 }}
          onSave={(val) => {}}
        />
      </h4>

      <div className={styles.stats_container}>
        {formdata.stat.map((item, index) => (
          <div key={index} className={styles.stat_box}>
            <span className={styles.stat_number}>
              <InlineEdit
                value={item.num}
                variant="span"
                sx={{ fontWeight: "bold", mb: 1 }}
                onSave={(val) => {}}
              />
            </span>
            <span className={styles.stat_label}>
              <InlineEdit
                value={item.text}
                variant="span"
                sx={{ fontWeight: "bold", mb: 1 }}
                onSave={(val) => {}}
              />
            </span>
          </div>
        ))}
      </div>

      <div className={styles.desc_section}>
        <InlineEdit
          value={formdata.desc}
          variant="p"
          sx={{ mb: 1 }}
          onSave={(val) => {}}
        />
      </div>
    </section>
  );
}
