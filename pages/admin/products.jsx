import AdminLayout from "./layout";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  Avatar,
  Typography,
  Box,
  Chip,
  IconButton,
  TextField,
  InputAdornment,
  Button,
  Stack,
  Tooltip,
} from "@mui/material";
import {
  Search,
  FilterList,
  SwapVert,
  Add,
  DeleteOutline,
  EditOutlined,
  MoreHoriz,
  UnfoldMoreOutlined,
} from "@mui/icons-material";

const initialProducts = [
  {
    id: 1,
    name: "Mens T-shirt",
    category: "Clothes",
    status: "Out off stock",
    stock: 449,
    price: 172.0,
    img: "https://images.clothes.com/tshirt.jpg",
    color: "#f5f5f5",
  },
  {
    id: 2,
    name: "Leather Hand Bag",
    category: "Bag",
    status: "In Stock",
    stock: 223,
    price: 112.0,
    img: "https://images.bags.com/leather.jpg",
    color: "#fff3e0",
  },
  {
    id: 3,
    name: "Micellar Hyaluronic Aloe Water",
    category: "Sunscreen",
    status: "In Stock",
    stock: 386,
    price: 40.0,
    sold: "1.450 Sold",
    color: "#e0f7fa",
  },
];

export default function ProductTable() {
  const [selected, setSelected] = useState([3]); 

  return (
    <Box sx={{ width: "100%" }}>
      {/* 1. Toolbar phía trên */}
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        justifyContent="space-between"
        alignItems={{ xs: "stretch", md: "center" }}
        sx={{ mb: 3 }}
      >
        <TextField
          placeholder="Search..."
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
            startIcon={<SwapVert />}
            sx={{
              borderRadius: 2,
              textTransform: "none",
              color: "#333",
              borderColor: "#E0E4EC",
            }}
          >
            Sort
          </Button>
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
            Filter
          </Button>
          <Button
            variant="contained"
            startIcon={<Add />}
            sx={{
              borderRadius: 2,
              textTransform: "none",
              bgcolor: "#635BFF",
              "&:hover": { bgcolor: "#5249f0" },
            }}
          >
            Add Product
          </Button>
        </Stack>
      </Stack>

      {/* 2. Container Table */}
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: 4,
          boxShadow: "none",
          border: "1px solid #E0E4EC",
          overflow: "hidden",
        }}
      >
        <Table sx={{ minWidth: 900 }} aria-label="nexus table">
          <TableHead sx={{ bgcolor: "#F8F9FE" }}>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox size="small" />
              </TableCell>
              <TableCell sx={headerStyle}>
                PRODUCT <UnfoldMoreOutlined sx={{ fontSize: 16, ml: 0.5 }} />
              </TableCell>
              <TableCell sx={headerStyle}>CATEGORY</TableCell>
              <TableCell sx={headerStyle}>STATUS</TableCell>
              <TableCell sx={headerStyle}>STOCK</TableCell>
              <TableCell sx={headerStyle}>PRICE</TableCell>
              <TableCell sx={{ ...headerStyle, textAlign: "right" }}>
                ACTION
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {initialProducts.map((row) => (
              <TableRow
                key={row.id}
                hover
                sx={{
                  bgcolor: selected.includes(row.id) ? "#F8F9FE" : "inherit",
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    size="small"
                    checked={selected.includes(row.id)}
                    color="success"
                  />
                </TableCell>

                {/* Cột Sản phẩm */}
                <TableCell>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar
                      variant="rounded"
                      sx={{
                        bgcolor: row.color || "#eee",
                        width: 44,
                        height: 44,
                        borderRadius: 2,
                        border: "1px solid #f0f0f0",
                      }}
                      src={row.img}
                    />
                    <Box>
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: 700, color: "#1A1C1E" }}
                      >
                        {row.name}
                      </Typography>
                      {row.brand && (
                        <Typography variant="caption" color="text.secondary">
                          {row.brand}
                        </Typography>
                      )}
                    </Box>
                  </Stack>
                </TableCell>

                <TableCell>
                  <Typography variant="body2" color="text.secondary">
                    {row.category}
                  </Typography>
                </TableCell>

                {/* Cột Trạng thái */}
                <TableCell>
                  <Chip
                    label={row.status}
                    size="small"
                    sx={{
                      fontWeight: 600,
                      fontSize: "0.75rem",
                      bgcolor:
                        row.status === "In Stock" ? "#E8F5E9" : "#FFEBEE",
                      color: row.status === "In Stock" ? "#2E7D32" : "#C62828",
                      "& .MuiChip-label": { px: 1 },
                    }}
                    icon={
                      <Box
                        sx={{
                          width: 6,
                          height: 6,
                          borderRadius: "50%",
                          ml: 1,
                          bgcolor: "currentColor",
                        }}
                      />
                    }
                  />
                </TableCell>

                <TableCell>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {row.stock}
                  </Typography>
                  {row.sold && (
                    <Typography variant="caption" color="text.secondary">
                      {row.sold}
                    </Typography>
                  )}
                </TableCell>

                <TableCell>
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>
                    ${row.price.toFixed(2)}
                  </Typography>
                </TableCell>

                {/* Cột Thao tác */}
                <TableCell align="right">
                  <Stack
                    direction="row"
                    spacing={0.5}
                    justifyContent="flex-end"
                  >
                    <Tooltip title="Delete">
                      <IconButton size="small">
                        <DeleteOutline fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit">
                      <IconButton size="small">
                        <EditOutlined fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

const headerStyle = {
  fontWeight: 700,
  fontSize: "0.75rem",
  color: "#666",
  letterSpacing: "0.5px",
  py: 2,
};

ProductTable.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
