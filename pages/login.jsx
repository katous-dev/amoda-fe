import { useEffect, useState } from "react";
import styles from "../styles/login.module.css";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const BE_URL = process.env.NEXT_PUBLIC_BE_URL;
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const initSecond = 30;

const Login = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", otp: "" });
  const [blockBtnSendMail, setBlockBtnSendMail] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [seconds, setSeconds] = useState(initSecond);

  const handleReset = () => {
    setIsActive(false);
    setSeconds(initSecond);
  };

  useEffect(() => {
    let timer;
    if (seconds <= 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      handleReset()
      setBlockBtnSendMail(false);
      return;
    }
    if (isActive && seconds > 0) {
      timer = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isActive, seconds]);

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
        setIsActive(false);
        return res.json();
      })
      .then((res) => {
        if (res.token) localStorage.setItem("accessToken", res.token);
        router.push("/admin/products");
        toast.success(res.message);
      })
      .finally(() => {
        handleReset();
        setBlockBtnSendMail(false);
      });
  };



  const handleSendOtp = () => {
    setIsActive(true);
    setBlockBtnSendMail(true);
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
        <p className={styles.subtitle}>Nhập thông tin đăng nhập của bạn</p>

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
                className={`${styles.eyeIcon} btn-primary ${blockBtnSendMail && styles.disable_btn}`}
                onClick={handleSendOtp}
                disabled={blockBtnSendMail}
              >
                Gửi mã {blockBtnSendMail && `(${seconds})`}
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
            disabled={formData.otp == ""}
          >
            Xác nhận
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
