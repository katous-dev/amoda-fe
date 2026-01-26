import { useState } from "react";
import {
  Box,
  CssBaseline,
  Drawer,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import SidebarContent from "../../components/admin/sidebar";
const drawerWidth = 260;

export default function AdminLayout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  return (
    <Box sx={{ display: "flex", bgcolor: "#F8F9FE", minHeight: "100vh" }}>
      <CssBaseline />
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant={isMobile ? "temporary" : "permanent"}
          open={isMobile ? mobileOpen : true}
          onClose={handleDrawerToggle}
          sx={{
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              borderRight: "1px solid #E0E4EC",
            },
          }}
        >
          <SidebarContent />
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, md: 4 },
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

const Button = ({ children, variant, sx, ...props }) => (
  <Box
    component="button"
    sx={{
      px: 2,
      py: 1,
      borderRadius: 2,
      border: "1px solid #E0E4EC",
      bgcolor: variant === "contained" ? "#635BFF" : "white",
      color: variant === "contained" ? "white" : "#333",
      fontWeight: 600,
      cursor: "pointer",
      outline: "none",
      "&:hover": { opacity: 0.9 },
      ...sx,
    }}
    {...props}
  >
    {children}
  </Box>
);
