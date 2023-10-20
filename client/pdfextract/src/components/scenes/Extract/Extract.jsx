import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { useSelector } from "react-redux";
import { Box, Button, Typography } from "@mui/material";
import LinearWithValueLabel from "../upload/progressbar";
import "./extraPdf.css";
import { theme } from "../../../theme";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function Extract() {
  const [numPages, setNumPages] = useState(null);

  const { isLoading, pdfUrl } = useSelector((state) => state.extractedPdfs || {});

  const urlPdf = pdfUrl?.cloudinaryUrl;

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

  const handleDownload = () => {
    window.open(`${urlPdf}`, "_blank");
  }

  return (
    <div  className="pdfviewer">
      <Document
        file={urlPdf}
        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
      >
        <div style={{ overflowY: "scroll", height: "600px" }}>
          {Array.from(new Array(numPages), (el, index) => (
            <div key={`page_${index + 1}`} className="pdfview">
              <Page pageNumber={index + 1}  width={window.innerWidth - 40} />
            </div>
          ))}
        </div>
      </Document>
      <Box sx={{
          position: "fixed",
          left: "50%",
          transform: "translateX(-50%)", 
          bottom: "30vh", 
        }}>
        <Button variant="contained" onClick={handleDownload}>
          <Typography sx={{ fontSize: "4vh", fontWeight: "bold" }}>
            Download
          </Typography>
        </Button>
      </Box>
    </div>
  );
}
