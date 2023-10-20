import { useState, useEffect } from "react";
import { CircularProgress, Snackbar, Box, Typography } from "@mui/material";

export default function LinearWithValueLabel() {
  
 

  return (
    <Box container direction="column" alignItems="center">
      <Box sx={{display:"flex", justifyContent:"center", flexDirection:"column",
    alignItems:"center"}}>
        <CircularProgress />
        <Typography sx={{
          fontSize:"3vh", fontWeight:"bold", mt:"2vh"
        }}>Loading...</Typography>
      </Box>
     
    </Box>
  );
}
