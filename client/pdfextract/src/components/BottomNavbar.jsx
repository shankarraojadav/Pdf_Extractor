import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { theme } from "../theme";

export default function BottomNavbar({ photoURL }) {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    navigate("/");
  };
  return (
    <AppBar
      sx={{
        position: "fixed",
        bottom: "0",
        mt: "86vh",
        display: "none",
        [theme.breakpoints.down("ms2")]: { display: "block" },
        
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-around" }}>
        <Box>
          <Link to="/pdf" style={{ textDecoration: "none" }}>
            <Typography
              sx={{ fontSize: "3vh", fontWeight: "bold", color: "#fff" }}
            >
              Upload
            </Typography>
          </Link>
        </Box>
        <Box>
          <Link to="/history" style={{ textDecoration: "none" }}>
            <Typography
              sx={{ fontSize: "3vh", fontWeight: "bold", color: "#fff" }}
            >
              History
            </Typography>
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
