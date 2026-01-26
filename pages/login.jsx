import { useState } from "react";
import styles from "../styles/login.module.css";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter()
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    localStorage.setItem("accessToken", "tesst")
    if(true){
      router.push('/admin/products')
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginCard}>
        <h1 className={styles.title}>Sign In</h1>
        <p className={styles.subtitle}>
          Enter your credentials to access your account
        </p>

        <form className={styles.form} onSubmit={handleLogin}>
          <div className={styles.inputGroup}>
            <input
              type="email"
              placeholder="Email Address"
              className={styles.input}
              required
              value={formData.email}
              onChange={(e) =>
                setFormData((pre) => ({ ...pre, email: e.target.value }))
              }
            />
          </div>

          <div className={styles.inputGroup}>
            <div className={styles.passwordWrapper}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className={styles.input}
                required
                onChange={(e) =>
                  setFormData((pre) => ({ ...pre, password: e.target.value }))
                }
                value={formData.password}
              />
              <button
                type="button"
                className={styles.eyeIcon}
                onClick={() => setShowPassword(!showPassword)}
              >
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
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              </button>
            </div>
          </div>

          <div className={styles.options}>
            <label className={styles.rememberMe}>
              <input type="checkbox" />
              <span>Remember me</span>
            </label>
            <a href="#" className={styles.forgotPassword}>
              Forgot password?
            </a>
          </div>

          <button type="submit" className={styles.signInBtn}>
            Sign In
          </button>
        </form>

        <p className={styles.footerText}>
          Dont have an account?
          <a href="#" className={styles.createLink}>
            Create one
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
