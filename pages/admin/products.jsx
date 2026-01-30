"use client";
import AdminLayout from "./layout";
import { useEffect, useState } from "react";
import { Box, TextField, InputAdornment, Button, Stack } from "@mui/material";
import { Search, FilterList, Add } from "@mui/icons-material";
import DynamicTable from "../../components/table/dynamicTable";
import defaultImage from "../../public/image/default-placeholder.png";
import CreateProduct_Dialog from "../../components/dialogs/form_product";
import Delete_Dialog from "../../components/dialogs/delete";
import Image from "next/image";
import { toast } from "react-toastify";
import { formatNumber } from "../../utils/formartNumber";

const BE_URL = process.env.NEXT_PUBLIC_BE_URL;
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");



export default function ProductTable() {
  const [searchText, setSearchText] = useState("");
  const [openCreate, setOpenCreate] = useState({
    editForm: false,
    item: {},
    open: false,
  });
  const [openDelete, setOpenDelete] = useState({
    title: "",
    id: "",
    open: false,
  });
  const [listData, setListData] = useState([]);
  const userColumns = [
    {
      key: "avatarImage",
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
    { key: "name", label: "Tên" },
    { key: "price", label: "Giá" , render: (value) => formatNumber(value) != "NaN" ? formatNumber(value) : value},
    { key: "createdAt", label: "Ngày tạo", render: (value) => value ? new Date(value).toLocaleDateString() : "" },
    {
      key: "option",
      label: "",
      render: (_, row) => (
        <Box display="flex" justifyContent="right" gap={1}>
          <Button
            onClick={() =>
              setOpenCreate({ open: true, editForm: true, item: row })
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
            onClick={() => {
              setOpenDelete({ id: row.slug, title: row.name, open: true });
            }}
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

  const fecthData = () =>
    fetch(`${BE_URL}/products?limit=1000`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    })
      .then((res) => res.json())
      .then((respone) => {
        if (respone) {
          setListData(respone.products);
        }
      });

  useEffect(() => {
    fecthData()
  }, []);

  const handleDelete = (slug) => {
    if (openDelete.open) {
      if (!slug) return;
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      fetch(`${BE_URL}/products/${slug}`, {
        method: "DELETE",
        headers: myHeaders,
      })
        .then((res) => {
          if (!res.ok) {
            toast.error("Lỗi khi xóa sản phẩm");
            return;
          }
          toast.success("Xóa sản phẩm thành công");
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

          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
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
            onClick={() => setOpenCreate((pre) => ({ ...pre, open: true }))}
            sx={{
              borderRadius: 2,
              textTransform: "none",
              bgcolor: "#635BFF",
              "&:hover": { bgcolor: "#5249f0" },
            }}
          >
            Thêm sản phẩm
          </Button>
        </Stack>
      </Stack>
      <DynamicTable columns={userColumns} data={listData} />
      <CreateProduct_Dialog
        open={openCreate.open}
        handleClose={() =>
          setOpenCreate({ editForm: false, item: {}, open: false })
        }
        editForm={openCreate.editForm}
        item={openCreate.item}
        reload={()=>fecthData()}
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

ProductTable.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
