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


export default function Navbar({ photoURL }) {
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
    window.location.reload();
  };
  return (
    <AppBar position="fixed" >
      <Toolbar
        sx={{
          background: "#fff",
          color: "#000",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography sx={{ fontSize: "40px", fontWeight: "bold" }}>
          PdfXtract
        </Typography>
        <Box
          sx={{
            mr: "10vh",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              mr: "10vh",
              [theme.breakpoints.down("ms2")]: { display: "none" },
            }}
          >
            <Link to="/pdf" style={{ textDecoration: "none" }}>
              <Typography
                sx={{
                  fontSize: "3vh",
                  fontWeight: "bold",
                  color: "black",
                }}
                onMouseEnter={(e) => (e.target.style.color = "orange")}
                onMouseLeave={(e) => (e.target.style.color = "black")}
              >
                Upload
              </Typography>
            </Link>
          </Box>

          <Box sx={{ [theme.breakpoints.down("md")]: { display: "none" } }}>
            <Link to="/history" style={{ textDecoration: "none" }}>
              <Typography
                sx={{
                  fontSize: "3vh",
                  fontWeight: "bold",
                  color: "black",
                }}
                onMouseEnter={(e) => (e.target.style.color = "orange")}
                onMouseLeave={(e) => (e.target.style.color = "black")}
              >
                History
              </Typography>
            </Link>
          </Box>

          <Box sx={{ borderRadius: "50%" }}>
            <IconButton
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              sx={{ border: "1px solid #8E8FFA", ml: "10vh" }}
            >
              <Box
                component="img"
                src={photoURL}
                sx={{
                  width: "5vh",
                  height: "5vh",
                  borderRadius: "50%",
                }}
              />
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleClose}>
                <Button onClick={handleLogout}>Logout</Button>
              </MenuItem>
            </Menu>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
