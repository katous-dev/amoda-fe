import { useEffect, useState } from "react";
import styles from "../styles/login.module.css";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const BE_URL = process.env.NEXT_PUBLIC_BE_URL;
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const Login = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", otp: "" });

  const handleLogin = (e) => {
    e.preventDefault();
    fetch(`${BE_URL}/auth/verifyOtp`, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: myHeaders,
    })
      .then((res) => {
        if (!res.ok) {
          toast.error("Lỗi khi đăng nhập");
          return;
        }
        return res.json();
      })
      .then((res) => {
        if(res.token)localStorage.setItem("accessToken", res.token);
        router.push("/admin/products");
        toast.success(res.message);
      });
  };

  const handleSendOtp = () => {
    fetch(`${BE_URL}/auth/sendOtp`, {
      method: "POST",
      body: JSON.stringify({ email: formData.email }),
      headers: myHeaders,
    }).then((res) => {
      if (!res.ok) {
        toast.error("Lỗi khi gửi Otp");
        return;
      }
      toast.success("Gửi Otp thành công");
      return res.json();
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginCard}>
        <h1 className={styles.title}>Đăng nhập</h1>
        <p className={styles.subtitle}>
          Nhập thông tin đăng nhập của bạn
        </p>

        <form className={styles.form} onSubmit={handleLogin}>
          <div className={styles.inputGroup}>
            <div className={styles.passwordWrapper}>
              <input
                type="email"
                placeholder="Email "
                className={styles.input}
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData((pre) => ({ ...pre, email: e.target.value }))
                }
              />
              <button
                type="button"
                className={`${styles.eyeIcon} btn-primary`}
                
                onClick={handleSendOtp}
              >
                Gửi mã
              </button>
            </div>
          </div>

          <div className={styles.inputGroup}>
            <div className={styles.passwordWrapper}>
              <input
                type="text"
                placeholder="Mã Otp"
                className={styles.input}
                required
                onChange={(e) =>
                  setFormData((pre) => ({ ...pre, otp: e.target.value }))
                }
                value={formData.otp}
              />
            </div>
          </div>

          <button
            type="submit"
            className={`${styles.signInBtn} ${formData.otp == "" && styles.disable_btn}`}
          >
            Xác nhận
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
