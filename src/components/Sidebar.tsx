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
//import FileDownloadIcon from "@mui/icons-material/FileDownload";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import AddIcon from "@mui/icons-material/Add";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { useNavigate, useSearchParams } from "react-router-dom";
//import { useTodos } from "../store/todos";
//import * as XLSX from "xlsx";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";

//import html2pdf from "html2pdf.js";
//import html2pdf from "html2pdf.js";


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
  //dashboardRef, 
}) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  //const { todos } = useTodos();

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

  // const exportToExcel = () => {
  //   const rows = todos.map((t) => ({
  //     Task: t.task,
  //     Completed: t.completed,
  //     DueDate: t.dueDate ? new Date(t.dueDate).toLocaleDateString() : "-",
  //     Status: t.status,
  //   }));
  //   const worksheet = XLSX.utils.json_to_sheet(rows);
  //   const workbook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(workbook, worksheet, "Todos");
  //   const excelBuffer = XLSX.write(workbook, {
  //     bookType: "xlsx",
  //     type: "array",
  //   });
  //   const data = new Blob([excelBuffer], { type: "application/octet-stream" });
  //   const a = document.createElement("a");
  //   a.href = URL.createObjectURL(data);
  //   a.download = "todos.xlsx";
  //   a.click();
  // };

  // //jspdf
  // const exportToPDF = () => {
  //   const doc = new jsPDF();
  //   const tableColumn = ["Task", "Completed", "Due Date", "Status"];
  //   const tableRows = todos.map((t) => [
  //     t.task,
  //     t.completed ? "Yes" : "No",
  //     t.dueDate ? new Date(t.dueDate).toLocaleDateString() : "-",
  //     t.status,
  //   ]);
  //   autoTable(doc, { head: [tableColumn], body: tableRows });
  //   doc.save("todos.pdf");
  // };

//   //html2canvas&jspdf  - cutting component
// const downloadDashboardPDF = async () => {
//   const container = document.getElementById("dashboard-container");
//   if (!container) return;

//   const pdf = new jsPDF("p", "pt", "a4");
//   const pdfWidth = pdf.internal.pageSize.getWidth();
//   const pdfHeight = pdf.internal.pageSize.getHeight();

//   let yOffset = 20; // starting top padding
//   const gap = 15;   // space between components

//   const children = Array.from(container.children);

//   for (let i = 0; i < children.length; i++) {
//     const el = children[i] as HTMLElement;

//     // Render each child element
//     const canvas = await html2canvas(el, { scale: 2 });
//     const imgData = canvas.toDataURL("image/png");

//     const imgWidth = pdfWidth - 40; // leave side margins
//     const imgHeight = (canvas.height * imgWidth) / canvas.width;

//     // If this element won't fit on the current page → move to next page
//     if (yOffset + imgHeight > pdfHeight - 40) {
//       pdf.addPage();
//       yOffset = 20; // reset offset for new page
//     }

//     // Add the element image
//     pdf.addImage(imgData, "PNG", 20, yOffset, imgWidth, imgHeight);

//     // Update yOffset for next element
//     yOffset += imgHeight + gap;
//   }

//   pdf.save("dashboard.pdf");
// };


 //html2canvas&jspdf  - with each child component on separate page not
// const downloadDashboardPDF = async () => {
//   const container = document.getElementById("dashboard-container");
//   if (!container) return;

//   const pdf = new jsPDF("p", "pt", "a4");
//   const pdfWidth = pdf.internal.pageSize.getWidth();
//   const pdfHeight = pdf.internal.pageSize.getHeight();

//   let yOffset = 20; // starting top padding
//   const gap = 15;   // space between components

//   const children = Array.from(container.children);

//   for (let i = 0; i < children.length; i++) {
//     const el = children[i] as HTMLElement;

//     // Render each child element
//     const canvas = await html2canvas(el, { scale: 2 });
//     const imgData = canvas.toDataURL("image/png");

//     const imgWidth = pdfWidth - 40; // leave side margins
//     const imgHeight = (canvas.height * imgWidth) / canvas.width;

//     // If this element won't fit on the current page → move to next page
//     if (yOffset + imgHeight > pdfHeight - 40) {
//       pdf.addPage();
//       yOffset = 20; // reset offset for new page
//     }

//     // Add the element image
//     pdf.addImage(imgData, "PNG", 20, yOffset, imgWidth, imgHeight);

