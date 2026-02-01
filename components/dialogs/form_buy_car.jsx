import { Dialog, DialogContent, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { FaPhone } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { IoLocationSharp } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import Image from "next/image";
import styles from "../../styles/components/dialogs/register_form.module.css";
import { useEffect, useState } from "react";
import { formatNumber } from "@/utils/formartNumber";
import { toast } from "react-toastify";

const BE_URL = process.env.NEXT_PUBLIC_BE_URL;
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const rollingPrice = (price, location) => {
  const tyLeTruocBa = 0.1;
  const phiBienSo = 14000000;
  const phiDangKiem = 140000;
  const phiBaoTriDuongBo = 1560000;
  const baoHiemTNDS = 531000;
  const chiPhiDichVu = 3500000;

  const thueTruocBa = price * tyLeTruocBa;

  const tongChiPhiDangKy =
    thueTruocBa +
    phiBienSo +
    phiDangKiem +
    phiBaoTriDuongBo +
    baoHiemTNDS +
    chiPhiDichVu;

  const giaLanBanh = price + tongChiPhiDangKy;
  switch (location) {
    case "TPHCM" || "HaNoi":
      return {
        thueTruocBa,
        tongChiPhiDangKy,
        giaLanBanh: giaLanBanh + 14000000,
      };
    case "none":
      return {
        thueTruocBa,
        tongChiPhiDangKy,
        giaLanBanh: 0,
      };
    default:
      return {
        thueTruocBa,
        tongChiPhiDangKy,
        giaLanBanh: giaLanBanh + 200000,
      };
  }
};

export default function FormBuyCar({ open, handleClose }) {
  const [listProduct, setListProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState({
    thueTruocBa: 0,
    tongChiPhiDangKy: 0,
    giaLanBanh: 0,
  });
  const [changeForm, setChangeForm] = useState(false);
  const [openBtn, setOpenBtn] = useState(false);
  const listLocation = [
    { id: "none", lable: "Chọn vị trí" },
    { id: "TPHCM", lable: "Thành Phố Hồ Chí Minh" },
    { id: "HaNoi", lable: "Hà Nội" },
    { id: "Khac", lable: "Khác" },
  ];
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    message: "",
    paymentMethods: "Trả góp",
    licenseRegistrationNumber: "none",
  });

  const fecthProducts = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
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

  useEffect(() => {
    const isValid =
      String(formData.name) != "" &&
      String(formData.contact) != "" &&
      String(formData.message) != "" &&
      formData.licenseRegistrationNumber != "none";

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpenBtn(isValid);
  }, [formData]);

  const Close = () => {
    handleClose();
    setFormData({
      name: "",
      contact: "",
      message: "",
      paymentMethods: "Trả góp",
      licenseRegistrationNumber: "none",
    });
    setOpenBtn(false);
    setChangeForm(false);
    setTotal({
      thueTruocBa: 0,
      tongChiPhiDangKy: 0,
      giaLanBanh: 0,
    });
  };

  const handleUpdate = (field, newValue) => {
    setFormData((pre) => ({ ...pre, [field]: newValue }));
  };

  const handleSubmit = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    setLoading(true);
    fetch(`${BE_URL}/email/businessCustomers/ `, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: myHeaders,
    })
      .then((res) => {
        if (!res.ok) {
          toast.error("Gửi thông tin thất bại");
          return;
        }
        toast.success("Gửi thông tin thành công");
        if (
          listProduct.filter((value) => value.slug == formData.message)
            .length != 0
        ) {
          setTotal(
            rollingPrice(
              listProduct.filter((value) => value.slug == formData.message)[0]
                .price,
              formData.licenseRegistrationNumber,
            ),
          );
          setChangeForm(true);
        } else {
          toast.error("Lỗi khi tính toán");
        }

        return res.json();
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <Dialog
      open={open}
      onClose={() => Close()}
      fullWidth={true}
      disableEnforceFocus
      maxWidth="xs"
      PaperProps={{
        sx: {
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
            {!changeForm && (
              <>
                <h3 className={styles.form_heading}>BÁO GIÁ LĂN BÁNH</h3>
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

                  <div className={styles.input_field_group}>
                    <span className={styles.field_icon}>
                      <IoLocationSharp />
                    </span>
                    <select
                      value={formData.licenseRegistrationNumber}
                      className={styles.select_input}
                      onChange={(e) =>
                        handleUpdate(
                          "licenseRegistrationNumber",
                          e.currentTarget.value,
                        )
                      }
                    >
                      {listLocation.map((val, i) => (
                        <option key={i} value={val.id}>
                          {val.lable}
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
                        onChange={(e) =>
                          handleUpdate("paymentMethods", e.target.value)
                        }
                      />
                      <span className={styles.radio_text}>Trả góp</span>
                    </label>
                    <label className={styles.radio_label}>
                      <input
                        type="radio"
                        name="pay_method"
                        value="Trả thẳng"
                        onChange={(e) =>
                          handleUpdate("paymentMethods", e.target.value)
                        }
                      />
                      <span className={styles.radio_text}>Trả thẳng</span>
                    </label>
                  </div>
                  {openBtn && (
                    <button
                      type="submit"
                      className={styles.submit_btn_blue}
                      disabled={loading}
                    >
                      {loading ? "ĐANG TÍNH TOÁN" : "BÁO GIÁ"}
                    </button>
                  )}
                </form>
              </>
            )}

            {changeForm && (
              <div className={styles.rollingContainer}>
                <h2 className={styles.rollingTitle}>Báo Giá Dự Kiến</h2>

                <div className={styles.rollingRow}>
                  <span className={styles.rollingLabel}>Lệ phí trước bạ:</span>
                  <span className={styles.rollingValue}>
                    {formatNumber(total.thueTruocBa)} vnđ
                  </span>
                </div>

                <div className={styles.rollingRow}>
                  <span className={styles.rollingLabel}>
                    Phí đăng ký & khác:
                  </span>
                  <span className={styles.rollingValue}>
                    {formatNumber(total.tongChiPhiDangKy)} vnđ
                  </span>
                </div>

                <div className={styles.rollingTotalRow}>
                  <span className={styles.rollingTotalLabel}>TỔNG CỘNG:</span>
                  <span className={styles.rollingTotalValue}>
                    {formatNumber(total.giaLanBanh)} vnđ
                  </span>
                </div>

                <p className={styles.rollingNote}>
                  * Lưu ý: Giá trên chỉ mang tính chất tham khảo tại thời điểm
                  hiện tại.
                </p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
