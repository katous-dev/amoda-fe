"use client";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  IconButton,
  Button,
  useMediaQuery,
  useTheme,
  Box,
  TextField,
  Grid,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import styles_slider from "../../styles/components/form_banner.module.css";
import defaultImage from "../../public/image/default-placeholder.png";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

const BE_URL = process.env.NEXT_PUBLIC_BE_URL;
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const mockdata = {
  imgLink: "",
  nameTitle: "Tiêu đề banner",
  order: 1,
  __v: 0,
  _id: "",
};

const CreateBanner_Dialog = ({
  open,
  handleClose,
  item,
  editForm = false,
  reload = () => {},
}) => {
  const theme = useTheme();
  const inputRef = useRef(null);
  const fullScreen = useMediaQuery(theme.breakpoints.down("xs"));
  const [formData, setFormData] = useState(mockdata);

  useEffect(() => {
    if (item && editForm) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData(item);
    }
  }, [item]);
  const handleUpdate = (field, newValue) => {
    setFormData((pre) => ({ ...pre, [field]: newValue }));
  };

  const Close = () => {
    setFormData(mockdata);
    handleClose();
  };

  const handleImage = (file) => {
    const formData = new FormData();
    formData.append("image", file);
    fetch(`${BE_URL}/uploads/image`, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    })
      .then((res) => {
        if (!res.ok) toast.error("Lỗi tải ảnh");
        return res.json();
      })
      .then((res) => {
        if (!res?.urls || !res.urls[0]?.url || !res) {
          toast.error("Không tìm thấu url ");
        }
        setFormData((pre) => ({
          ...pre,
          imgLink: res.urls[0].url,
        }));
      });
  };

  const handleSubmit = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
      "Authorization",
      "Bearer " + localStorage.getItem("accessToken"),
    );

    let result;
    if (editForm && item) {
      result = fetch(`${BE_URL}/bannerHome/${item._id}`, {
        method: "PUT",
        body: JSON.stringify(formData),
        headers: myHeaders,
      });
    } else {
      result = fetch(`${BE_URL}/bannerHome/createBanner `, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: myHeaders,
      });
    }

    result
      .then((res) => {
        if (!res.ok) {
          toast.error(
            editForm ? "Lỗi khi cập nhật banner" : "Lỗi khi tạo banner",
          );
          return;
        }
        toast.success(
          editForm ? "Cập nhật banner thành công" : "Tạo banner thành công",
        );
        reload();
        Close();  
        return res.json();
      })
      .catch((err) => {});
  };

  return (
    <Dialog
      open={open}
      onClose={Close}
      fullScreen
      PaperProps={{
        sx: {
          borderRadius: fullScreen ? 0 : "10px",
          padding: "8px",
           maxWidth: "700px",
          maxHeight: "90vh",
        },
      }}
    >
      <IconButton
        aria-label="close"
        onClick={Close}
        sx={{
          position: "absolute",
          right: 16,
          top: 16,
          color: (theme) => theme.palette.grey[900],
        }}
      >
        <CloseIcon />
      </IconButton>

      <DialogTitle sx={{ pb: 0, pt: 2 }}>
        <Typography variant="span" fontWeight="600" color="text.primary">
          {editForm ? "Cập nhật sản phẩm" : "Tạo sản phẩm"}
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ mt: 3 }}>
        <Grid container spacing={4}>
          <Grid size={12}>
            <Box className={styles_slider.upload_wrapper}>
              <Typography
                variant="subtitle2"
                fontWeight="600"
                sx={{ mb: 1, color: "#555" }}
              >
                Hình ảnh hiển thị
              </Typography>

              <Box
                className={styles_slider.image_dropzone}
                onClick={() => inputRef.current.click()}
              >
                <Image
                  src={formData.imgLink || defaultImage}
                  alt="Slider Preview"
                  fill
                  style={{ objectFit: "cover" }}
                />
                <div className={styles_slider.upload_overlay}>
                  <Typography variant="body2" color="#fff">
                    Thay đổi ảnh
                  </Typography>
                </div>
              </Box>

              <input
                type="file"
                accept="image/*"
                ref={inputRef}
                style={{ display: "none" }}
                onChange={(e)=> e.target.files.length > 0 ? handleImage(e.target.files[0]) : null}
              />

              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ mt: 1, display: "block", textAlign: "center" }}
              >
                Khuyên dùng kích thước: 1920 x 700 px
              </Typography>
            </Box>
          </Grid>

          <Grid size={12}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <TextField
                fullWidth
                label="Tiêu đề Banner"
                placeholder={mockdata.nameTitle}
                value={formData.nameTitle}
                onChange={(e) => handleUpdate("nameTitle", e.target.value)}
                variant="outlined"
                InputLabelProps={{ shrink: true }}
              />

              <TextField
                fullWidth
                label="Thứ tự hiển thị (Số càng nhỏ hiện trước)"
                type="number"
                placeholder="1"
                value={formData.order}
                onChange={(e) => handleUpdate("order", e.target.value)}
                variant="outlined"
                InputLabelProps={{ shrink: true }}
              />

              <Box
                sx={{
                  p: 2,
                  bgcolor: "#f8f9fa",
                  borderRadius: 2,
                  border: "1px solid #eee",
                }}
              >
                <Typography
                  variant="caption"
                  fontWeight="bold"
                  color="primary"
                  gutterBottom
                >
                  THÔNG TIN TRẠNG THÁI
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Banner sẽ hiển thị ngay lập tức sau khi tạo.
                  <br />• Đảm bảo tiêu đề ngắn gọn để không bị che khuất trên
                  mobile.
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ justifyContent: "flex-end", gap: 1, px: 3, pb: 2 }}>
        <Button
          onClick={Close}
          variant="outlined"
          color="error"
          sx={{
            borderRadius: 2,
            textTransform: "none",
            px: 3,
            color: "#ff3231",
            border: "1px soid #ff3231",
            "&:hover": { backgroundColor: "#d50808" },
          }}
        >
          Hủy
        </Button>

        <Button
          onClick={handleSubmit}
          variant="contained"
          sx={{
            borderRadius: 2,
            textTransform: "none",

            px: 3,
            backgroundColor: "#6c5ce7",
            "&:hover": { backgroundColor: "#5a4ad1" },
          }}
        >
          {editForm ? "Cập nhật" : "Tạo "}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateBanner_Dialog;
