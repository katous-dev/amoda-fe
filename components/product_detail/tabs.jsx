import styles from "../../styles/components/product_detail/tabs.module.css";

const tabs = [
  { id: "mota", label: "MÔ TẢ" },
  { id: "danhgia", label: "ĐÁNH GIÁ " },
];

export default function Tabs({activeTab, func = ()=>{}}) {
  return (
    <div className={styles.tabs_container}>
      <ul className={styles.tab_header}>
        {tabs.map((tab) => (
          <li
            key={tab.id}
            className={`${styles.tab_item} ${activeTab === tab.id ? styles.active : ""}`}
            onClick={() => func()}
          >
            {tab.label}
          </li>
        ))}
      </ul>

      <div className={styles.tab_content}>
        {activeTab && <div className={styles.animate_fade_in}></div>}
        {!activeTab && (
          <div className={styles.animate_fade_in}>
            <p>Chưa có đánh giá nào cho sản phẩm này.</p>
          </div>
        )}
      </div>
    </div>
  );
}