//     // Update yOffset for next element
//     yOffset += imgHeight + gap;
//   }

//   pdf.save("dashboard.pdf");
// };


// with date and time of download by name also
const downloadDashboardPDF = async (): Promise<void> => {
 const container = document.getElementById("dashboard-container");
  if (!container) return;

  const pdf = new jsPDF("p", "pt", "a4");
  const { getWidth: pdfWidth, getHeight: pdfHeight } = pdf.internal.pageSize;

  let yOffset = 20;
  const gap = 15;
 
  const timestamp = new Date().toLocaleString();

  // Loop through all visible children
  for (const el of Array.from(container.children) as HTMLElement[]) {
    if (!el.offsetParent) continue;

    const canvas = await html2canvas(el, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const imgWidth = pdfWidth() - 40; // margins
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    // Add new page if image does not fit
    if (yOffset + imgHeight > pdfHeight() - 60) {
      pdf.addPage();
      yOffset = 20;
    }

    pdf.addImage(imgData, "PNG", 20, yOffset, imgWidth, imgHeight);
    yOffset += imgHeight + gap;
  }


  //  Footer
  // const pageCount = pdf.getNumberOfPages();

  // for (let i = 1; i <= pageCount; i++) {
  //   pdf.setPage(i);
  //   pdf.setFontSize(9);
  //   pdf.setTextColor(100);

  //   pdf.text(
  //     `Created by Task Manager | Downloaded: ${timestamp}`,
  //     pdfWidth / 2,
  //     pdfHeight - 20,
  //     { align: "center" }
  //   );

  //   pdf.text(`Page ${i} of ${pageCount}`, pdfWidth - 40, pdfHeight - 20);
  // }

//only for last page 
pdf.setFontSize(9);
pdf.setTextColor(100);

// Move to last page
pdf.setPage(pdf.getNumberOfPages());

pdf.text(
  `Created by Task Manager | Downloaded: ${timestamp}`,
  pdf.internal.pageSize.getWidth() / 2,
  pdf.internal.pageSize.getHeight() - 20,
  { align: "center" }
);

  pdf.save("dashboard.pdf");
};











//   //html2pdf.js
//   const downloadDashboardPDFhtml2pdf = () => {
//   if (!dashboardRef.current) return;

//   const element = dashboardRef.current;

//   //  Expand scrollable content before capturing
//   const prevOverflow = element.style.overflow;
//   element.style.overflow = "visible"; 

//   const opt = {
//     margin: [10, 10, 10, 10], // top, left, bottom, right
//     filename: "dashboard.pdf",
//     image: { type: "jpeg", quality: 0.98 },
//     html2canvas: {
//       scale: 2,
//       useCORS: true,
//       scrollX: 0,
//       scrollY: 0,
//       windowWidth: element.scrollWidth,
//       windowHeight: element.scrollHeight,
//     },
//     jsPDF: { unit: "pt", format: "a4", orientation: "portrait" },
//   };

//   html2pdf()
//     .set(opt)
//     .from(element)
//     .toPdf()
//     .get("pdf")
//     .then((pdf: any) => {
//       const pageCount = pdf.internal.getNumberOfPages();
//       for (let i = 1; i <= pageCount; i++) {
//         pdf.setPage(i);
//         // 🔑 Center content on every page
//         const pageWidth = pdf.internal.pageSize.getWidth();
//         const contentWidth = pdf.internal.pageSize.getWidth();
//         const xOffset = (pageWidth - contentWidth) / 2;
//         pdf.internal.write("q", xOffset, "0", "0", "1", "0", "0", "cm");
//       }
//     })
//     .save()
//     .finally(() => {
//       // Restore scroll behavior after export
//       element.style.overflow = prevOverflow;
//     });
// };

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

{/* Create menu button */}
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

{/* download pdf button */}
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
              primary="Export PDF"
              primaryTypographyProps={{ fontWeight: 500 }}
            />
          </ListItemButton>
        </ListItem>

        {/* <ListItem disablePadding>
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
        </ListItem> */}
        {/* <ListItem disablePadding>
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
         */}

        {/* <ListItem disablePadding>
          <ListItemButton
            onClick={()=>downloadDashboardPDFhtml2pdf()}
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
              primary="html2pdf.js"
              primaryTypographyProps={{ fontWeight: 500 }}
            />
          </ListItemButton>
        </ListItem> */}
       
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
