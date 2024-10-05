import React, { useState } from 'react';
import axios from 'axios';
import {
    Button,
    Typography,
    Paper,
    Snackbar,
    CircularProgress,
    Box,
    Grid,
} from '@mui/material';

const UploadFile = () => {
    const [file, setFile] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [snackbarType, setSnackbarType] = useState('info'); // 'success' or 'error'

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!file) {
            setErrorMessage('Please select a file to upload.');
            setSnackbarType('error');
            setSnackbarOpen(true);
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        setLoading(true);
        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/upload-file`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setLoading(false);
            setSuccessMessage(`File uploaded successfully! File URL: ${response.data.url}`);
            setSnackbarType('success');
            setSnackbarOpen(true);
            setFile(null); // Reset the file input after successful upload
        } catch (error) {
            setLoading(false);
            setErrorMessage('Error uploading file. Please try again.');
            setSnackbarType('error');
            setSnackbarOpen(true);
        }
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
        setErrorMessage('');
        setSuccessMessage('');
    };

    const renderPreview = () => {
        if (!file) return null;

        const fileURL = URL.createObjectURL(file);

        switch (file.type.split('/')[0]) {
            case 'image':
                return (
                    <img
                        src={fileURL}
                        alt="Preview"
                        style={{ maxWidth: '100%', maxHeight: 300, borderRadius: 5 }}
                    />
                );
            case 'video':
                return (
                    <video controls style={{ maxWidth: '100%', maxHeight: 300 }}>
                        <source src={fileURL} type={file.type} />
                        Your browser does not support the video tag.
                    </video>
                );
            case 'audio':
                return (
                    <audio controls>
                        <source src={fileURL} type={file.type} />
                        Your browser does not support the audio element.
                    </audio>
                );
            case 'application':
                if (file.type === 'application/pdf') {
                    return (
                        <iframe
                            src={fileURL}
                            title="PDF Preview"
                            style={{ width: '100%', height: 300 }}
                        />
                    );
                }
                // For other application types, just show the file name
                return <Typography variant="body1">Selected file: {file.name}</Typography>;
            default:
                return <Typography variant="body1">Selected file: {file.name}</Typography>;
        }
    };

    return (
        <Paper style={{ padding: 20, maxWidth: 600, margin: '20px auto' }}>
            <Typography variant="h4" gutterBottom>Upload File</Typography>
            <form onSubmit={handleUpload}>
                <input
                    accept="*"
                    style={{ display: 'none' }}
                    id="file-input"
                    type="file"
                    onChange={handleFileChange}
                />
                <label htmlFor="file-input">
                    <Button variant="outlined" component="span" fullWidth>
                        {file ? file.name : 'Choose File'}
                    </Button>
                </label>
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    fullWidth
                    style={{ marginTop: 20 }}
                    disabled={loading}
                >
                    {loading ? <CircularProgress size={24} color="inherit" /> : 'Upload'}
                </Button>
            </form>

            {file && (
                <Box mt={3} display="flex" flexDirection="column" alignItems="center">
                    <Typography variant="h6">File Preview:</Typography>
                    <Grid container spacing={2} justifyContent="center">
                        <Grid item>
                            {renderPreview()}
                        </Grid>
                    </Grid>
                </Box>
            )}

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                message={errorMessage || successMessage}
            />
        </Paper>
    );
};

export default UploadFile;
