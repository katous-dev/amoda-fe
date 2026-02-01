"use client";
import AdminLayout from "./layout";
import { useEffect, useState } from "react";
import {
  Box,
  TextField,
  InputAdornment,
  Button,
  Stack,
  CircularProgress,
} from "@mui/material";
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
  const [loading, setLoading] = useState(true);
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
    {
      key: "price",
      label: "Giá",
      render: (value) =>
        formatNumber(value) != "NaN" ? formatNumber(value) : value,
    },
    {
      key: "createdAt",
      label: "Ngày tạo",
      render: (value) => (value ? new Date(value).toLocaleDateString() : ""),
    },
    {
      key: "option",
      label: "",
      render: (_, row) => (
        <Box
          display="flex"
          justifyContent="right"
          gap={1}
          flexDirection={{ xs: "column", md: "row" }}
        >
          <Button
            onClick={() =>
              setOpenCreate({ open: true, editForm: true, item: row })
            }
            variant="contained"
            sx={{
              borderRadius: 2,
              textTransform: "none",
              minWidth: { xs: "100%", md: "auto" },
            }}
            className="btn-primary"
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
              minWidth: { xs: "100%", md: "auto" },
            }}
            className="btn-red"
          >
            Xóa
          </Button>
        </Box>
      ),
    },
  ];

  const fecthData = () => {
    setLoading(true);
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
      })
      .finally(() => setLoading(false));
  };

  useEffect(()=>{
    if(String(searchText).trim() == ""){
      // eslint-disable-next-line react-hooks/set-state-in-effect
      fecthData();
    }
  },[searchText])

  const handleDelete = (slug) => {
    if (openDelete.open) {
      if (!slug) return;
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append(
        "Authorization",
        "Bearer " + localStorage.getItem("accessToken"),
      );
      fetch(`${BE_URL}/products/${slug}`, {
        method: "DELETE",
        headers: myHeaders,
      })
        .then((res) => {
          if (!res.ok) {
            toast.error("Lỗi khi xóa sản phẩm, vui lòng đăng nhập lại!");
            return;
          }
          toast.success("Xóa sản phẩm thành công");
          setOpenDelete({ title: "", id: "", open: false });
          fecthData();
          return res.json();
        })
        .catch((err) => {
          toast.error(err);
        });
    }
  };

  const fecthSearchData = () => {
    try {
      if (searchText != "") {
        fetch(`${BE_URL}/search `, {
          method: "POST",
          body: JSON.stringify({ q: searchText }),
          headers: myHeaders,
        })
          .then((res) => {
            if (!res.ok) return;
            return res.json();
          })
          .then((res) => {
            if (res.products && res.news) {
              setListData(res.products);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        fecthData();
      }
    } catch (err) {
      console.log(err);
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
        <form
          onSubmit={(e) => {
            e.preventDefault();
            fecthSearchData();
          }}
        >
          <Stack direction="row" spacing={1}>
            <TextField
              placeholder="Tìm kiếm..."
              size="small"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              sx={{
                bgcolor: "white",
                borderRadius: 2,
                width: { md: 300 },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "var(--button-border)",
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={{ color: "text.secondary" }} />
                  </InputAdornment>
                ),
              }}
            />
            <button type="submit" style={{ display: "none" }}></button>
            <Button
              variant="outlined"
              type="submit"
              startIcon={<FilterList />}
              sx={{
                borderRadius: 2,
                textTransform: "none",
                color: "var(--button-color)",
                borderColor: "var(--button-border)",
                "&:hover": {
                  color: "var(--button-border)",
                },
              }}
            >
              Lọc
            </Button>
          </Stack>
        </form>

        <Stack direction="row" spacing={1}>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => setOpenCreate((pre) => ({ ...pre, open: true }))}
            sx={{
              borderRadius: 2,
              textTransform: "none",
            }}
            className="btn-primary"
          >
            Thêm sản phẩm
          </Button>
        </Stack>
      </Stack>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <DynamicTable columns={userColumns} data={listData} />
      )}
      <CreateProduct_Dialog
        open={openCreate.open}
        handleClose={() =>
          setOpenCreate({ editForm: false, item: {}, open: false })
        }
        editForm={openCreate.editForm}
        item={openCreate.item}
        reload={() => fecthData()}
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
