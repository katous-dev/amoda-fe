"use client";
import dynamic from "next/dynamic";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import styles_news from "../../styles/components/dialogs/form_banner.module.css";
import styles_detail from "../../styles/news_deatail.module.css";
import CloseIcon from "@mui/icons-material/Close";
import InlineEdit from "../customs/InlineEdit";
import defaultImage from "../../public/image/default-placeholder.png";
import Image from "next/image";
import { toast } from "react-toastify";

const BE_URL = process.env.NEXT_PUBLIC_BE_URL;

const QuillEditor = dynamic(
  () => import("../../components/customs/quiliEdit"),
  {
    ssr: false,
    loading: () => (
      <Box sx={{ height: 300, bgcolor: "#f0f0f0" }}>
        Đang tải trình soạn thảo...
      </Box>
    ),
  },
);

const mockdata = {
  nameNews: "Tiêu đề tin tức",
  dtailDescription: "Nội dung",
  imagesAvt: "",
  media: [],
  dateTime: "1",
  slug: "1",
  description: "Mô tả",
};

export default function Form_news({
  open,
  handleClose,
  item,
  editForm = false,
  reload = () => {},
}) {
  const theme = useTheme();
  const inputRef = useRef();
  const fullScreen = useMediaQuery(theme.breakpoints.down("xs"));
  const [formData, setFormData] = useState(mockdata);

  const clearData = () => {
    setFormData(mockdata);
  };

  const Close = () => {
    handleClose();
    clearData();
  };

  useEffect(() => {
    if (open) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData(editForm && item ? item : mockdata);
    }
  }, [item, open, editForm]);

  const handleSubmit = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
      "Authorization",
      "Bearer " + localStorage.getItem("accessToken"),
    );
    let result;
    if (editForm && item) {
      result = fetch(`${BE_URL}/news/${item.slug}`, {
        method: "PUT",
        body: JSON.stringify(formData),
        headers: myHeaders,
      });
    } else {
      result = fetch(`${BE_URL}/news/createNews`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: myHeaders,
      });
    }

    result
      .then((res) => {
        if (!res.ok) {
          toast.error(
            editForm ? "Lỗi khi cập nhật tin tức" : "Lỗi khi tạo tin tức",
          );
          return;
        }
        toast.success(editForm ? "Cập nhật tin tức" : "Tạo tin tức thành công");
        reload();
        handleClose();
        return res.json();
      })
      .catch((err) => {});
  };

  const handleUpdate = (field, newValue) => {
    setFormData((pre) => ({ ...pre, [field]: newValue }));
  };

  const handleImage = (file, func = () => {}) => {
    if (!file) return;
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

        func(res.urls[0]?.url);
      });
  };

  const handleQuillImage = useCallback(async () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    return new Promise((resolve) => {
      input.onchange = async () => {
        const file = input.files[0];
        if (!file) {
          resolve("");
          return;
        }
        const data = new FormData();
        data.append("image", file);
        try {
          const res = await fetch(`${BE_URL}/uploads/image`, {
            method: "POST",
            body: data,
            headers: {
              Authorization: "Bearer " + localStorage.getItem("accessToken"),
            },
          });

          const result = await res.json();
          const url = result?.urls?.[0]?.url;

          if (url) {
            resolve(url);
          } else {
            throw new Error("Không tìm thấy URL trong phản hồi");
          }
        } catch (error) {
          resolve("");
        }
      };
    });
  }, []);

  return (
    <Dialog
      open={open}
      onClose={() => Close()}
      disableEnforceFocus
      fullScreen={fullScreen}
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

      <DialogTitle sx={{ pb: 0, pt: 2 }}>
        <Typography variant="span" fontWeight="600" color="text.primary">
          {editForm ? "Cập nhật tin tức" : "Tạo tin tức"}
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ mt: 3 }}>
        <Grid container spacing={4}>
          <Grid item size={12}>
            <header className={styles_detail.article_header}>
              <span className={styles_detail.category_tag}>TIN TỨC</span>
              <h1
                className={styles_detail.article_title}
                style={{ fontSize: 25, fontWeight: 600 }}
              >
                <InlineEdit
                  variant="span"
                  value={formData.nameNews}
                  onSave={(val) => handleUpdate("nameNews", val)}
                />
              </h1>
              <div className={styles_detail.divider}></div>
            </header>
          </Grid>
          <Grid item xs={12} size={12}>
            <Box className={styles_news.upload_wrapper}>
              <Typography
                variant="subtitle2"
                fontWeight="600"
                sx={{ mb: 1, color: "#555" }}
              >
                Hình ảnh hiển thị
              </Typography>

              <Box
                className={styles_news.image_dropzone}
                onClick={() => inputRef.current.click()}
              >
                <Image
                  src={formData.imagesAvt || defaultImage}
                  alt="Slider Preview"
                  fill
                  style={{ objectFit: "cover" }}
                />
                <div className={styles_news.upload_overlay}>
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
                onChange={(e) =>
                  e.target.files.length > 0
                    ? handleImage(e.target.files[0], (url) =>
                        setFormData((pre) => ({ ...pre, imagesAvt: url })),
                      )
                    : null
                }
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

          <Grid item xs={12}>
            <Box
              key={open ? "editor-active" : "editor-inactive"}
              sx={{
                width: "100%",
                minHeight: "300px",
                mt: 2,
                "& .ql-container": { minHeight: "250px" },
              }}
            >
              <QuillEditor
                value={formData.dtailDescription}
                onChange={(content) =>
                  handleUpdate("dtailDescription", content)
                }
                onImageUpload={handleQuillImage}
              />
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
            border: "1px soid #ff3231",
          }}
          className="btn-red"
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
          }}
          className="btn-primary"
        >
          {editForm ? "Cập nhật" : "Tạo"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
