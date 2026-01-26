import Slider from "@/components/slider";
import ListItem_Main from "@/components/listItem_main";
import RegisterForm from "@/components/register_form"
import PromotionBanner from "@/components/promotio_banner"
import styles from "@/styles/index.module.css";

export default function Index() {
  return (
    <>
      <Slider />
      <div className={styles.content_main}>
        <ListItem_Main />
        <RegisterForm/>
      </div>
       <PromotionBanner/>
    </>
  );
}
