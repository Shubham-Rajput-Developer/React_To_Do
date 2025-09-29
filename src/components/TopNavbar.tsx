import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  Box,
  useTheme,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useTodos } from "../store/todos";

const TopNavbar: React.FC = () => {
  const { searchTerm, setSearchTerm } = useTodos();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md")); // desktop only

  if (!isDesktop) return null; // hide on mobile/tablet

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "#f9f9f9", // light clean background
        color: "#333",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)", // subtle shadow
        ml: "240px", // beside sidebar
        width: `calc(100% - 240px)`,
        borderBottom: "1px solid #e0e0e0",
        //zIndex: (theme) => theme.zIndex.drawer + 2, // lower than Drawer (+3)

      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", py: 1 }}>
        {/* Left: Dashboard title */}
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            fontFamily: "Roboto, sans-serif",
            color: "#1a237e",
          }}
        >
          Dashboard
        </Typography>

        {/* Middle: Search field */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            background: "linear-gradient(90deg, #fff, #f1f3f4)",
            borderRadius: 5,
            px: 2,
            width: "50%",
            maxWidth: 600,
            boxShadow: "0 2px 4px rgba(0,0,0,0.08)",
            transition: "all 0.3s ease",
            "&:hover": { boxShadow: "0 4px 10px rgba(0,0,0,0.12)" },
          }}
        >
          <SearchIcon sx={{ mr: 1, color: "#757575" }} />
          <InputBase
            placeholder="Search tasks…"
            sx={{ flex: 1, fontSize: 16 }}
             value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Box>

        {/* Right: Settings / Profile */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton
            sx={{
              backgroundColor: "#e8eaf6",
              "&:hover": { backgroundColor: "#c5cae9" },
            }}
          >
            <SettingsIcon sx={{ color: "#1a237e" }} />
          </IconButton>
          <IconButton
            sx={{
              backgroundColor: "#e8eaf6",
              "&:hover": { backgroundColor: "#c5cae9" },
            }}
          >
            <AccountCircleIcon sx={{ color: "#1a237e" }} />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopNavbar;
