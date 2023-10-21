import { useEffect, useState } from "react";
import { pdfhistory } from "../../../state/api";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {theme} from "../../../theme";
import "./pdfhistory.css";


export default function History() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { pdfFiles, isLoading } = useSelector((state) => state.pdfHistory || {});
  console.log(pdfFiles);

  useEffect(() => {
    dispatch(pdfhistory());
  }, []);

  const handleClick = () => {
    navigate("/pdf");
  };

  if (pdfFiles == "") {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          mt: "10vh",
          
        }}
      >
        <Box
          component="img"
          src="https://res.cloudinary.com/dflhxdxgb/image/upload/v1697788463/alligator_mc6c8r.jpg"
          sx={{
            width: "40vh",
          }}
        />

        <Button
          variant="contained"
          onClick={handleClick}
        >
          Click here to Upload
        </Button>
      </Box>
    );
  }
  return (
    <Box className="pdf_box">
      {pdfFiles.map(({ url }, index) => {
        return (
          <Box key={index} className="pdf_card">
            <a href={url} target="_blank">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPKWx4iYn0kFvYU7DAQVrlLbn4E-8cpMan1Q&usqp=CAU"
                alt=""
                width="100vh"
                
              />
            </a>
          </Box>
        );
      })}
    </Box>
  );
}
