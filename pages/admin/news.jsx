"use client";
import AdminLayout from "./layout";
import { useEffect, useState } from "react";
import { Box, TextField, InputAdornment, Button, Stack, CircularProgress } from "@mui/material";
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
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
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

  const fecthData = () => {
    setLoading(true);
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
      })
      .finally(() => setLoading(false));
  };

  const fecthSearchData = () => {
    try {
      if (searchText != "") {
        fetch(`${BE_URL}/search `, {
          method: "POST",
          body: JSON.stringify({ search: searchText }),
          headers: myHeaders,
        })
          .then((res) => {
            if (!res.ok) return;
            return res.json();
          })
          .then((res) => {
            if (res.products && res.news) {
              setListData(res.news);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
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
    {
      key: "dateTime",
      label: "Ngày đăng",
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
              setOpenForm({ open: true, editForm: true, item: row })
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
            onClick={() =>
              setOpenDelete({ id: row.slug, title: row.title, open: true })
            }
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
            toast.error("Lỗi khi xóa tin tức, vui lòng đăng nhập lại!");
            return;
          }
          toast.success("Xóa tin tức thành công");
          setOpenDelete({ title: "", id: "", open: false });
          fecthData();
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
        <Stack direction="row" spacing={1}>
          <form onSubmit={(e) => {
            e.preventDefault();
            fecthSearchData();
          }}>
          <TextField
            placeholder="Tìm kiếm..."
            size="small"
            value={searchText}
            onChange={(e)=>setSearchText(e.target.value)}
            sx={{
              bgcolor: "white",
              borderRadius: 2,
              width: { md: 300 },
              "& .MuiOutlinedInput-notchedOutline": { borderColor: 'var(--button-border)' },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: "text.secondary" }} />
                </InputAdornment>
              ),
            }}
          />
          <button type="submit" style={{display:"none"}}></button>
          </form>
          <Button
            variant="outlined"
            startIcon={<FilterList />}
            sx={{
              borderRadius: 2,
              textTransform: "none",
              color: 'var(--button-color)',
              borderColor: 'var(--button-border)',
            }}
          >
            Lọc
          </Button>
        </Stack>
        <Stack direction="row" spacing={1}>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => setOpenForm((pre) => ({ ...pre, open: true }))}
            sx={{
              borderRadius: 2,
              textTransform: "none",
            }}

           className="btn-primary" 
          >
            Thêm bảng tin
          </Button>
        </Stack>
      </Stack>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
          <CircularProgress />
        </Box>
      ) : (
        <DynamicTable columns={newsColumns} data={listData} />
      )}

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
