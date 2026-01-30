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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { AiOutlineZoomIn } from "react-icons/ai";
import Image from "next/image";
import styles from "../../styles/product_detail.module.css";
import { useEffect, useRef, useState } from "react";
import Slider from "../slider";
import InlineEdit from "../customs/InlineEdit";
import { MdAddCircle } from "react-icons/md";
import Tabs from "../product_detail/tabs";
import Specifications_Create from "../product_detail/specifications_create";
import ImageSection_Create from "../product_detail/imageSection_create";
import { toast } from "react-toastify";

const BE_URL = process.env.NEXT_PUBLIC_BE_URL;
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const productData = {
  category: "Ô TÔ JAECOO",
  name: "JAECOO J7 PHEV",
  oldPrice: "969.000.000 VNĐ",
  newPrice: "879.000.000 VNĐ",
  priceDetails: [
    { model: "Jaecoo J7 Xăng FWD", price: "729.000.000 VNĐ" },
    { model: "Jaecoo J7 Xăng AWD", price: "819.000.000 VNĐ" },
    { model: "Phev SHS", price: "879.000.000 VNĐ" },
  ],
  promotions: [
    { text: "Jaecoo J7 Xăng FWD (Niêm yết 799 Triệu)", type: "hot" },
    { text: "Giảm 90% LPTB trừ trực tiếp giá bán xe", type: "checkmark" },
    { text: "Hỗ trợ lãi suất 0% 12 tháng đầu", type: "checkmark" },
    { text: "Jaecoo J7 Xăng AWD (Niêm yết 849 Triệu)", type: "hot" },
    { text: "Ưu đãi giảm 30 Triệu chỉ còn 819 Triệu", type: "checkmark" },
    { text: "Jaecoo J7 Phev (Niêm yết 969 Triệu)", type: "hot" },
    { text: "Giảm 90% LPTB trừ trực tiếp giá bán xe", type: "checkmark" },
    { text: "Hỗ trợ lãi suất 0% 12 tháng đầu", type: "checkmark" },
    {
      text: "Tặng app quản lý điều khiển xe từ xa T-Box trị giá ",
      type: "checkmark",
    },
    { text: "Tặng BHTV 2 năm (*có điều kiện)", type: "checkmark" },
  ],
  mainImage:
    "https://omodajaecoohcm.vn/wp-content/uploads/2025/01/j7-phev-trang.png",
  galleryImages: [],
  hotline: "0928788889",
};

const mockdata = {
  name: "Tên sản phẩm",
  slug: "san-pham-mau-1",
  price: 0,
  oldPrice: 0,
  avatarImage: "",
  galleryImages: [],
  detailBlocks: [],
  promotion: "Đây là miêu tả khuyến mãi",
  createdAt: "",
  updatedAt: "",
};

const initDetalBlock = {
  title: "Thông số kỹ thuật",
  title_2: "Chi tiết",
  description: "Mô tả chi tiết về sản phẩm.",
  images: [],
};

