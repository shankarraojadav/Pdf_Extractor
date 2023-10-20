import { useState, useRef } from 'react';
import { Box, Button } from '@mui/material';
import './CustomPdfFileUploader.css';
import { uploadPdf } from '../../../state/api';
import { useDispatch } from "react-redux";


const Upload = () => {
  const dispatch = useDispatch();


  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
    } else {
      alert('Please select a PDF file.');
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
    } else {
      alert('Please drop a PDF file.');
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const openFileDialog = () => {
    fileInputRef.current.click();
  };


  const handleUpload = () => {
    if(selectedFile) {
      const formData = new FormData();
      formData.append('pdf', selectedFile);
      dispatch(uploadPdf(formData))
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        mt:"20vh"
      }}
      className="custom-file-uploader"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <input
        type="file"
        accept=".pdf"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />

      <label htmlFor="fileInput" style={{ cursor: 'pointer' }} onClick={openFileDialog}>
        <Box
          sx={{
            border: '2px dashed #aaa',
            borderRadius: '8px',
            padding: '20px',
            textAlign: 'center',
            cursor: 'pointer',
          }}
        >
          <span>Drag and drop a PDF file here or</span>
          <br />
          <span>Click to select a file</span>
        </Box>
      </label>

      <Box sx={{ mt: '5vh' }}>
        {selectedFile && <p>Selected file: {selectedFile.name}</p>}
      </Box>
      <Box sx={{mt:"5vh"}}>
        <Button variant='contained' onClick={handleUpload}>Upload</Button>
      </Box>
    </Box>
  );
};

export default Upload;
