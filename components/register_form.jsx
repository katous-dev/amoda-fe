import { FaPhone } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import Image from "next/image";
import styles from "../styles/components/register_form.module.css";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
const BE_URL = process.env.NEXT_PUBLIC_BE_URL;
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

export default function RegisterForm() {
  const [listProduct, setListProduct] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    message: "",
    paymentMethods: "Trả góp",
  });

  const fecthProducts = () => {
    fetch(`${BE_URL}/products `, {
      method: "GET",
      headers: myHeaders,
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setListProduct(res.products);
      });
  };

  useEffect(() => {
    fecthProducts();
  }, []);
  const handleSubmit = () => {
    fetch(`${BE_URL}/email/businessCustomers/ `, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: myHeaders,
    }).then((res) => {
      if (!res.ok) {
        toast.error("Gửi thông tin thất bại");
        return;
      }
      toast.success("Gửi thông tin thành công");

      return res.json();
    });
  };

  const handleUpdate = (field, newValue) => {
    setFormData((pre) => ({ ...pre, [field]: newValue }));
  };

  return (
    <>
      <div className={styles.test_drive_container}>
        <h1 className={styles.section_title}>LÁI THỬ XE & TRẢI NGHIỆM</h1>

        <div className={styles.hotline_wrapper}>
          <div className={styles.phone_icon}>
            <FaPhone />
          </div>
          <div className={styles.hotline_info}>
            <span className={styles.hotline_label}>Hotline</span>
            <a href="tel:0928788889" className={styles.otline_number}>
              0928788889
            </a>
          </div>
        </div>

        <ul className={styles.feature_list}>
          <li>
            Lái thử xe ô tô&nbsp;<strong>Omoda C5 </strong> &nbsp;&&nbsp;
            <strong> Jaecoo J7 </strong>
          </li>
          <li>Báo giá lăn bánh và ưu đãi mới nhất</li>
          <li>Hỗ trợ lái thử xe tận nhà</li>
        </ul>
      </div>
      <div className={styles.section_grid_container}>
        <div className={styles.promo_image_block}>
          <div className={styles.image_wrapper}>
            <Image
              width={1000}
              height={1000}
              src="https://omodajaecoohcm.vn/wp-content/uploads/2026/01/3.jpg"
              alt="Omoda C5"
              className={styles.main_img}
            />
            <div className={styles.promo_badge_overlay}>
              <div className={styles.badge_content}>
                <p className={styles.badge_title}>OMODA C5</p>
                <div className={styles.badge_details}>
                  <span>
                    Ưu đãi <strong>110%</strong> Lệ phí trước bạ
                  </span>
                  <span>
                    Lãi suất <strong>0 ĐỒNG</strong> trong 12 tháng
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.registration_form_block}>
          <h2 className={styles.form_heading}>LÁI THỬ XE & TRẢI NGHIỆM</h2>
          <form
            className={styles.booking_form_inner}
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <div className={styles.input_field_group}>
              <span className={styles.field_icon}>
                <FaUser />
              </span>
              <input
                type="text"
                placeholder="Họ và tên"
                className={styles.text_input}
                value={formData.name}
                onChange={(e) => handleUpdate("name", e.target.value)}
              />
            </div>

            <div className={styles.input_field_group}>
              <span className={styles.field_icon}>
                <FaPhone />
              </span>
              <input
                type="tel"
                placeholder="Di động *"
                required
                className={styles.text_input}
                value={formData.contact}
                onChange={(e) => handleUpdate("contact", e.target.value)}
              />
            </div>

            <div className={styles.input_field_group}>
              <span className={styles.field_icon}>
                <IoSearch />
              </span>
              <select
                value={formData.message}
                className={styles.select_input}
                onChange={(e) => handleUpdate("message", e.currentTarget.value)}
              >
                <option value="">Chọn xe</option>
                {listProduct.map((product) => (
                  <option key={product.slug} value={product.slug}>
                    {product.name}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.payment_options_group}>
                <label className={styles.radio_label}>
                  <input
                    type="radio"
                    name="pay_method"
                    value="Trả góp"
                    checked={formData.paymentMethods == "Trả góp"}
                    onChange={(e) => handleUpdate("paymentMethods", e.target.value)}
                  />
                  <span className={styles.radio_text}>Trả góp</span>
                </label>
                <label className={styles.radio_label}>
                  <input
                    type="radio"
                    name="pay_method"
                    value="Trả thẳng"
                    onChange={(e) => handleUpdate("paymentMethods", e.target.value)}
                  />
                  <span className={styles.radio_text}>Trả thẳng</span>
                </label>
              </div>

            <button type="submit" className={styles.submit_btn_blue}>
              NHẬN THÔNG TIN
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