const CreateProduct_Dialog = ({
  open,
  handleClose,
  item,
  editForm = false,
  reload = () => {},
}) => {
  const theme = useTheme();
  const inputRef = useRef(null);
  const [activeTab, setActiveTab] = useState(false);
  const fullScreen = useMediaQuery(theme.breakpoints.down("xs"));
  const [indexImage, setIndexImage] = useState(0);
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

  const updateDetailBlock = (index, field, newValue) => {
    setFormData((pre) => {
      const updatedBlocks = [...pre.detailBlocks];
      updatedBlocks[index] = {
        ...updatedBlocks[index],
        [field]: newValue,
      };
      return {
        ...pre,
        detailBlocks: updatedBlocks,
      };
    });
  };

  const Close = () => {
    setFormData(mockdata);
    handleClose();
  };

  const handleDeleteSection = (index) => {
    setFormData((pre) => ({
      ...pre,
      detailBlocks: pre.detailBlocks.filter((_, i) => i != index),
    }));
  };

  const handleAddFeature = (currnetIndex, value = "") => {
    setFormData((prev) => ({
      ...prev,
      detailBlocks: prev.detailBlocks.map((section, index) =>
        currnetIndex == index
          ? {
              ...section,
              images: [...section.images.filter((value) => value != ""), value],
            }
          : section,
      ),
    }));
  };

  const handleRemoveImageChile = (sectionIndex, imageIndex) => {
    setFormData((pre) => {
      const updatedBlocks = [...pre.detailBlocks];
      const updatedImages = updatedBlocks[sectionIndex].images.filter(
        (_, i) => i !== imageIndex,
      );

      updatedBlocks[sectionIndex] = {
        ...updatedBlocks[sectionIndex],
        images: updatedImages,
      };

      return {
        ...pre,
        detailBlocks: updatedBlocks,
      };
    });
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
          galleryImages: [...pre.galleryImages, res.urls[0].url],
        }));
      });
  };

  const handleBigImage = (file) => {
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
          avatarImage: res.urls[0].url,
        }));
      });
  };

  const handleImageChildSection = (file, sectionIndex) => {
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
        handleAddFeature(sectionIndex, res.urls[0].url);
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
      result = fetch(`${BE_URL}/products/${item.slug}`, {
        method: "PUT",
        body: JSON.stringify({
          ...formData,
          price: formData.price ? Number(formData.price) : 0,
        }),
        headers: myHeaders,
      });
    } else {
      result = fetch(`${BE_URL}/products/createProduct`, {
        method: "POST",
        body: JSON.stringify({
          ...formData,
          price: formData.price ? Number(formData.price) : 0,
        }),
        headers: myHeaders,
      });
    }

    result
      .then((res) => {
        if (!res.ok) {
          toast.error(
            editForm ? "Lỗi khi cập nhật sản phẩm" : "Lỗi khi tạo sản phẩm",
          );
          return;
        }
        toast.success(
          editForm ? "Cập nhật sản phẩm" : "Tạo sản phẩm thành công",
        );
        reload();
        Close();
        return res.json();
      })
      .catch((err) => {});
  };

  const handleDeleteImage = (index) => {
    setFormData((pre) => ({
      ...pre,
      galleryImages: pre.galleryImages.filter((_, i) => i != index),
    }));
    setIndexImage(0);
  };

  return (
    <Dialog
      open={open}
      onClose={() => Close()}
      fullScreen
      PaperProps={{
        sx: {
          borderRadius: fullScreen ? 0 : "10px",
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

      <DialogTitle sx={{ pb: 0, pt: 2 }}>
        <Typography variant="span" fontWeight="600" color="text.primary">
          {editForm ? "Cập nhật sản phẩm" : "Tạo sản phẩm"}
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ mt: 3 }}>
        <div className={styles.product_detail_container}>
          <div className={styles.product_grid}>
            <div className={styles.image_gallery_column}>
              <div className={styles.main_image_wrapper}>
                <Slider
                  style={{ maxHeight: 400, minHeight: 150 }}
                  listString={formData.galleryImages}
                  index={indexImage}
                />
                <div className={styles.zoom_icon}>
                  <AiOutlineZoomIn />
                </div>
              </div>
              <div className={styles.thumbnail_gallery}>
                <Box
                  className={styles.thumbnail_image}
                  display="grid"
                  justifyContent="center"
                  alignItems="center"
                  sx={{ border: "1px soid #000 !important" }}
                  onClick={() => inputRef.current.click()}
                >
                  <MdAddCircle size={40} />
                </Box>
                <input
                  onChange={(e) =>
                    handleImage(
                      e.target.files.length != 0 ? e.target.files[0] : null,
                    )
                  }
                  type="file"
                  ref={inputRef}
                  style={{ display: "none" }}
                  accept="image/*"
                />
                {Array.from(formData.galleryImages).map((imgSrc, index) => (
                  <Box
                    key={index}
                    sx={{ position: "relative", display: "inline-block" }}
                  >
                    <Image
                      width={1000}
                      height={1000}
                      key={index}
                      src={
                        imgSrc instanceof File
                          ? URL.createObjectURL(imgSrc)
                          : imgSrc
                      }
                      alt={`${productData.name} - Thumbnail ${index + 1}`}
                      className={`${styles.thumbnail_image} ${indexImage === index ? styles.active : ""}`}
                      onClick={() => setIndexImage(index)}
                    />
                    <IconButton
                      aria-label="delete"
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteImage(index);
                      }}
                      sx={{
                        position: "absolute",
                        top: 5,
                        right: 5,
                        backgroundColor: "rgba(255, 255, 255, 0.7)",
                        "&:hover": {
                          backgroundColor: "rgba(255, 0, 0, 0.8)",
                          color: "white",
                        },
                        padding: "2px",
                      }}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </Box>
                ))}
              </div>
            </div>

            <div className={styles.info_and_promo_column}>
              <p className={styles.product_category}>{productData.category}</p>
              <h1 className={styles.product_name}>
                <InlineEdit
                  value={formData.name}
                  variant="h4"
                  sx={{ fontWeight: "bold", mb: 1, fontSize: 25 }}
                  onSave={(val) => handleUpdate("name", val)}
                />
              </h1>
              <div className={styles.price_section}>
                <span className={styles.old_price} style={{ margin: 0 }}>
                  <InlineEdit
                    variant="span"
                    value={formData.oldPrice}
                    onSave={(val) => handleUpdate("oldPrice", val)}
                    type="number"
                  />
                </span>
                <span className={styles.current_price}>
                  <InlineEdit
                    value={formData.price}
                    variant="span"
                    onSave={(val) => handleUpdate("price", val)}
                    type="number"
                  />
                </span>
              </div>

              <div className={styles.optionCar}>
                <h3 className={styles.promo_title}>
                  <InlineEdit
                    value={formData.promotion}
                    variant="span"
                    sx={{ fontSize: 15 }}
                    onSave={(val) => handleUpdate("promotion", val)}
                  />
                </h3>
              </div>

              <div className={styles.promotion_box}>
                <h3 className={styles.promo_title}>
                  <InlineEdit
                    value={formData.promotion}
                    variant="span"
                    sx={{ fontSize: 15 }}
                    onSave={(val) => handleUpdate("promotion", val)}
                  />
                </h3>
              </div>
            </div>
          </div>

          <div className={styles.product_depscription}>
            <Tabs
              activeTab={activeTab}
              func={() => setActiveTab((pre) => !pre)}
            />

            <Specifications_Create
              silder={Array.from(formData.galleryImages)}
              data={formData.Specifications}
            />
            {formData.detailBlocks.map((value, index) => (
              <ImageSection_Create
                key={index}
                data={value}
                item={value}
                formData={formData}
                handleUpdate={(newValue) => handleBigImage(newValue)}
                updateDetailBlock={(field, newValue) =>
                  updateDetailBlock(index, field, newValue)
                }
                handleDelete={() => handleDeleteSection(index)}
                handleCreateChildSection={() => handleAddFeature(index)}
                handleRemoveImageChile={(indexImage) =>
                  handleRemoveImageChile(index, indexImage)
                }
                handleImageChildSection={(file) =>
                  handleImageChildSection(file, index)
                }
              />
            ))}

            <Box
              sx={{ cursor: "pointer" }}
              display="flex"
              justifyContent="center"
              width="100%"
            >
              <Button
                variant="contained"
                color="primary"
                sx={{
                  mt: 5,
                }}
                onClick={() =>
                  setFormData((pre) => ({
                    ...pre,
                    detailBlocks: [
                      ...pre.detailBlocks,
                      {
                        ...initDetalBlock,
                        id: formData.detailBlocks.length,
                      },
                    ],
                  }))
                }
              >
                Thêm section
              </Button>
            </Box>
          </div>
        </div>
      </DialogContent>

      <DialogActions sx={{ justifyContent: "flex-end", gap: 1, px: 3, pb: 2 }}>
        <Button
          onClick={() => Close()}
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

export default CreateProduct_Dialog;
