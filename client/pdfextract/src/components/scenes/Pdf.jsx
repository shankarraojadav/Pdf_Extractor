import { Box, Typography, Button } from "@mui/material";
import Upload from "./upload/Upload";
import PdfViewer from "./pdfview/pdfViewer";
import { useDispatch, useSelector } from "react-redux";
import LinearWithValueLabel from "./upload/progressbar";
import History from "./History/History";

export default function Pdf() {
  const { pdfUrl, isLoading } = useSelector((state) => state.pdfData || {});
  console.log(pdfUrl);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: "40vh",
        }}
      >
        <LinearWithValueLabel />
      </Box>
    );
  }
  return (
    <Box>
      <Box sx={{ mt: "10vh" }}>{pdfUrl ? <PdfViewer /> : <Upload />}</Box>
    </Box>
  );
}
