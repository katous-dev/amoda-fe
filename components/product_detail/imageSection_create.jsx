import Image from "next/image";
import styles from "../../styles/components/product_detail/imageSection.module.css";
import InlineEdit from "../customs/InlineEdit";
import { useEffect, useMemo, useRef, useState } from "react";
import defaultImage from "../../public/image/default-placeholder.png";
import { IoMdAddCircle } from "react-icons/io";
import { Box, Button, IconButton } from "@mui/material";
import { IoMdClose } from "react-icons/io";
import styles_image from "../../styles/ImageNext.module.css";
import CloseIcon from "@mui/icons-material/Close";
const mockData = {
  title: "Thông số kỹ thuật",
  title_2: "Chi tiết",
  description: "Mô tả chi tiết về sản phẩm.",
  images: [
    "/uploads/1769519683255-Starlink-24112025-02.jpg",
  ],
};

const mockformData = {
  name: "Tên sản phẩm",
  slug: "san-pham-mau-1",
  price: 0,
  oldPrice: 0,
  avatarImage: "",
  galleryImages: [],
  detailBlocks: [],
  promotion: "Đây là miêu tả khuyến mãi",
};

export default function ImageSection_Create({
  data = mockData,
  formData = mockformData,

  handleDelete = () => {},
  handleCreateChildSection = () => {},
  handleImageChildSection = () => {},
  updateDetailBlock = () => {},
  handleRemoveImageChile = () => {},
}) {
  const [formDataSection, setFormDataSection] = useState(data);
  const bigData = useMemo(() => {
    return formData;
  }, [formData]);

  const inputRef = useRef(null);
  const inputRef2 = useRef(null);

  useEffect(() => {
    setFormDataSection(data);
  }, [data]);

  return (
    <section className={styles.image_product_container}>
      <Box display="flex" justifyContent="flex-end">
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{
            height: 40,
            background: "red",
            color: "#fff",
            borderRadius: 2,
            padding: "2px 5px",
            cursor: "pointer",
          }}
          onClick={() => handleDelete()}
        >
          <IoMdClose size={24} color="#fff" />
          xóa section
        </Box>
      </Box>
      <div className={styles.header_section}>
        <span className={styles.sub_title}>
          <InlineEdit
            value={formDataSection.title}
            variant="span"
            onSave={(val) => updateDetailBlock("title", val)}
          />
        </span>
        <h2 className={styles.main_title}>
          <InlineEdit
            value={formDataSection.title_2}
            variant="span"
            onSave={(val) => updateDetailBlock("title_2", val)}
          />
        </h2>
        <div className={styles.description_text}>
          <InlineEdit
            value={formDataSection.description}
            variant="span"
            onSave={(val) => updateDetailBlock("description", val)}
          />
        </div>
      </div>

      <div className={styles.main_image_wrapper} style={{ maxHeight: 500 }}>
        <div
          className={styles.image_box}
          style={{ maxHeight: 500 }}
          onClick={() => inputRef2.current.click()}
        >
          <Image
            width={1000}
            height={1000}
            src={formDataSection.images[0] || defaultImage}
            alt="Nội thất Omoda C5"
            objectFit="cover"
          />
        </div>
        <input
          onChange={(e) =>
           handleImageChildSection(
              e.target.files.length != 0 ? e.target.files[0] : null,
              true
            )
          }
          style={{ display: "none" }}
          type="file"
          accept="image/*"
          ref={inputRef2}
        />
      </div>

      <div className={styles.features_grid}>
        {formDataSection.images.map((img, index) => {
          if (index === 0) return null; 
          return (
            <div
              key={index}
              className={styles.feature_item}
              style={{ position: "relative" }} 
            >
              <div
                className={`${styles.image_box} ${styles_image.image_container}`}
                onClick={() => inputRef.current.click()}
                key={index}
              >
                <Image
                  src={img || defaultImage}
                  alt={"image section " + index}
                  className={`${styles.slider_image} ${styles_image.custom_news_image}`}
                  priority
                  fill
                />
              </div>

              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveImageChile(index);
                }}
                sx={{
                  position: "absolute",
                  top: -8,
                  right: -8,
                  backgroundColor: "#f44336",
                  color: "white",
                  padding: "4px",
                  "&:hover": {
                    backgroundColor: "#d32f2f",
                  },
                  boxShadow: "0px 2px 4px rgba(0,0,0,0.2)",
                  zIndex: 10,
                }}
                size="small"
              >
                <CloseIcon fontSize="small" style={{ fontSize: "16px" }} />
              </IconButton>
            </div>
          );
        })}
        <input
          onChange={(e) =>
            handleImageChildSection(
              e.target.files.length != 0 ? e.target.files[0] : null,
            )
          }
          style={{ display: "none" }}
          type="file"
          accept="image/*"
          ref={inputRef}
        />
        <Button
          onClick={handleCreateChildSection}
          className={styles.feature_item}
          variant="outlined"
          color="primary"
          sx={{
            borderRadius: 2,
            textTransform: "none",
            px: 3,
          }}
        >
          <Box
            className={styles.image_box}
            display="grid"
            justifyContent="center"
            alignItems="center"
            height={120}
          >
            <IoMdAddCircle size={40} />
          </Box>
        </Button>
      </div>
    </section>
  );
}
