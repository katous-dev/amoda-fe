import styles from "../styles/components/footer.module.css";
import Link from "next/link"
import { FaFacebookF } from "react-icons/fa";
import { CiMail } from "react-icons/ci";
import { FaPhone } from "react-icons/fa6";


const Footer = () => {
  return (
    <footer className={styles.footer_container}>
      <div className={styles.footer_content}>
        <div className={[styles.footer_column, styles.map_section]}>
          <h3 className={styles.column_title}>OMODA & JAECOO HỒ CHÍ MINH</h3>
          <div className={styles.map_wrapper}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15684.386106881851!2d106.66450094999999!3d10.649608899999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1svi!2s!4v1769242278634!5m2!1svi!2s"
              width="300"
              height="200"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        <div className={`${styles.footer_column}  ${styles.info_section}`}>
          <h3 className={styles.column_title}>HỖ TRỢ KHÁCH HÀNG</h3>
          <p>
            <strong>Hotline:</strong> <a href="tel:0928788889">0928788889</a>
          </p>
          <p>355 Phạm Hùng, Bình Hưng, Bình Chánh, TP.HCM</p>
          <p>
            <strong>Email:</strong>{" "}
            <a href="mailto:amodajaecoobinhchanh@gmail.com">
              amodajaecoobinhchanh@gmail.com
            </a>
          </p>
        </div>

        <div className={[styles.footer_column, styles.follow_section]}>
          <h3 className={styles.column_title}>FOLLOW</h3>
          <div className={styles.social_icons}>
            <a href="#" className={styles.icon_circle}>
              <FaFacebookF/>
            </a>
            <a href="#" className={styles.icon_circle}>
              <CiMail/>
            </a>
            <a href="#" className={styles.icon_circle}>
              <FaPhone/>
            </a>
          </div>
        </div>
      </div>

      <div className={styles.footer_bottom}>
        <div className={styles.bottom_left}>
          <div className={styles.footer_nav}>
            <Link href="/">TRANG CHỦ </Link>
            <a href="#">TRẢI NGHIỆM KHÁCH HÀNG</a>
            <a href="#">LIÊN HỆ</a>
          </div>
          <p className={styles.copyright}>Copyright 2026 © amodajaecoo.vn</p>
        </div>
        <div className={styles.bottom_right}>
          <p>AMODA & JAECOO BÌNH CHÁNH - TP HCM</p>
        </div>
      </div>
    </footer>
  )
};

export default Footer;
