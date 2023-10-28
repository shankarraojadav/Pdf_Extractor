import { Box, Typography } from "@mui/material";
import Login from "./components/scenes/Login";
import { Routes, Route, useNavigate } from "react-router-dom";
import Pdf from "./components/scenes/Pdf";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { verifyToken } from "./state/api";
import History from "./components/scenes/History/History";
import Navbar from "./components/Navbar";
import Extract from "./components/scenes/Extract/Extract";
import BottomNavbar from "./components/BottomNavbar";

export default function App() {
  const { isLoggedIn, user } = useSelector((state) => state.signin);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = localStorage.getItem("jwt");

  const { photoURL } = user || {};

  useEffect(() => {
    if (!isLoggedIn && token) {
      dispatch(verifyToken(token));
      console.log("token and isLoggedIn")
    }

    if (isLoggedIn) {
      navigate("/pdf");
      console.log("isLoggedIn")
    }
  }, [token, isLoggedIn, dispatch, navigate]);

  return (
    <Box>
      {isLoggedIn && <Navbar photoURL={photoURL} />}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/pdf" element={<Pdf />} />
        <Route path="/history" element={<History />} />
        <Route path="/extract" element={<Extract />} />
      </Routes>
      {isLoggedIn && <BottomNavbar />}
    </Box>
  );
}
