import { Dialog, DialogContent, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { FaPhone } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import Image from "next/image";
import styles from "../../styles/components/dialogs/register_form.module.css";
import { useEffect, useState } from "react";

const BE_URL = process.env.NEXT_PUBLIC_BE_URL;
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

export default function FormRegister({ open, handleClose }) {
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
    if (open) {
      fecthProducts();
    }
  }, [open]);

  const Close = () => {
    handleClose();
    setFormData({
      name: "",
      phone: "",
      selected: "",
      installment: false,
    });
  };

  const handleUpdate = (field, newValue) => {
    setFormData((pre) => ({ ...pre, [field]: newValue }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
      Close();
      return res.json();
    });
  };
  return (
    <Dialog
      open={open}
      onClose={() => Close()}
      disableEnforceFocus
      fullWidth={true}
      maxWidth="sm"
      PaperProps={{
        sx: {
          padding: "8px",
          maxWidth: "850px",
          maxHeight: "90vh",
        },
      }}
    >
      <IconButton
        aria-label="close"
        onClick={() => Close()}
        sx={{
          position: "absolute",
          right: 16,
          top: 16,
          color: (theme) => theme.palette.grey[900],
        }}
      >
        <CloseIcon />
      </IconButton>

      <DialogContent sx={{ mt: 3 }}>
        <div className={styles.section_grid_container}>
          <div className={styles.promo_image_block}>
            <div className={styles.image_wrapper}>
              <Image
                width={1000}
                height={1000}
                src="https://omodajaecoohcm.vn/wp-content/uploads/2025/01/2026.jpg"
                alt="Omoda C5"
                className={styles.main_img}
              />
            </div>
          </div>

          <div className={styles.registration_form_block}>
            <h3 className={styles.form_heading}>LÁI THỬ XE</h3>
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
                  value={formData.selected}
                  className={styles.select_input}
                  onChange={(e) =>
                    handleUpdate("message", e.currentTarget.value)
                  }
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
      </DialogContent>
    </Dialog>
  );
}
