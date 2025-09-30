import React, { useState } from "react";
import {
  Box,
  CssBaseline,
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Sidebar from "./Sidebar";
import TodosDashboard from "./TodosDashboard";
import AddTodoForm from "./AddTodoForm";
import TopNavbar from "./TopNavbar";
import Account from "./Account";
import Footer from "./Footer";
//import Account from "./Account";
import {useRef } from "react";


const Dashboard: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [taskDrawerOpen, setTaskDrawerOpen] = useState(false);
  const dashboardRef = useRef<HTMLDivElement>(null);

 

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <CssBaseline />

      {/* Mobile AppBar with only Menu Icon */}
      <AppBar
        position="fixed"
        sx={{
          display: { xs: "flex", md: "none" },
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: "transparent",
          boxShadow: "none",
        }}
      >
        <Toolbar sx={{ minHeight: "56px", px: 1 }}>
          <IconButton
            color="inherit"
            edge="start"
            onClick={() => setDrawerOpen(true)}
            sx={{ color: "#3f51b5" }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Sidebar
        onAddTaskClick={() => setTaskDrawerOpen(true)}
        mobileOpen={drawerOpen}
        onMobileClose={() => setDrawerOpen(false)}
        dashboardRef={dashboardRef} 
      />

      {/* ✅ TopNavbar goes here */}
      <TopNavbar />

      {/* Main Content */}
      <Box
        id="dashboard-container"
        component="main"
        ref={dashboardRef}
        sx={{
          flexGrow: 1,
          minHeight: "100vh",
          backgroundColor: "background.default",
          overflowY: "auto",
          flexDirection: "column",
          // Center content horizontally
          display: "flex",
          justifyContent: "center",
          alignItems: "center",

          // responsive top padding for mobile AppBar
          pt: { xs: "56px", md: 2 },
          ml: { md: "240px" },
          px: { xs: 2, md: 3 }, // horizontal padding
          gap: 6,
        }}
      >
        <Box
          sx={{
            width: { xs: "95%", sm: 700, md: 900 },
            maxWidth: "100%",
            mt: { xs: 2, md: 8 },
            bgcolor:"#fff",
             borderRadius: 3,
            boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
            //p: { xs: 3, md: 4 },
          }}
        >
          
          <TodosDashboard />
        </Box>

        <Box
          sx={{
            width: "100%",
            maxWidth: 1000,
            bgcolor: "#fff",
            borderRadius: 3,
            boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
            p: { xs: 3, md: 4 },
            marginBottom:3
          }}
        >
          
          <Account />
        </Box>
        <Box
          sx={{
            width: "100%",
            maxWidth: 1000,
            bgcolor: "#fff",
            borderRadius: 3,
            boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
            p: { xs: 3, md: 4 },
            marginBottom:3
          }}
        >
          
          <Account />
        </Box>
        
        <Box
          sx={{
            width: { xs: "95%", sm: 700, md: 900 },
            maxWidth: "100%",
            mt: { xs: 2, md: 8 },
            bgcolor:"#fff",
             borderRadius: 3,
            boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
            //p: { xs: 3, md: 4 },
          }}
        >
          
          <TodosDashboard />
        </Box>

        <Box
          sx={{
            width: "100%",
            maxWidth: 1000,
            bgcolor: "#fff",
            borderRadius: 3,
            boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
            p: { xs: 3, md: 4 },
            marginBottom:3
          }}
        >
          
          <Account />
        </Box>

        <Box
          sx={{
            width: { xs: "95%", sm: 700, md: 900 },
            maxWidth: "100%",
            mt: { xs: 2, md: 8 },
            bgcolor:"#fff",
             borderRadius: 3,
            boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
            //p: { xs: 3, md: 4 },
          }}
        >
          
          <TodosDashboard />
        </Box>

        <Box
          sx={{
            width: "100%",
            maxWidth: 1000,
            bgcolor: "#fff",
            borderRadius: 3,
            boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
            p: { xs: 3, md: 4 },
            marginBottom:3
          }}
        >
          <Account />
        </Box>
      </Box>
     <Footer/>
          
        
      {/* Drawer for Add Task */}
      <Drawer
        anchor="right"
        open={taskDrawerOpen}
        onClose={() => setTaskDrawerOpen(false)}
        ModalProps={{
          keepMounted: true,
        }}
        PaperProps={{
          sx: {
            width: { xs: "100%", sm: 400 },
            p: 2,
            //zIndex: (theme) => theme.zIndex.drawer + 3,
            //marginTop:1
            //alignContent:"center"
          },
        }}
      >
        <AddTodoForm onClose={() => setTaskDrawerOpen(false)} />
      </Drawer>
    </Box>
  );
};

export default Dashboard;
