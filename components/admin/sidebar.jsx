import { MdSpaceDashboard } from "react-icons/md";
import { AiFillProduct } from "react-icons/ai";
import { FaRegNewspaper } from "react-icons/fa6";


import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { usePathname, useRouter } from "next/navigation";

const sideBarConfigs = [
  {
    title: "Dashboard",
    icon: <MdSpaceDashboard size={24}/>,
    path: "/dashboard",
  },
  {
    title: "Product",
    icon: <AiFillProduct size={24}/>,
    path: "/products",
  },
  {
    title: "News",
    icon: <FaRegNewspaper size={24}/>,
    path: "/news",
  },
];

export default function SidebarContent() {
  const router = useRouter();
  const pathName = usePathname();

  return (
    <Box
      sx={{ p: 2, height: "100%", display: "flex", flexDirection: "column" }}
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: 800,
          color: "#635BFF",
          mb: 4,
          px: 2,
          display: "flex",
          alignItems: "center",
        }}
      >
        AMODA
      </Typography>

      <Typography
        variant="caption"
        sx={{ color: "text.secondary", fontWeight: 700, px: 2, mb: 1 }}
      >
        GENERAL
      </Typography>
      <List>
        {sideBarConfigs.map((item) => (
          <ListItem
            key={item.title}
            disablePadding
            sx={{ mb: 0.5 }}
            onClick={() => router.push(`/admin${item.path}`)}
          >
            <ListItemButton
              sx={{
                borderRadius: 3,
                bgcolor: pathName.includes(item.path)
                  ? "#F0EFFF"
                  : "transparent",
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 40,
                  color: pathName.includes(item.path) ? "#635BFF" : "#666",
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.title}
                primaryTypographyProps={{
                  fontSize: "0.9rem",
                  fontWeight: pathName.includes(item.path) ? 700 : 500,
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
