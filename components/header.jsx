import styles from "../styles/components/header.module.css";
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Header = () => {
const pathname = usePathname()
const router = useRouter()
  const menuItems = [
    { title: "OMODA C5", path: `/products/1` },
    { title: "JAECOO J7", path: `/products/2` },
    { title: "JAECOO J7 AWD", path: `/products/3` },
    { title: "JAECOO J7 PHEV", path: `/products/4` },

    { title: "BẢNG GIÁ", path: `/price` },
    { title: "ĐĂNG KÝ LÁI THỬ", path: `/register` },
    { title: "TIN TỨC", path: `/news` },
    { title: "TUYỂN DỤNG", path: `/#` },

  ];

  return (
    <header className={styles.custom_header}>
      <div className={styles.header_container}>
        <div className={styles.logo_section} onClick={()=>router.replace('/')}>
          <span className={styles.logo_omoda}>AMODA</span>
          <div className={styles.divider}></div>
          <span className={styles.logo_jaecoo}>JAECOO</span>
        </div>

        <nav className={styles.nav_menu}>
          {menuItems.map((item, index) => (
            <Link  key={index} href={item.path} className={`${styles.nav_item} ${pathname != null && pathname.includes(item.path) && styles.active}`}>
              {item.title}
            </Link>
          ))}
        </nav>

        <div className={styles.search_section}>
          <button className={styles.search_btn}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>

          <div className={styles.input_form}>
            <input type="text" name="" id="" placeholder="Tìm kiếm..."/>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
