import { Box, Typography } from "@mui/material";
import AddTaskSharpIcon from "@mui/icons-material/AddTaskSharp";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "#f5f5f5",
        borderTop: "1px solid #e0e0e0",
        py: 2,
        px: 2,
        width: { xs: "100%", md: "calc(100% - 240px)" }, // align with main content
        ml: { md: "240px" }, // offset for sidebar
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 4, // spacing from content
        borderRadius: 2,
      }}
    >
      {/* Title with Icon */}
      <Box display="flex" alignItems="center" gap={1} mb={1}>
        <AddTaskSharpIcon sx={{ color: "#3f51b5" }} />
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Task Manager
        </Typography>
      </Box>
      
      

      {/* Copyright */}
      <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center" }}>
        &copy; 2025 Task Manager. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
