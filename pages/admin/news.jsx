"use client";
import AdminLayout from "./layout";
import { useEffect, useState } from "react";
import { Box, TextField, InputAdornment, Button, Stack } from "@mui/material";
import { Search, FilterList, Add } from "@mui/icons-material";
import DynamicTable from "../../components/table/dynamicTable";
import Form_news from "../../components/dialogs/form_news";
import Delete_Dialog from "../../components/dialogs/delete";
import { toast } from "react-toastify";
import defaultImage from "../../public/image/default-placeholder.png";
import Image from "next/image";
// default-placeholder.png
const BE_URL = process.env.NEXT_PUBLIC_BE_URL;
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const mockdata = [
  {
    _id: "1",
    nameNews: "1",
    dtailDescription: "1",
    imagesAvt: "",
    media: [],
    dateTime: "1",
    slug: "1",
    description: "1",
  },
];
export default function NewsTable() {
  const [listData, setListData] = useState(mockdata);
  const [openForm, setOpenForm] = useState({
    editForm: false,
    item: {},
    open: false,
  });
  const [openDelete, setOpenDelete] = useState({
    title: "",
    id: "",
    open: false,
  });

  const fecthData = () =>
    fetch(`${BE_URL}/news?limit=1000`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    })
      .then((res) => res.json())
      .then((respone) => {
        if (respone) {
          setListData(respone.blogs);
        }
      });

  useEffect(() => {
    fecthData();
  }, []);

  const newsColumns = [
     {
      key: "imagesAvt",
      label: "Hình ảnh",
      render: (value) => (
        <Box borderRadius={2}>
          <Image
            alt="hình ảnh dản phẩm"
            borderRadius={2}
            objectFit="cover"
            width={50}
            height={50}
            src={value || defaultImage}
          />
        </Box>
      ),
    },
    { key: "nameNews", label: "Tên bài viết" },
    { key: "dateTime", label: "Ngày đăng" ,render: (value) => value ? new Date(value).toLocaleDateString() : ""},
    {
      key: "option",
      label: "",
      render: (_, row) => (
        <Box display="flex" justifyContent="right" gap={1}>
          <Button
            onClick={() =>
              setOpenForm({ open: true, editForm: true, item: row })
            }
            variant="contained"
            sx={{
              borderRadius: 2,
              textTransform: "none",
              bgcolor: "#635BFF",
              "&:hover": { bgcolor: "#5249f0" },
            }}
          >
            Sửa
          </Button>
          <Button
            variant="contained"
            onClick={() =>
              setOpenDelete({ id: row.slug, title: row.title, open: true })
            }
            sx={{
              borderRadius: 2,
              textTransform: "none",
              bgcolor: "#ff3231",
              "&:hover": { bgcolor: "#d50808" },
            }}
          >
            Xóa
          </Button>
        </Box>
      ),
    },
  ];

  const handleDelete = (slug) => {
    if (openDelete.open) {
      if (!slug) return;
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      fetch(`${BE_URL}/news/${slug}`, {
        method: "DELETE",
        headers: myHeaders,
      })
        .then((res) => {
          if (!res.ok) {
            toast.error("Lỗi khi xóa tin tức");
            return;
          }
          toast.success("Xóa tin tức thành công");
          setOpenDelete({ title: "", id: "", open: false });
          fecthData()
          return res.json();
        })
        .catch((err) => {
          toast.error(err);
        });
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        justifyContent="space-between"
        alignItems={{ xs: "stretch", md: "center" }}
        sx={{ mb: 3 }}
      >
        <TextField
          placeholder="Tìm kiếm..."
          size="small"
          sx={{
            bgcolor: "white",
            borderRadius: 2,
            width: { md: 300 },
            "& .MuiOutlinedInput-notchedOutline": { borderColor: "#E0E4EC" },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search sx={{ color: "text.secondary" }} />
              </InputAdornment>
            ),
          }}
        />
        <Stack direction="row" spacing={1}>
          <Button
            variant="outlined"
            startIcon={<FilterList />}
            sx={{
              borderRadius: 2,
              textTransform: "none",
              color: "#333",
              borderColor: "#E0E4EC",
            }}
          >
            Lọc
          </Button>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() =>
              setOpenForm({ editForm: false, item: {}, open: true })
            }
            sx={{
              borderRadius: 2,
              textTransform: "none",
              bgcolor: "#635BFF",
              "&:hover": { bgcolor: "#5249f0" },
            }}
          >
            Tạo
          </Button>
        </Stack>
      </Stack>
      <DynamicTable columns={newsColumns} data={listData} />

      <Form_news
        open={openForm.open}
        handleClose={() =>
          setOpenForm({ editForm: false, item: {}, open: false })
        }
        editForm={openForm.editForm}
        item={openForm.item}
        reload={fecthData}
      />
      <Delete_Dialog
        open={openDelete.open}
        handleClose={() => setOpenDelete({ title: "", id: "", open: false })}
        title={openDelete.title}
        func={() => handleDelete(openDelete.id)}
      />
    </Box>
  );
}

NewsTable.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
