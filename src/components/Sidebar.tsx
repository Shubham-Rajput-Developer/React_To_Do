import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Tooltip,
  Divider,
  Typography,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import AddIcon from "@mui/icons-material/Add";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useTodos } from "../store/todos";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import html2canvas from "html2canvas";
import html2pdf from "html2pdf.js";

type NavValue = "all" | "active" | "completed" | string;
const drawerWidth = 240;

interface SidebarProps {
  onAddTaskClick: () => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
  dashboardRef: React.RefObject<HTMLDivElement | null>;
}

const Sidebar: React.FC<SidebarProps> = ({
  onAddTaskClick,
  mobileOpen,
  onMobileClose,
  dashboardRef, 
}) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { todos } = useTodos();

  const todosData = searchParams.get("todos");
  let selectedNav: NavValue = "all";
  if (todosData === "active") selectedNav = "active";
  if (todosData === "completed") selectedNav = "completed";

  const handleNavClick = (value: NavValue) => {
    switch (value) {
      case "all":
        navigate("/");
        break;
      case "active":
        navigate("/?todos=active");
        break;
      case "completed":
        navigate("/?todos=completed");
        break;
    }
    onMobileClose();
  };

  const exportToExcel = () => {
    const rows = todos.map((t) => ({
      Task: t.task,
      Completed: t.completed,
      DueDate: t.dueDate ? new Date(t.dueDate).toLocaleDateString() : "-",
      Status: t.status,
    }));
    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Todos");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(data);
    a.download = "todos.xlsx";
    a.click();
  };

  //jspdf
  const exportToPDF = () => {
    const doc = new jsPDF();
    const tableColumn = ["Task", "Completed", "Due Date", "Status"];
    const tableRows = todos.map((t) => [
      t.task,
      t.completed ? "Yes" : "No",
      t.dueDate ? new Date(t.dueDate).toLocaleDateString() : "-",
      t.status,
    ]);
    autoTable(doc, { head: [tableColumn], body: tableRows });
    doc.save("todos.pdf");
  };

  //html2canvas&jspdf
  const downloadDashboardPDF = async () => {
    const element = document.getElementById("dashboard-container");
    if (!element) return;

    // Capture the dashboard
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "pt", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("dashboard.pdf");
  };

  //html2pdf.js
  const downloadDashboardPDFhtml2pdf = (dashboardRef: React.RefObject<HTMLDivElement | null>) => {
  //if (!ref.current) return; // ✅ 
    if (!dashboardRef.current) return;

  const element = dashboardRef.current;

  const opt = {
    margin:       10,
    filename:     "dashboard.pdf",
    image:        { type: "jpeg", quality: 0.98 },
    html2canvas:  { scale: 2, useCORS: true, scrollY: -window.scrollY },
    jsPDF:        { unit: "pt", format: "a4", orientation: "portrait" },
  };

  // Run pdf generation in a setTimeout to prevent crash on large content
  setTimeout(() => {
    html2pdf()
  .set(opt)
  .from(element)
  .save()
  .catch((err: unknown) => {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error("Unexpected error:", err);
    }
  });
  }, 500);
};
  const menuItems = [
    { label: "Dashboard", icon: <HomeIcon />, value: "all" },
    { label: "Active", icon: <PendingActionsIcon />, value: "active" },
    { label: "Completed", icon: <CheckCircleIcon />, value: "completed" },
  ];

  const drawerContent = (
    <>
      <Toolbar sx={{ justifyContent: "center", py: 2 }}>
        <AssignmentIcon sx={{ mr: 1, color: "#fff" }} />
        <Typography variant="h6" sx={{ color: "#fff", fontWeight: 600 }}>
          Task Manager
        </Typography>
      </Toolbar>
      <Divider sx={{ bgcolor: "rgba(255,255,255,0.3)" }} />

      <List>
        {menuItems.map((item) => (
          <Tooltip title={item.label} key={item.value} placement="right">
            <ListItem disablePadding>
              <ListItemButton
                selected={selectedNav === item.value}
                onClick={() => handleNavClick(item.value)}
                sx={{
                  borderRadius: 2,
                  mb: 0.5,
                  "&.Mui-selected": {
                    backgroundColor: "rgba(255,255,255,0.3)",
                  },
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.15)",
                  },
                }}
              >
                <ListItemIcon sx={{ color: "#fff" }}>{item.icon}</ListItemIcon>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{ fontWeight: 500 }}
                />
              </ListItemButton>
            </ListItem>
          </Tooltip>
        ))}
      </List>

      <Divider sx={{ bgcolor: "rgba(255,255,255,0.3)", mt: 2 }} />

      <List sx={{ mt: 2 }}>
        <ListItem disablePadding>
          <ListItemButton
            onClick={exportToExcel}
            sx={{
              borderRadius: 2,
              mb: 0.5,
              "&:hover": { backgroundColor: "rgba(255,255,255,0.15)" },
            }}
          >
            <ListItemIcon sx={{ color: "#fff" }}>
              <FileDownloadIcon />
            </ListItemIcon>
            <ListItemText
              primary="Export Excel"
              primaryTypographyProps={{ fontWeight: 500 }}
            />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            onClick={exportToPDF}
            sx={{
              borderRadius: 2,
              mb: 0.5,
              "&:hover": { backgroundColor: "rgba(255,255,255,0.15)" },
            }}
          >
            <ListItemIcon sx={{ color: "#fff" }}>
              <PictureAsPdfIcon />
            </ListItemIcon>
            <ListItemText
              primary="Export PDF"
              primaryTypographyProps={{ fontWeight: 500 }}
            />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            onClick={onAddTaskClick}
            sx={{
              borderRadius: 2,
              mb: 0.5,
              "&:hover": { backgroundColor: "rgba(255,255,255,0.15)" },
            }}
          >
            <ListItemIcon sx={{ color: "#fff" }}>
              <AddIcon />
            </ListItemIcon>
            <ListItemText
              primary="Create Task"
              primaryTypographyProps={{ fontWeight: 500 }}
            />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton
            onClick={()=>downloadDashboardPDFhtml2pdf(dashboardRef)}
            sx={{
              borderRadius: 2,
              mb: 0.5,
              "&:hover": { backgroundColor: "rgba(255,255,255,0.15)" },
            }}
          >
            <ListItemIcon sx={{ color: "#fff" }}>
              <PictureAsPdfIcon />
            </ListItemIcon>
            <ListItemText
              primary="htlm2pdf.js"
              primaryTypographyProps={{ fontWeight: 500 }}
            />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            onClick={downloadDashboardPDF}
            sx={{
              borderRadius: 2,
              mb: 0.5,
              "&:hover": { backgroundColor: "rgba(255,255,255,0.15)" },
            }}
          >
            <ListItemIcon sx={{ color: "#fff" }}>
              <PictureAsPdfIcon />
            </ListItemIcon>
            <ListItemText
              primary="jspdf/html2canvas"
              primaryTypographyProps={{ fontWeight: 500 }}
            />
          </ListItemButton>
        </ListItem>
      </List>
    </>
  );

  return (
    <>
      {/* Desktop Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            background: "linear-gradient(180deg,#3f51b5,#1a237e)",
            color: "#fff",
            border: "none",
            boxShadow: "2px 0 6px rgba(0,0,0,0.1)",
          },
        }}
        open
      >
        {drawerContent}
      </Drawer>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onMobileClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            background: "linear-gradient(180deg,#3f51b5,#1a237e)",
            color: "#fff",
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

export default Sidebar;
