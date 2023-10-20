import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { useSelector, useDispatch } from "react-redux";
import { Box, Button, Typography } from "@mui/material";
import { pdfExtract } from "../../../state/api";
import { useNavigate } from "react-router-dom";
import { theme } from "../../../theme";
import "./pdfview.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function PdfViewer() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [numPages, setNumPages] = useState(null);
  const [selectedPages, setSelectedPages] = useState([]);
  const { pdfUrl } = useSelector((state) => state.pdfData || {});

  const handlePageSelect = (pageNumber) => {
    setSelectedPages((prevSelectedPages) => {
      if (prevSelectedPages.includes(pageNumber)) {
        return prevSelectedPages.filter((page) => page !== pageNumber);
      } else {
        return [...prevSelectedPages, pageNumber];
      }
    });
  };

  const handleExtract = () => {
    dispatch(pdfExtract({ selectedPages, pdfUrl }));
    navigate("/extract");
  };

  return (
    <Box className="pdfviewer">
      <Document file={pdfUrl} onLoadSuccess={({ numPages }) => setNumPages(numPages)}>
        <Box className="pdf_page">
          {Array.from(new Array(numPages), (el, index) => (
            <Box key={`page_${index + 1}`} className="pdfview">
              <Box className="checkbox">
                <input
                  type="checkbox"
                  checked={selectedPages.includes(index + 1)}
                  onChange={() => handlePageSelect(index + 1)}
                  className="checkbox-input"
                />
                <label htmlFor={`page_${index + 1}`}>Click here to select Page {index + 1}</label>
              </Box>
              <Page pageNumber={index + 1} width={window.innerWidth - 40} />
            </Box>
          ))}
        </Box>
      </Document>
      <Box
        sx={{
          position: "fixed",
          left: "50%",
          transform: "translateX(-50%)", 
          bottom: "30vh", 
        }}
      >
        <Button variant="contained" onClick={handleExtract}>
          <Typography sx={{ fontSize: "4vh", fontWeight: "bold" }}>Extract</Typography>
        </Button>
      </Box>
    </Box>
  );
}
